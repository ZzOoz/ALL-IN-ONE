<template>
  <!-- 基于element-ui封装的el-table和el-pagination组件 -->
  <div class="EtmTablePage-wrap" :class="[{ tool: $slots.tool }]">
    <!-- 工具栏 -->
    <div v-if="$slots.tool">
      <slot name="tool" />
    </div>

    <el-table
      ref="tablePage"
      style="transition: all 0.2s"
      :header-cell-style="{ background: '#fafafa' }"
      :border="border"
      :data="data.content"
      :stripe="stripe"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="selection"
        fixed="left"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="index"
        fixed="left"
        type="index"
        width="60"
        align="center"
      ></el-table-column>

      <!-- table的左侧栏 -->
      <slot name="left" />

      <!-- 中间内容栏 -->
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        :show-overflow-tooltip="false"
        :min-width="minWidth(col)"
        v-bind="{ ...col }"
      >
      </el-table-column>
      <!-- <slot /> -->

      <!-- table右侧操作栏 -->
      <slot name="right" />
    </el-table>

    <el-pagination
      class="etm-pagination"
      v-if="showPage"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40, 100]"
      :total="data.totalElements"
      v-bind="$attrs"
      v-on="$listeners"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { throttle } from "@/utils/tool";
const SPLIT_SYMBOL = "--";
export default {
  components: {},
  created() {
    this.calcMinWidth();
  },
  mounted() {
    function resize() {
      window.addEventListener(
        "resize",
        throttle(() => {
          this.$nextTick(() => {
            this.$refs.etmTable && this.$refs.etmTable.doLayout();
          });
        })
      );
    }

    this.$on("hook:mounted", resize);
    this.$on("hook:destroyed", resize);
    this.$nextTick(() => {
      setTimeout(() => {
        this.init();
      }, 100);
    });
  },
  props: {
    // 数据栏
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
    // 文本对齐格式
    align: {
      type: String,
      default: "left",
      validator(val) {
        return ["left", "center", "right"].includes(val);
      },
    },
    // 显示分页
    showPage: {
      type: Boolean,
      default: true,
    },
    // 表格columns列
    columns: {
      type: Array,
      require: true,
      default: () => [],
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true,
    },
    // 显示斑马纹
    stripe: {
      type: Boolean,
      default: true,
    },
    // 字体宽度
    fontWidth: {
      type: Number,
      default: 16,
    },
    // 是否显示序号列
    index: {
      type: Boolean,
      default: false,
    },
    // 序号名
    indexLabel: {
      type: String,
      default: "序号",
    },
    // 选择列
    selection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    data: {
      async handler(data) {
        // 处理数据返回空
        await this.transformDataNullToSymbol(data.content);
        await this.calcMinWidth();
        // 更改页数
        this.pageInfo.pageNum = data.pageNum;
        // 触发table重新渲染
        this.$nextTick(() => {
          this.$refs.tablePage && this.$refs.tablePage.doLayout();
        });
      },
      deep: true,
    },
  },
  methods: {
    // 初始化table进行布局
    init() {
      this.$refs.tablePage && this.$refs.tablePage.doLayout();
    },
    // 分页处理 页数改变时触发
    currentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      // 给emit统一处理
      this.emit();
    },
    // 分页处理
    sizeChange(size) {
      this.pageInfo.pageNum = 1;
      this.pageInfo.pageSize = size;
      this.$emit();
    },
    emit() {
      const { pageNum, pageSize } = this.pageInfo;
      this.$emit("currentChange", pageNum, pageSize);
    },
    // 处理返回的数据是空的方法
    transformDataNullToSymbol(data) {
      data.forEach((item) => {
        for (const itemKey in item) {
          if (item[itemKey] === null) {
            item[itemKey] = SPLIT_SYMBOL;
          }
          if (item[itemKey] === undefined) {
            item[itemKey] === SPLIT_SYMBOL;
          }
          if (item[itemKey] === "") {
            item[itemKey] === SPLIT_SYMBOL;
          }
        }
      });
    },
    // 计算宽度方法 取最小宽度或者根据字体长度计算宽度
    calcMinWidth() {
      console.log(this.$slots.left, "left");
      // this.$slots.left这些数据是一个数组可以遍历循环
      this.$slots.left &&
        this.$slots.left.forEach((node) => {
          // 不存在即返回
          if (!node.componentOptions) {
            return;
          }

          // 如果有label那么计算根据它的最小宽度
          if (node.componentOptions.propsData.label) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
          }

          // 如果有类型索引 如index或selection，取中间位
          if (node.componentOptions.propsData.type) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
            node.componentOptions.propsData.align = "center";
          }
        });

      this.$slots.right &&
        this.$slots.right.forEach((node) => {
          // 不存在即返回
          if (!node.componentOptions) {
            return;
          }

          // 如果有label那么计算根据它的最小宽度
          if (node.componentOptions.propsData.label) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
          }

          // 如果有类型索引 如index或selection，取中间位
          if (node.componentOptions.propsData.type) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
            node.componentOptions.propsData.align = "center";
          }
        });

      this.$slots.default &&
        this.$slots.default.forEach((node) => {
          // 不存在即返回
          if (!node.componentOptions) {
            return;
          }

          // 如果有label那么计算根据它的最小宽度
          if (node.componentOptions.propsData.label) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
          }

          // 如果有类型索引 如index或selection，取中间位
          if (node.componentOptions.propsData.type) {
            node.componentOptions.propsData.minWidth = this.minWidth(
              node.componentOptions.propsData
            );
            node.componentOptions.propsData.align = "center";
          }
        });
    },

    /**
     * 设置最小宽度为60
     * 如果有传入minWidth就根据minWidth来设置, 否则就根据label的字段length来计算
     * 权重 minWidth > label.length
     * @param col
     * @returns {number}
     */
    minWidth(col) {
      if (col.type) {
        console.error("如需传入index/section等属性请直接传入index/section");
      }
      let minWidth = 60;

      // 对于标签的长度进行设置、label的长度 * 单个字体的宽度 + padding
      if (col.label) {
        const padding = 10 + 16;
        // 最小宽度 但是遇到比较少的数据的时候就会自动填充到满
        minWidth = col.label.length * this.fontWidth + padding;
      }
      // 如果有最小宽度那么就用最小宽度
      if (col.minWidth) {
        minWidth = col.minWidth;
      }
      return minWidth;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/common/themeConfig.scss";
@import "@/styles/common/var.scss";
$pf: 10px;
.EtmTablePage-wrap {
  background-color: $white;
  padding-bottom: 16px;

  .etm-pagination {
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    top: 8px;
  }

  & >>> {
    .el-table__fixed-header-wrapper {
      thead tr th {
        font-weight: normal;
        color: $--color-text-primary;

        .cell {
          padding-left: $pf;
        }
      }

      .el-table-column--selection {
        .cell {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }

    .el-table__header-wrapper {
      .cell {
        padding-left: $pf;
      }
    }

    .el-table__body-wrapper {
      .cell {
        padding-left: $pf;
      }

      .el-table-column--selection {
        .cell {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }

    .el-table__header-wrapper {
      thead tr th {
        font-weight: normal;
        color: $--color-text-primary;
      }

      .el-table-column--selection {
        .cell {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }

    .el-table__fixed-body-wrapper {
      .cell {
        padding-left: $pf;
      }
      .el-table-column--selection {
        .cell {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
