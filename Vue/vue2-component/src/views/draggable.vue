<template>
  <div class="">
    <draggableItem :data.sync="dragData" :change="change">
      <template v-slot:color="slotProps">
        <ColorSelect
          v-model="dragData[slotProps.index].color"
          @change="(arg) => handleColorChange(slotProps.index, ...arg)"
        />
        {{ slotProps.index }}
      </template>
    </draggableItem>
  </div>
</template>

<script>
import draggableItem from "@/components/tabType/draggableItem";
import ColorSelect from "@/components/colorSelect";

export default {
  components: { draggableItem, ColorSelect },
  data() {
    return {
      dragData: [
        { people: "cn", id: 1, name: "www.itxst.com",color:'red' },
        { people: "cn", id: 2, name: "www.baidu.com",color:'red' },
        { people: "cn", id: 3, name: "www.taobao.com",color:'red' },
        { people: "us", id: 4, name: "www.google.com",color:'red' },
      ],
    };
  },
  computed: {},
  methods: {
    change() {},
  },
};
</script>
<style lang="scss" scoped></style>
