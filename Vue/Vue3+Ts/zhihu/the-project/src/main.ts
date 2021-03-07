import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/main'
import router from './router/main'
createApp(App).use(store).use(router).mount('#app')
