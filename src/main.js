import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '@/utils/custom-vue-directive'

Vue.use(ElementUI)

Vue.prototype.$axios = axios
if (process.env.NODE_ENV === 'production') { axios.defaults.baseURL = 'http://139.196.178.156:8080/' }

// 关闭生产环境的提示消息
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
