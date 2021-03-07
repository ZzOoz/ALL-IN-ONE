<template>
  <div>
    <ValidateForm @form-submit="formValidate">
      <div class="form-group">
        <label for="exampleInputEmail1">邮箱地址</label>
        <ValidateInput
          ref="inputRef"
          placeholder="请输入邮箱地址"
          type="text"
          :rules="emailRules"
          v-model="emailVal"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <ValidateInput
          placeholder="请输入密码"
          type="password"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>

      <template v-slot:sumbit>
        <button type="submit" class="btn btn-danger">提交</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang='ts'>
import { ref } from 'vue'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalProps } from '@/store/main'

export default {
  name: 'Login',
  components: { ValidateInput, ValidateForm },
  props: {},
  setup () {
    const store = useStore<GlobalProps>()
    const inputRef = ref<any>(null)
    const emailVal = ref('')
    const passwordVal = ref('')
    const router = useRouter()
    const emailRules: RulesProps = [
      { type: 'required', message: '该字段必填' },
      { type: 'email', message: '邮箱地址不正确' }
    ]

    const passwordRules: RulesProps = [
      { type: 'required', message: '该字段必填' }
    ]

    const formValidate = (result: boolean) => {
      if (result) {
        router.push({ name: 'home' })
        store.commit('login')
        console.log(store.state.user.isLogin, 'isLogin')
      }
    }

    return {
      emailVal,
      passwordVal,
      emailRules,
      passwordRules,
      formValidate
    }
  }
}
</script>

<style scoped lang="scss">
</style>
