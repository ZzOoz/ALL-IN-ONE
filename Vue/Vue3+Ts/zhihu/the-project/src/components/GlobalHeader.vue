<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
        <a class="navbar-brand" href="#">vue3+ts知识专栏</a>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
          <li class="list-inline-item"><a href="#" class="btn btn-outline-light">登录</a></li>
          <li class="list-inline-item"><a href="#" class="btn btn-outline-light">注册</a></li>
        </ul>
        <ul v-else class="list-inline mb-0">
          <li class="list-inline-item">
            <drop-down :title="user.name"/>
          </li>
        </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'header',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: { DropDown }
})
</script>
