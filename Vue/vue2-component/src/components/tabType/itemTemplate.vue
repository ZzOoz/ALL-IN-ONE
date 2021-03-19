<template>
  <div class="itemWrap">
    <draggable-item
      :data.sync="dragData"
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
      </template>

      <template v-slot:input="slotProps">
        <el-input
          v-model="dragData[slotProps.index].text"
          :disabled="dragData[slotProps.index].editable === false"
          @blur="handleInputBlur(slotProps.index)"
          @focus="handleInputFocus(slotProps.index)"
        />
      </template>

      <template v-slot:switch="slotProps">
        <el-switch
          v-model="dragData[slotProps.index].switch"
          @click="handleSwitchChange"
        >
        </el-switch>
      </template>

      <template v-slot:delete>
        <i class="iconshanchu1 iconfont" />
      </template>

      <template v-slot:handle>
        <i class="icontuozhuai iconfont" />
      </template>
    </draggable-item>
  </div>
</template>

<script>
import ColorSelect from "../colorSelect";
import DraggableItem from "./draggableItem.vue";
export default {
  components: { ColorSelect, DraggableItem },
  props: {
    data: {
      type: Array,
      required: true,
    },
    noSlot: {
      type: Array,
      default: () => {
        return [];
      },
    },
    hasSlot: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 需要在draggable显示显示的插槽
    //   addText: {
    //     type: String,
    //     default() {
    //       return "添加类型";
    //     },
    //   },
  },
  data() {
    return {
      dragData: this.data,
    };
  },
  mounted() {
    console.log(this.data);
  },
  computed: {},
  watch: {
    dragData(val) {
      this.$emit("update:data", val);
    },
  },
  methods: {
    handleChange(...arg) {
      // 这里的arg是draggable的change事件获取的参数
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
    handleInputFocus(index) {
      this.$emit("focus", index);
    },
    handleInputBlur(index) {
      this.$emit("blur", index);
    },
    handleSwitchChange(index) {
      this.$emit("switch", index);
    },
  },
};
</script>
<style lang="scss" scoped>
.itemWrap {
  & > .el-input {
    width: 420px;
  }

  & > .el-color-picker {
    .el-color-picker__empty,
    .el-color-picker__icon {
      display: none;
    }
  }

  i.iconfont {
    width: 16px;
    height: 16px;
    overflow: hidden;
  }

  i.iconshanchu1 {
    margin-left: 24px;
    font-size: 12px;
  }

  i.icontuozhuai {
    margin-left: 24px;
    margin-right: 16px;
    font-size: 12px;
  }
}
</style>
