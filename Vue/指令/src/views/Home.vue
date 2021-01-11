<template>
  <div class="home">
    <!-- v-copy指令 -->
    <button v-copy="copyText">复制</button>
    <button @click="changeText">改变文本的值</button>

    <!-- v-longpress指令 -->
    <span v-longpress="longpress">长按触发</span>

    <!-- v-debounce指令 -->
    <button v-debounce="debounceClick">防抖</button>

    <!-- v-emoji指令 -->
    <input type="text" v-model="note" v-emoji />

    <!-- 权限指令v-perssion -->
    <div class="btns">
      <!-- 显示 -->
      <button v-permission="'1'">权限按钮1</button>
      <!-- 不显示 -->
      <button v-permission="'10'">权限按钮2</button>
    </div>

    <div
      style="width:100%;height:500px"
      v-waterMarker="{
        text: '水水印',
        textColor: 'rgba(180, 180, 180, 0.4)',
      }"
    ></div>

    <!-- v-lazy懒加载指令 -->
    <div>
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
      <img v-lazy="src" /><br />
    </div>

    <div class="el-dialog" v-draggable></div>
  </div>
</template>

<script>
import Vue from "vue";
import LazyLoad from "../directives/lazyLoad";
Vue.directive("lazy", {
  bind(el, binding) {
    LazyLoad.init(el, binding.value, "");
  },
  inserted(el) {
    if (IntersectionObserver) {
      LazyLoad.observe(el);
    } else {
      LazyLoad.listenerScroll(el);
    }
  },
});
export default {
  name: "Home",
  components: {},
  data() {
    return {
      copyText: "a copy directives",
      src: "./favicon.ico",
      note: "",
    };
  },
  methods: {
    changeText() {
      this.copyText = "this is new text";
    },
    longpress() {
      alert("长按触发");
    },
    debounceClick() {
      alert("在规定的时间内只触发一次");
    },
  },
};
</script>
