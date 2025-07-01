import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入样式文件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 注册插件

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
