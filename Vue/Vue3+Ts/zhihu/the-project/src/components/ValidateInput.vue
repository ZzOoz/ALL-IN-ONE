<template>
  <div class="validate-input-container pb-3">
      <!-- 绑定value值 -->
    <input :value="inputRef.val" v-bind="$attrs" :class="{ 'is-invalid':inputRef.error }" class="form-control" @blur="validateInput" @input="updateModalValue"/>
    <span class="invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'

const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
export interface RuleProp {
    type: 'required' | 'email';
    message: string;
}

export type RulesProps = RuleProp[]// 将RulesProps作为一个有RuleProps的数组

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProps>,
    modelValue: String
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })

    const updateModalValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      console.log(targetValue, 'targetValue')
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    // 实现表单验证的方法
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              console.log(passed, 'passed')
              break
            case 'email':
              passed = (emailReg.test(inputRef.val))
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
      }
    }
    return {
      inputRef,
      validateInput,
      updateModalValue
    }
  }
})
</script>

<style>

</style>
