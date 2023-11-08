<script setup lang="ts">
import { useWidgetsGlobalState } from '/@/state/index'
import { nanoid } from 'nanoid'
const { widgets, widgetStore,editors } = useWidgetsGlobalState()

const addWidget = (key: string) => {
  widgetStore.push({
    temp: widgets[key],
    nanoid: nanoid(),
    vNode: undefined,
    editorTemp: editors[key?.split(',')[1]+'-editor'],
  })
}
</script>
<template>
  <p class="setting-title">打印组件</p>
  <div>
    <a-button v-for="item of  Object.keys(widgets)" :key="item" @click="() => addWidget(item)" style="margin-right: 10px; margin-bottom: 15px;">{{ item?.split(',')[0]
    }}</a-button>
  </div>
</template>