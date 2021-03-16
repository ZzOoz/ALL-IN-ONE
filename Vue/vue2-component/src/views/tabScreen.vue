<template>
  <div class="">
    <!-- tab选择框 單選禁用-->
    <screenTab
      v-model="tabSelect"
      :disabled="true"
      :options="tabList"
      @change="tabChange"
    />

    <!-- tab选择框 單選-->
    <screenTab v-model="tabSelect" :options="tabList" @change="tabChange" />

    <!-- tab选择框 多选 -->
    <screenTab
      v-model="tabSelectList"
      :multiple="true"
      :options="tabList"
      @change="tabChange"
    />
  </div>
</template>

<script>
import screenTab from "@/components/screenTab.vue";
export default {
  components: { screenTab },
  data() {
    return {
      tabSelect: "select1",
      tabSelectList: ["select1", "select2"],
      tabList: [
        { name: "选项1", value: "select1" },
        { name: "选项2", value: "select2", disabled: true },
        { name: "选项3", value: "select3" },
      ],
    };
  },
  methods: {
    tabChange() {},
  },
  computed: {},
};
</script>
<style lang="scss" scoped></style>
