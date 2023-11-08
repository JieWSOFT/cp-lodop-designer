<script setup lang="ts">
import { computed } from 'vue';
import { useWidgetsGlobalState } from '/@/state';
import { px2mm } from '/@/utils';

const { currentWidget } = useWidgetsGlobalState()
const elm = computed(() => {
  return currentWidget.value?.vNode
})

const startPosition: any = {
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0
}
let resizeType = ''
const handlemousedown = (e: MouseEvent, type: string, originX: number, originY?: number) => {
  e.stopPropagation()
  resizeType = type
  startPosition.startX = e.pageX
  startPosition.startY = e.pageY
  startPosition.originX = originX
  startPosition.originY = originY


  document.addEventListener('mousemove', handlemousemove, true)
  document.addEventListener('mouseup', handlemouseup, true)
}
const handlemousemove = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  var dx = e.pageX - startPosition.startX
  var dy = e.pageY - startPosition.startY
  var value
  console.log(dx,dy,resizeType)

  if (resizeType === 'right') {
    value = startPosition.originX + px2mm(dx)
    currentWidget.value!.vNode.configs.width = value > 1 ? value : 1
    return
  }

  if (resizeType === 'down') {
    value = startPosition.originX + px2mm(dy)
    currentWidget.value!.vNode.configs.height = value > 1 ? value : 1
    return
  }

  if (resizeType === 'left') {
    var left = startPosition.originX + px2mm(dx)
    var width = startPosition.originY - px2mm(dx)
    currentWidget.value!.vNode.configs.left = left > 0 ? left : 0
    currentWidget.value!.vNode.configs.width = width > 1 ? width : 1
    return
  }

  if (resizeType === 'up') {
    var top = startPosition.originX + px2mm(dy)
    var height = startPosition.originY - px2mm(dy)
    currentWidget.value!.vNode.configs.top = top > 0 ? top : 0
    currentWidget.value!.vNode.configs.height = height > 1 ? height : 1
  }
}
const handlemouseup = (_e: MouseEvent) => {
  document.removeEventListener('mousemove', handlemousemove, true)
  document.removeEventListener('mouseup', handlemouseup, true)
}

</script>
<template>
  <div v-show="elm">
    <!-- 左 -->
    <div :style="{
      height: elm?.configs?.height + 'mm',
      top: elm?.configs?.top + 'mm',
      left: elm?.configs?.left + 'mm'
    }" class="verti" @mousedown="handlemousedown($event, 'left', elm?.configs?.left, elm?.configs?.width)">
      <div class="square"></div>
    </div>
    <!-- 右 -->
    <div :style="{
      height: elm?.configs?.height + 'mm',
      top: elm?.configs?.top + 'mm',
      left: elm?.configs?.left + elm?.configs?.width + 'mm'
    }" class="verti" @mousedown="handlemousedown($event, 'right', elm?.configs?.width)">
      <div class="square" />
    </div>

    <!-- 上 -->
    <div :style="{
      width: elm?.configs?.width + 'mm',
      top: elm?.configs?.top + 'mm',
      left: elm?.configs?.left + 'mm'
    }" class="horiz" @mousedown="handlemousedown($event, 'up', elm?.configs?.top, elm?.configs?.height)">
      <div class="square" />
    </div>

    <!-- 下 -->
    <div :style="{
      width: elm?.configs?.width + 'mm',
      top: elm?.configs?.top + elm?.configs?.height + 'mm',
      left: elm?.configs?.left + 'mm'
    }" class="horiz" @mousedown="handlemousedown($event, 'down', elm?.configs?.height)">
      <div class="square" />
    </div>
  </div>
</template>

<style scoped>
.verti,
.horiz {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.verti {
  width: 0;
  cursor: ew-resize;
}

.horiz {
  height: 0;
  cursor: ns-resize;
}

.square {
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  border: 1px solid #2196f3;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>