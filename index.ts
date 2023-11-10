import type { App } from "vue";
import LodopDesigner from "./src/App.vue";
import { JSON2Print, JSON2Preview, getPrints } from './src/Lodop'
import './src/components/panel/index'
import './src/components/panel/setting-panel/index'
import './src/style.css'



const components: any[] = [LodopDesigner];
const install = (app: App) => {
  components.forEach(component => app.component((component.name, component)))
}
export { LodopDesigner }
export default {
  install,
  ...components,
  JSON2Print, JSON2Preview, getPrints
}