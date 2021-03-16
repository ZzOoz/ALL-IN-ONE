<template>
  <div class="">
    <colorSelect v-model="color" :string="'我是通过attrs传过来的属性'"></colorSelect>
  </div>
</template>

<script>
import colorSelect from "@/components/colorSelect.vue";
export default {
  components: { colorSelect },
  data() {
    return {
      color:'rgb(254,233,200)'
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped></style>
