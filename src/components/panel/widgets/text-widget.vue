
<script setup lang="ts">
import { reactive } from 'vue';
import { TextWidgetConfigs } from '/@/widgets';

defineOptions({
  name: '文本,text'
})

const configs = reactive<TextWidgetConfigs>(
  {
    // 基础配置项
    fontSize: 12,
    fontWeight: 400,
    fontFamily: '宋体',
    left: 2,
    top: 2,
    width: 60,
    height: 5,
    // 组件特有配置项
    text: '文本',
    align: 'left',
    itemType: 0,
    pageIndex: null
  }
)
defineExpose({
  configs
})
</script>
<template>
  <div class="widgets_wrap" :style="{
    fontSize: configs.fontSize + 'pt',
    fontWeight: configs.fontWeight,
    textAlign: configs.align,
    top: configs.top + 'mm',
    left: configs.left + 'mm',
    width: configs.width + 'mm',
    height: configs.height + 'mm',
    fontFamily: configs.fontFamily
  }">
    {{ configs.text }}
  </div>
</template>
<style lang="less" scoped>
.text_wrap {
  overflow: hidden;
}
</style>/@/widgets