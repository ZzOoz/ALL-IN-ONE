<template>
  <!-- <div class="itemTemplate"> -->
  <draggableItem
    :data="data"
    :change="handleChange"
    :noSlot="noSlot"
    :hasSlot="hasSlot"
    @delete="handleDelete"
    @add="handleAdd"
  >
    <!-- v-slot:color必须要用template才可以 div不行 -->
    <template v-slot:color="slotProps">
      <ColorSelect
        v-model="dragData[slotProps.index].color"
        @change="(arg) => handleColorChange(slotProps.index, ...arg)"
      />
      {{ slotProps.index }}
    </template>
    <!-- <template v-slot:default>111</template> -->
  </draggableItem>
  <!-- </div> -->
</template>

<script>
import ColorSelect from "../colorSelect";
import draggableItem from "./draggableItem";
export default {
  components: { draggableItem, ColorSelect },
  props: {
    noSlot: {
      type: Array,
      default: () => {
        return [];
      },
      data: {
        type: Array,
        required: true,
      },
      // 需要在draggable显示显示的插槽
      hasSlot: {
        type: Array,
        default: () => {
          return [];
        },
      },
      //   addText: {
      //     type: String,
      //     default() {
      //       return "添加类型";
      //     },
      //   },
    },
  },
  mounted() {
    console.log(this.data, "valu");
  },
  data() {
    return {
      dragData: this.data
    };
  },
  computed: {},
  watch: {
    dragData(val) {
      this.$emit("update:data", val);
    },
  },
  methods: {
    handleChange(...arg) {
      this.$emit("change", arg);
    },
    handleDelete(...arg) {
      this.$confirm("确定要删除该数据吗?", {
        type: "error",
        confirmButtonClass: "el-button--danger",
      })
        .then(() => {
          this.$emit("delete", arg);
        })
        .catch(() => {});

      this.$nextTick(() => {
        setTimeout(() => {
          document.activeElement.blur();
        }, 100);
      });
    },
    handleAdd(...arg) {
      this.$emit("add", ...arg);
    },
    handleColorChange(...arg) {
      this.$emit("colorChange", arg);
    },
  },
};
</script>
<style lang="scss" scoped></style>
