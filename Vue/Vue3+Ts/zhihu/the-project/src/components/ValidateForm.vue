<template>
  <div class="validateForm">
    <slot name="default"></slot>
    <div class="submit-area" @click="validateSubmit">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: '',
  components: {},
  props: {},
  emits: ['form-submit'], // 子组件传递给父组件的事件
  setup (props, context) {
    let funArr: ValidateFunc[] = []
    const validateSubmit = () => {
      // 当提交的时候就通过every方法查找是否所有都通过
      const result = funArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    const callback = (func: ValidateFunc | undefined) => {
      // callback接受一个function作为参数，就是上面的validateInput方法 如果有方法就插入一个数组中
      if (func) {
        funArr.push(func)
      }
    }

    emitter.on('form-item-created', callback)

    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funArr = []
    })

    return {
      validateSubmit,
      callback
    }
  }
})
</script>

<style scoped lang="scss">
</style>
