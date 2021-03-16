<template>
  <div class="draggableItem">
    <draggable
      v-model="data"
      :handle="handle"
      filter="._filter"
      @change="change"
    >
      <div v-for="(item, index) in listData" :key="index">
        <!-- 是否显示颜色 如果noSlot这个数组没有的话就显示-->
        <div v-if="noSlot.indexOf('color') === -1" class="colorWrap">
          <!-- 同时绑定index值供父组件引用 -->
          <slot name="color" :index="index" />
        </div>

        <!-- 是否显示输入框 如果noSlot这个数组没有的话就显示-->
        <div v-if="noSlot.indexOf('input') === -1" class="inputWrap">
          <!-- 同时绑定index值供父组件引用 -->
          <slot name="input" :index="index" />
        </div>

        <!-- 是否显示单位 -->
        <div v-if="noSlot.indexOf('unit') === -1" class="unitWrap">
          <slot name="unit" :index="index" />
        </div>

        <!-- 是否显示number -->
        <div v-if="noSlot.indexOf('number') === -1" class="numberWrap">
          <slot name="number" :index="index" />
        </div>

        <!-- 是否显示switch -->
        <div v-if="hasSlot.indexOf('switch') === -1" class="switchWrap">
          <slot name="switch" :index="index" />
        </div>

        <!-- 是否显示delete 判断是否可以编辑 不可编辑显示无法编辑-->
        <div
          v-if="noSlot.indexOf('delete') === -1"
          class="deleteWrap"
          :class="
            item.editable === false ? 'deleteWrap _noDelete' : 'deleteWrap'
          "
          @click.stop="handleDelete(index)"
        >
          <slot name="delete" :index="index" />
        </div>

        <!-- 是否显示handle拖拽栏 判断是否可以移动 不可移动显示无法移动 _filter就是在draggable里面的filter类-->
        <div
          v-if="noSlot.indexOf('handle') === -1"
          class="handleWrap"
          :class="item.move === false ? 'handleWrap _filter' : 'handleWrap'"
        >
          <slot name="handle" :index="index" />
        </div>
      </div>
    </draggable>

    <el-button v-if="addText" type="dashed" @click.stop="handleAdd">{{
      addText
    }}</el-button>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  props: {
    // 添加按钮的text
    addText: {
      type: String,
      default() {
        return "添加类型";
      },
    },
    // data是父組件通過data.sync傳過來的
    data: {
      type: Array,
      required: true,
    },
    // 但鼠標移動到這個位置的時候才可以拖拽移動
    handle: {
      type: String,
      default: () => {
        return ".handleWrap";
      },
    },
    // draggable改變移動的時候會觸發
    change: {
      type: Function,
      required: true,
    },
    // 无需再draggable里面显示的插槽
    noSlot: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 需要在draggable显示显示的插槽
    hasSlot: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // 从父组件props拿过来的数据 不能直接改变 需要放到data里面间接处理
      listData: [{ id: 1, name: "111", color: "red" }],
      //   listData: this.data,
    };
  },
  watch: {
    // 当listData发生变化的时候 需要交给父组件处理 不能直接改变父组件props的值
    listData(val) {
      this.$emit("update:data", val);
    },
  },
  methods: {
    handleDelete(index) {
      if (this.data[index].editable === false) {
        return;
      }
      this.$emit("delete", { index });
    },
    handleAdd() {
      this.$emit("add");
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped></style>
