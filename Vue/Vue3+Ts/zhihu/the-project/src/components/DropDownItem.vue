<template>
  <li class="drowndown-item" :class="{ 'isDisabled':isDisabled }">
      <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropDownItem',
  props: {
    isDisabled: {
      type: Boolean
    }
  }
})
</script>

<style>
.isDisabled{
    color:#6c757d;
    pointer-events: none;
    background-color: transparent;
}
</style>
