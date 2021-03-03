<template>
  <div class="container">
    <global-header :user="user"/>
    <!-- <column-list :list="list" /> -->
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">邮箱地址</label>
        <ValidateInput placeholder="请输入邮箱地址" type="text" :rules="validateRules" v-model="emailRef.val"/>
        <span>{{ emailRef.val }}</span>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ColumnProps } from './components/ColumnList.vue'
import ValidateInput, { RulesProps } from './components/ValidateInput.vue'
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
const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

export default defineComponent({
  name: 'App',
  components: { GlobalHeader, ValidateInput },
  setup () {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })

    const validateRules: RulesProps = [
      { type: 'required', message: '该字段必填' },
      { type: 'email', message: '邮箱地址不正确' }
    ]

    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = '邮箱地址不能为空'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '邮箱地址不正确'
      }
    }

    return {
      list: testData,
      user: currentUser,
      emailRef,
      validateEmail,
      validateRules
    }
  }
})
</script>
