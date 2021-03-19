<template>
  <div class="table">
    <tablePage
      :data="tableData"
      :columns="columns"
      @currentChange="currentChange"
    >
    </tablePage>
  </div>
</template>

<script>
import tablePage from "@/components/table/tablePage";
export default {
  components: { tablePage },
  data() {
    return {
      tableData: {
        totalElements: 2000,
        pageNum: 1,
        pageSize: 10,
        content: [
          {
            test1: '111',
            test2: '222',
            test3: '333',
            test4: '444'
          }
        ]
      },
      columns: [
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
        },
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
        },
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
        },
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
        },
        {
          label: "测试1",
          prop: "test1",
          fixed: "left",
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
