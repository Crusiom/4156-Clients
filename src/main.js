import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'
new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
