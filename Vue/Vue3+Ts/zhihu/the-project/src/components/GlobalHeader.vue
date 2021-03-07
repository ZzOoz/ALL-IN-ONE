<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
        <a class="navbar-brand" href="#">vue3+ts知识专栏</a>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
          <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light">登录</router-link></li>
          <li class="list-inline-item"><a href="#" class="btn btn-outline-light">注册</a></li>
        </ul>
        <ul v-else class="list-inline mb-0">
          <li class="list-inline-item">
            <drop-down :title="user.name">
              <drop-down-item><router-link to="/createPost" class="dropdown-item" href="#">新建文章</router-link></drop-down-item>
              <drop-down-item :isDisabled="true"><a class="dropdown-item" href="#">编辑资料</a></drop-down-item>
              <drop-down-item><a class="dropdown-item" href="#">退出登录</a></drop-down-item>
            </drop-down>
          </li>
        </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
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
  components: { DropDown, DropDownItem }
})
</script>
