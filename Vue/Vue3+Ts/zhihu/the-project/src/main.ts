import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/main'
import router from './router/main'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:7001/api'
createApp(App).use(store).use(router).mount('#app')
