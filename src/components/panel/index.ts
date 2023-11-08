
import { markRaw } from 'vue'
import { useWidgetsGlobalState } from '/@/state/index.ts'

const { widgets } = useWidgetsGlobalState()

const modules: Record<string, { [key: string]: any }> = import.meta.glob('./widgets/*.vue', { eager: true })
Object.keys(modules).forEach(key => {
  const widget = modules[key]?.default
  widgets[widget.name] = markRaw(widget)
})

