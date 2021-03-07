import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/store/main'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { alreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: CreatePost,
      meta: { requireLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    console.log(store.state.user.isLogin, 'isLogin')
    next({ name: 'login' })
  } else if (to.meta.alreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
