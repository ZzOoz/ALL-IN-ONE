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
      const result = funArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    const callback = (func: ValidateFunc | undefined) => {
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
