<script setup lang="ts">
import { CSSProperties } from 'vue';
import DesignerRender from '/@/components/render/designerRender/index.vue'
import editorRender from '/@/components/render/editor-render/index.vue'
const titleStyles: CSSProperties = {
  backgroundColor: 'white',
  fontSize: '28px',
  padding: '0 10px'
};
const siderStyles: CSSProperties = {
  backgroundColor: 'white'
};
</script>

<template>
  <a-layout style="height: 100%">
    <a-layout-header :style="titleStyles">
      Clodop打印模板设计器
    </a-layout-header>
    <a-layout>
      <a-layout-content>
        <DesignerRender />
      </a-layout-content>
      <a-layout-sider width="400" :style="siderStyles">
        <editorRender/>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
