<template>
  <div class="tableToolBar">
    <el-form inline>
      <el-form-item
        v-for="(item) in formData"
        :prop="item.prop"
        :key="item.value"
      >
        <!-- 輸入框 -->
        <template v-if="item.type === 'input'">
          <span>{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-input
            v-model="item.value"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
          />
        </template>

        <!-- 選擇框 -->
        <template v-if="item.type === 'select'">
          <span>{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-select
            v-model="item.value"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
          >
            <el-option
              v-for="item in item.option"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>

        <!-- 日期 -->
        <template v-if="item.type === 'date'">
          <span>{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-date-picker
            v-model="item.value"
            value-format="yyyy-MM-dd"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
          />
        </template>

        <template v-if="item.type === 'time'">
          <span>{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-date-picker
            v-model="item.value"
            value-format="HH:mm:ss"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
          />
        </template>
      </el-form-item>

      <!-- 默認插槽 -->
      <el-form-item>
        <slot />
      </el-form-item>

      <!-- 右側插槽 -->
      <el-form-item
        v-if="$slots.right"
        class="btns-box"
        style="float: right; margin-right: 0"
      >
        <slot name="right"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$slots.right && this.$slots.right.length > 1) {
        this.$message.error("tableToolBar的slot的right插槽只能是一個");
        return;
      }
    });
  },
};
</script>

<style scoped lang="scss">
.EtmTableToolBar-wrap {
  .el-form-item {
    margin-bottom: 16px;
  }

  .btns-box {
    .el-form-item__content > div {
      display: flex;

      *:first-child {
        margin-left: 0 !important;
      }

      & > .el-button,
      & > .el-dropdown {
        margin-left: 8px;
      }
    }
  }
}
</style>
