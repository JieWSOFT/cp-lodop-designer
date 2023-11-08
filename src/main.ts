import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '/@/components/panel/index.ts'
import '/@/components/panel/setting-panel/index.ts'

const app = createApp(App)
app.mount('#app')
