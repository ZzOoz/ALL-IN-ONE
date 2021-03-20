<template>
  <div class="table">
    <ToolBar v-model="formData"></ToolBar>
    <tablePage
      :data="tableData"
      :columns="columns"
      @currentChange="currentChange"
    >
      <!-- 將tableToolBar作爲tablePage的插槽 -->
      <TableToolBar slot="tool">
        <div slot="right">
          <el-button>測試</el-button>
        </div>
      </TableToolBar>
      <el-table-column label="12213" slot="left">
        <span>1111</span>
      </el-table-column>
    </tablePage>
  </div>
</template>

<script>
import tablePage from "@/components/table/tablePage";
import TableToolBar from "../components/table/tableToolBar.vue";
import ToolBar from "../components/table/toolBar.vue";
export default {
  components: { tablePage, TableToolBar, ToolBar },
  data() {
    return {
      tableData: {
        totalElements: 2000,
        pageNum: 1,
        pageSize: 10,
        content: [
          {
            test1: "111",
            test2: "222",
            test3: "333",
            test4: "444",
          },
        ],
      },
      formData: [
        {
          label: "班级名称",
          type: "input",
          prop: "clazzName",
          value: "",

          props: {
            placeholder: "请输入班级名称",
          },
        },
        {
          label: "選擇班級",
          type: "select",
          prop: "classSelect",
          value: "",
          props: {
            placeholder: "請選擇班級",
          },
          options: [
            { label: "班級1", value: "one" },
            { label: "班級2", value: "two" },
          ],
        },
        {
          label: "班级時間範圍",
          type: "date",
          prop: "date",
          value: "",
          props: {
            type:'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          },
        },
        {
          label: "班级名称",
          type: "time",
          prop: "time",
          value: "",
          props: {
            placeholder: "請選擇時間",
          },
        },
      ],
      columns: [
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
        },
        {
          label: "测试2",
          prop: "test2",
          fixed: "left",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试3",
          prop: "test3",
        },
        {
          label: "测试4",
          prop: "test4",
          fixed: "right",
        },
      ],
    };
  },
  methods: {
    currentChange(pageNum, pageSize) {
      console.log(pageNum, pageSize);
    },
  },
};
</script>
<style lang="scss" scoped></style>
