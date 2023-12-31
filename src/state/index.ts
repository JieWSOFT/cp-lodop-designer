import { reactive, ref } from "vue";
import { createGlobalState } from '@vueuse/core'


export const usePageGlobalState = createGlobalState(
  () => {
    const Page = reactive({
      width: '210mm', //默认A4
      height: '297mm',
      direction: 1
    })
    return Page
  }
)

export const useWidgetsGlobalState = createGlobalState(
  () => {
    const currentWidgetId = ref<string>('')
    const currentWidget = ref<{ vNode: any, temp: any, nanoid: string, editorTemp: any }>()
    const widgets = reactive<{ [key: string]: any }>({})
    const widgetStore = reactive<{ vNode: any, temp: any, nanoid: string, editorTemp: any }[]>([]) //已经添加的小组件
    const editors = reactive<{ [key: string]: any }>({})
    return { widgets, widgetStore, currentWidgetId, currentWidget, editors }
  }
)