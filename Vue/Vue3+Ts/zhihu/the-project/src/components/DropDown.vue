<template>
  <div class="dropdown">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click="toggleDropDown"
    >
      {{ title }}
    </a>

    <div class="dropdown-menu" style="display: block" v-if="isOpen">
      <a class="dropdown-item" href="#">新建文章</a>
      <a class="dropdown-item" href="#">编辑资料</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)

    const toggleDropDown = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggleDropDown
    }
  }
})
</script>
