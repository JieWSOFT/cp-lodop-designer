
import { useWidgetsGlobalState } from '/@/state'
import { markRaw } from 'vue'

const { editors } = useWidgetsGlobalState()

const modules: Record<string, { [key: string]: any }> = import.meta.glob('./widget-editor/*.vue', { eager: true })
Object.keys(modules).forEach(key => {
  const editor = modules[key]?.default
  editors[editor.name] = markRaw(editor)
})

