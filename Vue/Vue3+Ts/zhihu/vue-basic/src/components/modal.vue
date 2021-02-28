<template>
  <!-- Teleport标签可以将组件挂载到特定的标签之内 -->
  <Teleport to="#modal">
    <div class="modal" v-if="isOpen">
      <div><slot>this is modal</slot></div>
      <button @click="buttonClick">close</button>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "modal",
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
      console.log(context.props.isOpen,'isOpen')
    };
    return {
      buttonClick,
    };
  },
});
</script>

<style>
.modal {
  position: fixed;
  width: 300px;
  height: 300px;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
}
</style>