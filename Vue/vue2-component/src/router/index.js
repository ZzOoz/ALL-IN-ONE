import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path: '/color',
    name: 'Color',
    component: () => import(/* webpackChunkName: "color" */ '../views/Color.vue'),
    meta:{
      title:'颜色'
    }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/Upload.vue'),
    meta:{
      title:'上传'
    }
  },
  {
    path: '/tabView',
    name: 'tabView',
    component: () => import(/* webpackChunkName: "tabView" */ '../views/tabView.vue'),
    meta:{
      title:'左右拖拽tabView'
    }
  },
  {
    path: '/tabScreen',
    name: 'tabScreen',
    component: () => import(/* webpackChunkName: "tabView" */ '../views/tabScreen.vue'),
    meta:{
      title:'tab选择组件'
    }
  },
  {
    path: '/draggable',
    name: 'draggable',
    component: () => import(/* webpackChunkName: "tabView" */ '../views/draggable.vue'),
    meta:{
      title:'draggable拖拽'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
