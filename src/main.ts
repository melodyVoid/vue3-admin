import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import '@/libs'
import 'tailwindcss/tailwind.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app')
