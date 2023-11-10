<script setup lang="ts">
import { TextWidgetConfigs } from 'types/widgets';
import { PropType } from 'vue'
import { fontWeightArr, fontFamilyArr, alignArr, itemTypeArray, pageIndexArray } from '/@/components/constant'
defineOptions({
  name: 'text-editor'
})

const props = defineProps({
  configs: {
    required: true,
    type: Object as PropType<TextWidgetConfigs>
  }
})

</script>
<template>
  <p class="setting-title">文本设置</p>
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
        <a-form-item label="加粗">
          <a-select v-model:value="props.configs.fontWeight">
            <a-select-option v-for="item in fontWeightArr" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
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
        <a-form-item label="类型">
          <a-select v-model:value="props.configs.itemType">
            <a-select-option v-for="item in itemTypeArray" :key="item" :value="item.value">{{ item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="输出页">
          <a-select v-model:value="props.configs.pageIndex" allowClear>
            <a-select-option v-for="item in pageIndexArray" :key="item" :value="item.value">{{ item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="24">
        <a-form-item label="文本内容" :wrapperCol="{ span: 19 }" :labelCol="{ span: 5 }">
          <a-textarea v-model:value="props.configs.text"></a-textarea>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>