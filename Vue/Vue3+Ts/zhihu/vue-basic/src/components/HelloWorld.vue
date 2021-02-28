<template>
  <div class="hello"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const component = defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // setup有两个参数，一个是组件传过来的props，另一个由于无法获取到this，所以第二个参数用context来代替
  // setup(props, context) {},
});

export default component;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
