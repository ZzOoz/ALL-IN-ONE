<template>
  <div class="index">
    <div class="btn-group">
      <div class="btn">分享</div>
      <div class="btn">充值</div>
      <div class="btn">详情</div>
    </div>
  </div>
</template>

<script>
// import wx from "weixin-js-sdk";
import API from "../api";
// import utils from "../utils";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    console.log(this.userInfo,'userInffff')
    if (this.$cookie.get("openId")) {
      this.getUserInfo();
    }
  },
  methods: {
    getUserInfo() {
      this.$http.get(API.getUserInfo).then((res) => {
        console.log(res, "userInfo");
        this.userInfo = res.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  background: #ffc93a;
  width: 100%;
  height: 100vh;
}
.btn-group {
  position: relative;
  top: 40%;
  height: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn {
  font-size: 0.15rem;
  width: 2.54rem;
  height: 0.38rem;
  background: #ff3418;
  margin: 0 auto;
  text-align: center;
  border-radius: 0.2rem;
  color: white;
  line-height: 0.38rem;
}
</style>
