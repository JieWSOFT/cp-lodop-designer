<script setup lang="ts">
import { TableWidgetConfigs } from 'types/widgets';
import { reactive } from 'vue';
defineOptions({
  name: '表格,table'
})

const configs = reactive<TableWidgetConfigs>({
  fontSize: 12,
  fontWeight: 400,
  fontFamily: '宋体',
  left: 2,
  top: 2,
  width: 200,
  height: 100,
  align: 'left',
  //表格独有配置
  columns: [{
    title: '标题名',
    key: 'test'
  }],
  Offset2Top: 0
})

defineExpose({
  configs
})
</script>
<template>
  <div class="widgets_wrap" :style="{
    left: configs.left + 'mm',
    top: configs.top + 'mm',
    width: configs.width + 'mm',
    height: configs.height + 'mm',
    textAlign: configs.align,
    fontSize: configs.fontSize + 'pt',
  }" style="position:absolute;overflow:hidden">
    <table border="1" width="100%" cellspacing="0" cellpadding="2" style="border-collapse:collapse;"
      bordercolor="#000000">
      <tr>
        <th v-for="item in configs.columns" :key="item.title"
          :style="{ width: `${item.width}mm`, height: `${configs.titleHeight}mm` }">{{
            item.title }}
        </th>
      </tr>
      <tr>
        <td v-for="item in configs.columns" :key="item.title" :style="{ height: `${item.height}mm` }">{{ item.key }}
        </td>
      </tr>
    </table>
  </div>
</template>