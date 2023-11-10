<script setup lang="ts">
import PagerEditor from '/@/components/panel/setting-panel/pagerEditor.vue';
import componentsEditor from '/@/components/panel/setting-panel/componentsEditor.vue';
import { useWidgetsGlobalState } from '/@/state';
import { computed } from 'vue';
import PrintEditor from '../../panel/setting-panel/printEditor.vue';

const { currentWidget } = useWidgetsGlobalState()

const widgetEditor = computed(() => {
  return currentWidget.value?.editorTemp
})
</script>
<template>
  <div class="editor-warp">
    <PagerEditor />
    <componentsEditor />
    <component :is="widgetEditor" :configs="currentWidget?.vNode.configs" />
    <PrintEditor />
  </div>
</template>
<style lang="less" scoped>
.editor-warp {
  padding: 15px;
}
</style>