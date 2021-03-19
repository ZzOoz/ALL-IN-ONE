<template>
  <!-- 基于element-ui封装的el-table和el-pagination组件 -->
  <div class="table-wrap" :class="{ tool: $slot.tool }">
    <!-- 工具栏 -->
    <div v-if="$slot.tool">
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
      v-on="$listener"
    >
      <!-- 选择列 -->
      <el-table-column
        fixed="left"
        type="selection"
        width="48px"
        align="center"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        fixed="left"
        type="index"
        width="48px"
        align="center"
      ></el-table-column>

      <!-- table的左侧栏 -->
      <slot name="left" />

      <!-- 中间内容栏 -->
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :show-overflow-tooltip="false"
        :min-width="minWidth(col)"
        v-bind="{ ...col }"
      >
      </el-table-column>

      <!-- table右侧操作栏 -->
      <slot name="right" />
    </el-table>

    <el-pagination
      class="pagination"
      v-if="showPage"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :total="data.totalElement"
      v-bind="$attrs"
      v-on="$listener"
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
  computed: {},
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
    // 最小宽度
    minWidth() {},
  },
};
</script>
<style lang="scss" scoped></style>
