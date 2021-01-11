<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import API from "./api";
import utils from "./utils";
export default {
  name: "App",
  components: {},
  mounted() {
    // 测试号的appid
    // const appId = 'wx024b42aba4abd76c'
    // const redirectUrl = encodeURIComponent('http://teng.com')
    // 请求这个地址 当我们确认授权的时候会回调到redirect_url这个地址去
    // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    // this.checkUser();
    this.checkUser();
  },
  methods: {
    // 检查用户是否已经授权
    checkUser() {
      let openId = this.$cookie.get("openId");
      // 没有openId获取需要用户授权
      if (!openId) {
        window.location.href = API.wechatRedirect;
      } else {
        console.log('getWechat')
        // 如果获取到openId那么就是需要config注入配置
        this.getWechatConfig();
      }
    },
    // 获取微信配置
    getWechatConfig() {
      // 请求地址需要加上url查询参数 后端通过这个地址请求对应的openId
      this.$http
        .get(API.wechatConfig + `?url=${location.href.split("#")[0]}`)
        .then((response) => {
          let res = response.data;
          if (res.code == 0) {
            let data = res.data;
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appid, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.noncestr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表
            });
            // config注入配置成功后需要调用ready方法
            wx.ready(() => {
              utils.initSharInfo();
            });
          }
        });
    },
  },
  // 检查用户是否已经授权
  // checkUser() {
  //   let openId = this.$cookie.get("openId");
  //   // 没有openId获取需要用户授权
  //   if (!openId) {
  //     console.log("11111");
  //     window.location.href = API.wechatRedirect;
  //   } else {
  //     // 如果获取到openId那么就是需要config注入配置
  //     this.getWechatConfig();
  //   }
  // },
  // // 获取微信配置
  // getWechatConfig() {
  //   // 请求地址需要加上url查询参数 后端通过这个地址请求对应的openId
  //   this.$http
  //     .get(API.wechatConfig + `?url=${location.href.split("#")[0]}`)
  //     .then((response) => {
  //       let res = response.data;
  //       if (res.code == 0) {
  //         let data = res.data;
  //         wx.config({
  //           debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //           appId: data.appId, // 必填，公众号的唯一标识
  //           timestamp: data.timestamp, // 必填，生成签名的时间戳
  //           nonceStr: data.nonceStr, // 必填，生成签名的随机串
  //           signature: data.signature, // 必填，签名
  //           jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表
  //         });
  //         // config注入配置成功后需要调用ready方法
  //         wx.ready(() => {
  //           utils.initSharInfo();
  //         });
  //       }
  //     });
  // },
};
</script>

<style>
img {
  width: 2rem;
}
</style>
