<template>
  <div class="">
    <itemTemplate
      :data.sync="dragData"
      :noSlot="[]"
      @add="handleAdd"
      @change="handleChange"
      @delete="handleDelete"
      @blur="handleBlur"
      @focus="handleFocus"
    ></itemTemplate>
  </div>
</template>

<script>
import itemTemplate from "./itemTemplate";
export default {
  components: { itemTemplate },
  data() {
    return {
      dragData: [
        { id: 1, text: "早餐1", color: "rgb(255,69,0)" },
        { id: 1, text: "早餐2", color: "rgb(255,140,0)"},
        { id: 1, text: "早餐3", color: "rgb(199,21,133)" },
      ],
      addText: "添加新类型",
      oldText: undefined,
    };
  },
  computed: {},
  methods: {
    // 处理添加标签
    handleAdd() {
      const data = this.dragData;
      if (data.length) {
        if (data[data.length - 1] && !data[data.length - 1].text) {
          this.$message.error("请先填写上一个输入框的内容");
          return;
        }
      }
      this.dragData.push({
        text: "",
      });
    },
    // 处理删除标签
    handleDelete(arg) {
      // 1.处理还没有新建的标签的删除
      // console.log(arg, "index");
      if (!this.dragData[arg[0].index].id) {
        this.dragData.splice(arg[0].index, 1);
      }

      // 2.处理已经新建的标签的删除(请求删除接口)
    },
    // 处理改变顺序
    handleChange(...arg) {
      console.log(arg, "我是change");
    },
    // 处理失焦时候的逻辑
    handleBlur(index) {
      console.log(index);
      const target = this.dragData[index];
      if (target.text === this.oldText) {
        return;
      }

      const data = {
        editable: true,
        text: target.text,
      };

      console.log(data);
      // 1.如果没有id那么就是新增
      // 2.如果有id那么就是更新
    },
    // 处理聚焦时候的逻辑
    handleFocus(index) {
      this.oldText = this.dragData[index].text;
    },
  },
};
</script>
<style lang="scss" scoped></style>
