<script setup lang="ts">
import { TableWidgetConfigs } from 'types/widgets';
import { fontFamilyArr, alignArr } from '/@/components/constant'

import { PropType } from 'vue';

defineOptions({
  name: 'table-editor'
})

const props = defineProps({
  configs: {
    required: true,
    type: Object as PropType<TableWidgetConfigs>
  }
})

const addColumn = () => {
  props.configs.columns.push({
    title: '标题名',
    value: 'test'
  })
}
</script>
<template>
  <p class="setting-title">表格设置</p>
  <a-form labelAlign="right" :wrapperCol="{ span: 15 }" :labelCol="{ span: 9 }">
    <a-row>
      <a-col span="12">
        <a-form-item label="长">
          <a-input-number addon-after="mm" v-model:value="props.configs.width" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="宽">
          <a-input-number addon-after="mm" v-model:value="props.configs.height" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="X">
          <a-input-number addon-after="mm" v-model:value="props.configs.left" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="Y">
          <a-input-number addon-after="mm" v-model:value="props.configs.top" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="字号">
          <a-input-number addon-after="pt" v-model:value="props.configs.fontSize" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="字体">
          <a-select v-model:value="props.configs.fontFamily">
            <a-select-option v-for="item in fontFamilyArr" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="对齐">
          <a-select v-model:value="props.configs.align">
            <a-select-option v-for="item in alignArr" :key="item" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="表头高">
          <a-input-number addon-after="mm" v-model:value="props.configs.titleHeight" />
        </a-form-item>
      </a-col>
      <a-col span="24">
        <a-form-item label="列" :wrapperCol="{ span: 22 }" :labelCol="{ span: 2 }">
          <div v-for="item in props.configs.columns" :key="item.value">
            <a-row>
              <a-col span="8" style="padding:0 10px 10px 0 ">
                <a-input v-model:value="item.title" placeholder="列标题" />
              </a-col>
              <a-col span="8" style="padding:0 10px 10px 0 ">
                <a-input v-model:value="item.value" placeholder="列值字段名" />
              </a-col>
              <a-col span="8" style="padding:0 10px 10px 0 ">
                <a-input-number addon-after="mm" v-model:value="item.width" placeholder="列宽度" />
              </a-col>
              <a-col span="8" style="padding:0 10px 10px 0 ">
                <a-input-number addon-after="mm" v-model:value="item.height" placeholder="列高度" />
              </a-col>
            </a-row>
          </div>
          <a-button type="primary" @click="addColumn">添加列</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>