import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueCookie from 'vue-cookie'
import './assets/css/common.css'

// 请求的统一处理 将vueAxios是将axios挂载到vue上
Vue.use(VueAxios, axios)
Vue.use(VueCookie)

Vue.config.productionTip = false


// 错误机制的处理
axios.interceptors.request.use(function (request) {
  // 一定要返回！！！！！
  return request
})

axios.interceptors.response.use(function (response) {
  let res = response.data
  // 请求接口时发生的错误
  if (res.code !== 0) {
    alert(res.message)
  }
  // 一定要返回！！！！！
  return response
}, function (error) {
  // 这里是网络发生错误的时候发生的错误
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
