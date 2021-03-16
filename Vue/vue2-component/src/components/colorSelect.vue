<template>
  <!-- 颜色选择器 -->
  <div class="colorSelect">
    <!-- v-bind="$attrs"获取上层组件或者多个上层组件传过来的属性 -->
    <el-color-picker
      v-model="color"
      popper-class="colorPicker"
      :color-format="colorFormat"
      :predefine="predeFineColors"
      @change="handleChange"
      @click.native="handleClick"
      v-bind="$attrs"
    >
    </el-color-picker>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.handleClick();
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.color = val;
        } else {
          this.color = this.predeFineColors[0];
          this.handleChange(this.color);
        }
      },
      immediate: true,
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    colorFormat: {
      type: String,
      default: () => {
        return "rgb";
      },
    },
    predeFineColors: {
      type: Array,
      default: () => {
        return [
          "rgb(255,69,0)",
          "rgb(255,140,0)",
          "rgb(255,215,0)",
          "rgb(144,238,144)",
          "rgb(0,206,209)",
          "rgb(30,144,255)",
          "rgb(199,21,133)",
        ];
      },
    },
  },
  data() {
    return {
      color: this.value,
    };
  },
  methods: {
    // mounted挂载去除多余元素占位
    handleClick() {
      this.$nextTick(() => {
        document.querySelectorAll(".colorPicker").forEach((picker) => {
          picker.querySelector(
            ".el-color-dropdown__main-wrapper"
          ).style.display = "none";
          picker.querySelector(".el-color-dropdown__value").style.display =
            "none";
          picker.querySelector("button").style.display = "none";
          picker.querySelector(".el-color-dropdown__link-btn").style.display =
            "none";
        });
      });
    },
    handleChange(val) {
      console.log(this.$attrs)  // 这里获取到attrs的属性
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
