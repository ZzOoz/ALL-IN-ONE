import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../pages/index.vue'),
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('../pages/pay.vue'),
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('../pages/activity.vue'),
    }
]

let router = new Router({
    routes
})

export default router

