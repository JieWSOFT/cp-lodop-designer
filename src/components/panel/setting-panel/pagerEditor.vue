<script setup lang="ts">
import { usePageGlobalState } from '/@/state/index.ts'
import { useDebounceFn } from '@vueuse/core'
import { reactive, watch } from 'vue';
//初始化纸张参数
const Page = usePageGlobalState()
const page = reactive({
  width: /(\d*\.?\d*)(.*)/.exec(Page.width)?.[1],
  height: /(\d*\.?\d*)(.*)/.exec(Page.height)?.[1],
})
//防抖 用户的输入
const debouncedFn = useDebounceFn(() => {
  Page.height = `${page.height}mm`
  Page.width = `${page.width}mm`
}, 1000)

watch(page, () => {
  debouncedFn()
})
</script>
<template>
  <p class="setting-title">纸张大小</p>
  <a-form labelAlign="right" :wrapperCol="{ span: 16 }" :labelCol="{ span: 4 }">
    <a-row>
      <a-col span="12">
        <a-form-item label="宽">
          <a-input-number addon-after="mm" v-model:value="page.width" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="高">
          <a-input-number addon-after="mm" v-model:value="page.height" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>