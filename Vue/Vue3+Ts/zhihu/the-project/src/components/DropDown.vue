<template>
  <div class="dropdown" ref="dropDownRef">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click="toggleDropDown"
    >
      {{ title }}
    </a>

    <div class="dropdown-menu" style="display: block" v-if="isOpen">
        <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useDropDownClick from '../hooks/useDropDownClick'
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
    const dropDownRef = ref<null | HTMLElement>(null)
    const isOutSideClick = useDropDownClick(dropDownRef)
    const toggleDropDown = () => {
      isOpen.value = !isOpen.value
    }
    console.log(isOutSideClick, 'VALUE')
    watch(isOutSideClick, () => {
      if (isOutSideClick.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleDropDown,
      dropDownRef
    }
  }
})
</script>
