<template>
  <!-- tab选择组件（支持多选、单选） -->
  <div class="screenTab">
    <span v-if="title" class="screenTitle">{{ title }}</span>
    <ul>
      <li
        v-for="(item, index) in options"
        :key="item.value"
        class="tabItem"
        :class="{
          isMultiple: multiple,
          isActive: checkActive(item, index),
          isDisable: disabled || (!disabled && item.disabled),
        }"
        @click="tabClick(item, index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "screenTab",
  model: {
    prop: "currentValue",
    event: "change",
  },
  props: {
    // v-model传过来的值
    currentValue: {
      type: null,
      required: true,
    },
    // 多选操作
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 选项列表
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: () => {
        return undefined;
      },
    },
    // 禁用全部选项
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    // 点击tab事件
    tabClick(item) {
      if (this.disabled) {
        return;
      } else {
        if (item.disabled) {
          return;
        }
      }
      // 单选事件
      if (!this.multiple) {
        // input是v-model绑定 change是调用事件
        this.$emit("input", item.value);
        this.$emit("change", item.value);
      } else {
        // 多选
        if (this.currentValue.indexOf(item.value) === -1) {
          // 多选不存在此值的时候
          this.currentValue.push(item.value);
          this.$emit("input", this.currentValue);
          this.$emit("change", this.currentValue);
        } else {
          // 存在这个值那么就删除
          this.currentValue.splice(this.currentValue.indexOf(item.value), 1);
        }
      }
    },

    checkActive(item) {
      if (!this.multiple) {
        return this.currentValue === item.value;
      }
      console.log("111");
      return this.currentValue.includes(item.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.screenTab {
  .tabItem {
    color: wihte;
    margin-top: 10px;
  }
  .isDisable {
    cursor: not-allowed;
  }
}
.isActive {
  color: #3d7bff !important;
  background-color: rgba(61, 123, 255, 0.1);
}
</style>
