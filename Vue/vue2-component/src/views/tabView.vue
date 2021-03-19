<template>
  <!-- 左右拖拽tab -->
  <div class="tabViews">
    <el-tabs v-model="tabValue" tab-position="left">
      <el-tab-pane
        v-for="tab in tabList"
        :label="tab.label"
        :name="tab.name"
        :key="tab.name"
      >
        <component :is="tab.components" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import typeOne from "@/components/tabType/typeOne";
import typeTwo from "@/components/tabType/typeTwo";

export default {
  components: { typeOne, typeTwo },
  data() {
    return {
      tabValue: "typeOne",
      tabList: [
        {
          label: "类型1",
          name: "typeOne",
          components: typeOne,
        },
        {
          label: "类型2",
          name: "typeTwo",
          components: typeTwo,
        },
      ],
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.tabViews {
  margin-top: 20px;
}
</style>
