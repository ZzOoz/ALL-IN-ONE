<template>
  <div class="container">
    <global-header :user="user"/>
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: '',
    title: '测试数据1',
    description: '你好我是测试数据1'
  },
  {
    id: 2,
    avatar: '',
    title: '测试数据2',
    description: '你好我是测试数据2'
  }
]

const currentUser: UserProps = {
  isLogin: true,
  name: 'Yteng'
}

export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader },
  setup () {
    return {
      list: testData,
      user: currentUser
    }
  }
})
</script>
