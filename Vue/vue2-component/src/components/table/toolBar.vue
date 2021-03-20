<template>
  <div class="tableToolBar">
    <el-form inline @submit.native.prevent>
      <el-form-item v-for="(item, index) in formData" :key="index">
        <!-- 輸入框 -->
        <template v-if="item.type === 'input'">
          <span class="label">{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-input
            v-model="item.value"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
            @change="dataChange"
          />
        </template>

        <!-- 選擇框 -->
        <template v-if="item.type === 'select'">
          <span class="label">{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-select
            v-model="item.value"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
            @change="dataChange"
          >
            <el-option
              v-for="item in item.options"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>

        <!-- 日期 -->
        <template v-if="item.type === 'date'">
          <span class="label">{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-date-picker
            v-model="item.value"
            value-format="yyyy-MM-dd"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
            @change="dataChange"
          />
        </template>

        <template v-if="item.type === 'time'">
          <span class="label">{{ item.label }}</span>
          <!-- 通過v-bind綁定所有的屬性，通過events綁定所有的事件 -->
          <el-time-select
            v-model="item.value"
            value-format="HH:mm:ss"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
            @change="dataChange"
          />
        </template>
      </el-form-item>

      <!-- 默認插槽 -->
      <template v-if="$slots.default">
        <slot />
      </template>

      <!-- 查詢、重置按鈕 -->
      <el-form-item>
        <el-button @click="handleSearch">{{ leftBtn }}</el-button>
        <el-button @click="handleReset">{{ rightBtn }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from "@/utils/tool";
export default {
  name: "toolBar",
  mounted() {
    this.init();
  },
  props: {
    value: {
      type: Array,
      default: () => {},
    },
    leftBtn: {
      type: String,
      default: () => {
        return "查詢";
      },
    },
    rightBtn: {
      type: String,
      default: () => {
        return "重置";
      },
    },
  },
  data() {
    return {
      formData: this.value,
    };
  },
  methods: {
    // 初始化
    init() {
      console.log(this.formData, "data");
      this.formData.forEach((item) => {
        // item.default 本身就沒定義不存在就是undefined
        item.value = item.value || item.default;
        // 判斷日期格式 如果是daterange格式且default是有值得那麽就要判斷他的default是否正確
        if (item.prop && item.props.type === "daterange" && item.default) {
          if (item.default.length !== 2) {
            this.$message("日期范围需要两个日期参数 [Date1, Date2]");
          }
          // 分隔符
          item.props.rangeSeparator = item.props.rangeSeparator || "-";
          // 生成數組格式
          item.default = item.default || [new Date(), new Date()];
          // 轉換時間
          item.value = [
            parseTime(item.default[0], "{y}-{m}-{d}"),
            parseTime(item.default[1], "{y}-{m}-{d}"),
          ];
        } else if (item.prop && item.props.type === "date" && item.default) {
          // 同理
          if (item.default.length !== 1) {
            console.warn("日期需要一个日期参数 [Date1]");
          }
          item.default = item.default || new Date();
          item.value = parseTime(item.default, "{y}-{m}-{d}");
        }
      });
    },
    handleData() {
      return this.formData.filter((item) => {
        if (Array.isArray(item.value)) {
          // 對日期和數字這些form-item進行處理
          return item.value.length > 0 ? { [item.prop]: item.value } : "";
        } else {
          return item.value ? { [item.prop]: item.value } : "";
        }
      });
    },
    // 當時去焦點的時候觸發 會將所綁定的item.value進行更新
    dataChange(e) {
      console.log(this.formData, "formdata");
      this.$emit("change", e);
    },
    handleSearch() {
      this.$emit("search", this.handleData());
    },
    handleReset() {
      this.$emit("reset");
      this.formData.forEach((item) => {
        item.value = item.default;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/common/var.scss";

.tableToolBar {
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  background-color: $white;

  .el-input,
  .el-select,
  .el-date-editor {
    width: 240px !important;
  }

  .label {
    color: $--color-text-regular;
  }

  .el-form-item {
    margin-bottom: 16px;
    margin-right: 24px !important;

    &:last-child {
      margin-right: 0;
    }
  }

  .label {
    margin-right: 10px;
  }
}
</style>