<template>
  <!-- 基于element-ui封装的el-table和el-pagination组件 -->
  <div class="EtmTablePage-wrap" :class="[{ tool: $slots.tool }]">
    <!-- 工具栏 -->
    <div v-if="$slots.tool">
      <slot name="tool" />
    </div>

    <el-table
      ref="tablePage"
      style="transition: all .2s"
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
      :page-sizes="[10, 20, 30, 40]"
      :total="data.totalElement"
      v-bind="$attrs"
      v-on="$listeners"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
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
        await this.transformDataNullToSymbol(data);
      },
    },
  },
  methods: {
    // 初始化table进行布局
    init() {
      this.$refs.tablePage && this.$refs.tablePage.doLayout();
    },
    // 分页处理
    currentChange() {},
    // 分页处理
    sizeChange() {},
    // 处理返回的数据是空的方法
    transformDataNullToSymbol() {},
    // 计算宽度方法
    calcMinWidth() {},

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
