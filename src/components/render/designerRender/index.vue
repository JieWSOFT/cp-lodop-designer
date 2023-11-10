<template>
  <div class="holder" ref="viewportRef">
    <div class="screen" :style="{ width: Page.width, height: Page.height }">
      <component v-for="widget in widgetStore" :is="widget.temp" :key="widget.nanoid" :ref="widget.nanoid"
        data-type="widget" :data-nanoid="widget.nanoid" :class="{ 'active': widget.nanoid === currentWidgetId }">
      </component>
      <SizeControl />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, getCurrentInstance, nextTick } from 'vue';
import { usePageGlobalState, useWidgetsGlobalState } from '/@/state/index.ts'
import { px2mm } from '/@/utils'
import SizeControl from '../../panel/sizeControl.vue';
const { proxy } = getCurrentInstance()!
const Page = usePageGlobalState()
const { widgetStore, currentWidgetId, currentWidget } = useWidgetsGlobalState()
const viewportRef = ref<any>(null)

watch(widgetStore, () => {
  nextTick(() => {
    widgetStore.forEach(item => {
      const nanoid = item.nanoid
      const vNode = proxy?.$refs[nanoid] as any
      if (vNode && !item.vNode) {
        item.vNode = vNode[0]
      }
    })
  })
})

/**
* 获得选中的目标，如果没有返回false
 */
function selectTarget(target: any) {
  if (target?.getAttribute) {
    let type = target?.getAttribute('data-type');
    if (type) {
      if (type === 'viewport') {
        return false;
      } else {
        return target;
      }
    } else {
      return selectTarget(target.parentNode);
    }
  }
}
const handleSelection = (e: MouseEvent) => {
  var target = selectTarget(e.target)
  if (target) {
    const nanoid = target.getAttribute('data-nanoid')
    // 设置选中元素
    currentWidgetId.value = nanoid
    currentWidget.value = widgetStore.filter(item => item.nanoid == nanoid)[0]
    console.log(widgetStore, currentWidgetId.value)
    // 绑定移动事件：除背景图以外的元件才能移动
    initmovement(e)
  } else {
    currentWidgetId.value = ''
    currentWidget.value = undefined
  }
}

const startPosition = {
  pageX: 0,
  pageY: 0,
  originX: 0,
  originY: 0
}

/**
* 初始化鼠标拖拽事件
* @param {*} e 
*/
const initmovement = (e: MouseEvent) => {
  const el = currentWidget.value?.vNode
  startPosition.pageX = e.pageX
  startPosition.pageY = e.pageY
  startPosition.originX = (el?.configs?.left)
  startPosition.originY = (el?.configs?.top)

  // 绑定鼠标移动事件
  document.addEventListener('mousemove', handlemousemove, true)

  // 取消鼠标移动事件
  document.addEventListener('mouseup', handlemouseup, true)
}
const handlemousemove = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  var target = currentWidget.value?.vNode
  var dx = e.pageX - startPosition.pageX
  var dy = e.pageY - startPosition.pageY
  var left = startPosition.originX + px2mm(dx)
  var top = startPosition.originY + px2mm(dy)

  target.configs.left = left > 0 ? left : 0
  target.configs.top = top > 0 ? top : 0

}
const handlemouseup = (_e: MouseEvent) => {
  document.removeEventListener('mousemove', handlemousemove, true)
  document.removeEventListener('mouseup', handlemouseup, true)
}

onMounted(() => {
  // 采用事件代理的方式监听元件的选中操作
  let viewportDom = viewportRef.value as HTMLDivElement
  if (viewportDom) {
    viewportDom.addEventListener('mousedown', handleSelection, false)
  } else {
    console.error('未找的‘viewport’节点')
  }

  // 绑定键盘删除
  document.addEventListener(
    'keydown',
    (e) => {
      e.stopPropagation()
      const code = e.code
      if (code == 'Backspace') {
        const index = widgetStore.findIndex(item => item.nanoid == currentWidgetId.value)
        widgetStore.splice(index, 1)
        currentWidgetId.value = ''
        currentWidget.value = undefined
      }
    },
    true
  )
})
</script>
<style scoped lang="less">
.holder {
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: auto;
  font-size: 0;
  border: 1px solid #f5f5f5;
  border-width: 0 1px;
  background-color: white;
  background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
    linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}

.screen {
  margin: 25px auto;
  transform-origin: center top;
  position: relative;
  box-shadow: 0 0 5px 1px #cccccc;
  background-color: #ffffff;
  background-repeat: no-repeat;
}

.active {
  outline: 1px solid #2196f3 !important;

  &:hover {
    outline: 1px solid #2196f3 !important;
  }
}
</style>