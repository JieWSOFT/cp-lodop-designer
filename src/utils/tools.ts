import { usePageGlobalState, useWidgetsGlobalState } from '/@/state/'

const { widgetStore } = useWidgetsGlobalState()
const Page = usePageGlobalState()

export function getWidgetsJSON() {
  const JSONStr: any = {
    page: {},
    items: []
  }
  JSONStr.page = Page
  if (widgetStore?.length > 0) {
    widgetStore.forEach(item => {
      const { vNode, temp } = item
      const name = temp.name.split(',')[1]
      const configs = vNode.configs
      JSONStr.items.push({
        name, configs
      })
    })
    return JSON.stringify(JSONStr)
  } else {
    return JSON.stringify(JSONStr)
  }
}