import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
// import toast from 'components/common/toast'
// createApp().config.globalProperties.$bus

createApp(App).use(router).use(store).mount('#app')
//安装toast插件
