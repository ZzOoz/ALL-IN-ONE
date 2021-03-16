<template>
  <div class="">
    <itemTemplate
      :data.sync="dragData"
      :noSlot="[]"
      @add="handleAdd"
      @delete="handleDelete"
    ></itemTemplate>
  </div>
</template>

<script>
import itemTemplate from "./itemTemplate";
export default {
  components: { itemTemplate },
  data() {
    return {
      dragData: [{ id: 1, name: "早餐", color: "red" }],
      addText: "添加新类型",
    };
  },
  computed: {},
  methods: {
    handleAdd() {},
    handleDelete() {},
  },
};
</script>
<style lang="scss" scoped></style>
