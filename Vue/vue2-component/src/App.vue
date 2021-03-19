<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.init();
  },
  data() {
    return {
      hotConfig: localStorage.getItem('hotConfig') || '',
    };
  },
  methods: {
    async init() {
      // 这里是通过当前的域名来请求获取配置，但是现在没有后台所以写死先
      // const hostname = location.hostname
      // await getHostSetting({hostname}).then(res=>{
      //   this.hotConfig = res.data
      // })
      const hotConfig = {
        themeName: "Yten-rainBlue",
      };
      localStorage.setItem("hotConfig", JSON.stringify(hotConfig));

      // 主题
      const themeMap = {
        "Yten-yellow": "Yten-yellow",
        "Yten-purple": "Yten-purple",
        "Yten-green": "Yten-green",
        "Yten-blue": "Yten-blue",
        "Yten-brown": "Yten-brown",
        "Yten-pink": "Yten-pink",
        "Yten-girlPink": "Yten-girlPink",
        "Yten-lavenderPurple": "Yten-lavenderPurple",
        "Yten-rainBlue": "Yten-rainBlue",
        "Yten-warmOrange": "Yten-warmOrange",
        "Yten-blackGold": "Yten-blackGold",
      };

      // 将主题色类绑定在最顶层html上面
      document.documentElement.className = themeMap[JSON.parse(this.hotConfig).themeName]
      this.$store.dispatch('base/setThemeName',JSON.parse(this.hotConfig).themeName)
    },
  },
};
</script>

<style lang="scss"></style>
