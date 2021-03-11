<template>
  <div class="validate-input-container pb-3">
      <!-- 绑定value值 通过v-bind="$attrs"这个属性将在父组件上写的属性放在input或者textarea上面去-->
    <input v-if="tag === 'input'" :value="inputRef.val" v-bind="$attrs" :class="{ 'is-invalid':inputRef.error }" class="form-control" @blur="validateInput" @input="updateModalValue"/>
    <textarea v-else :value="inputRef.val" v-bind="$attrs" :class="{ 'is-invalid':inputRef.error }" class="form-control" @blur="validateInput" @input="updateModalValue"/>
    <span class="invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
export interface RuleProp {
    type: 'required' | 'email';
    message: string;
}

export type RulesProps = RuleProp[]// 将RulesProps作为一个有RuleProps的数组
export type TagType = 'input' | 'textarea'

export default defineComponent({
  name: 'ValidateInput',
  props: {
    // 验证规则 定义验证规则是一个数组 里面有RulesProps约束
    rules: Array as PropType<RulesProps>,
    // v-model绑定的值
    modelValue: String,
    // 判断validateInput的类型 input or textarea
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false, // 在父组件引用该组件的时候不允许将属性放在这个组件的最顶层
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    //
    const updateModalValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
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
              break
            case 'email':
              passed = (emailReg.test(inputRef.val))
              break
            default:
              break
          }
          return passed // 返回结果
        })
        inputRef.error = !allPassed
        return allPassed // 返回结果
      }
      return true // 如果没有规则那么永远返回true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

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
