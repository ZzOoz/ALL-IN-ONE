<template>
  <div class="home">
    <!-- 带输入建议的输入框 -->
    <div class="content">
      <div class="title"><h2>vue2组件及功能整理</h2></div>
      <div class="dropdown">
        <el-dropdown>
          <span class="el-dropdown-link">
            全局功能<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><span @click="handleShowPopup">切换主题</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="search"><AutoComplete /></div>
    </div>

    <div class="switchPop">
      <DialogPop
        :visible.sync="isShowThemePopup"
        title="切换主题"
        pop="complex"
        @open="handleShowPopup"
        @close="handleCancel"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <div class="switchSkin">
          <div
            v-for="(theme, index) of themes"
            :key="index"
            :class="['theme-item', value === theme.className ? 'active' : '']"
            @click="handleSwitchTheme(theme.className)"
          >
            <div class="img-box">
              <img :src="theme.img" :alt="theme.img" />
            </div>
            <div class="theme-text">{{ theme.name }}</div>
          </div>
        </div>
      </DialogPop>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AutoComplete from "@/components/autoComplete.vue";
import DialogPop from "../components/table/dialogPop.vue";
export default {
  name: "Home",
  components: {
    AutoComplete,
    DialogPop,
  },
  data() {
    return {
      isShowThemePopup: false,
      value: window.document.documentElement.className,
      themes: [
        {
          name: "青出于蓝",
          className: "Yten-rainBlue",
          img: require("@/assets/images/themes/rainBlue.png"),
        },
        {
          name: "粉妆玉砌",
          className: "Yten-pink",
          img: require("@/assets/images/themes/pink.png"),
        },
        {
          name: "紫气东来",
          className: "Yten-purple",
          img: require("@/assets/images/themes/purple.png"),
        },
        {
          name: "温暖橘红",
          className: "Yten-warmOrange",
          img: require("@/assets/images/themes/warmOrange.png"),
        },
        {
          name: "尊贵黑金",
          className: "Yten-blackGold",
          img: require("@/assets/images/themes/blackGold.png"),
        },
        {
          name: "碧空如洗",
          className: "Yten-blue",
          img: require("@/assets/images/themes/blue.png"),
        },
        {
          name: "郁郁葱葱",
          className: "Yten-green",
          img: require("@/assets/images/themes/green.png"),
        },
        {
          name: "粉红少女",
          className: "Yten-girlPink",
          img: require("@/assets/images/themes/girlPink.png"),
        },
        {
          name: "薰衣草紫",
          className: "Yten-lavenderPurple",
          img: require("@/assets/images/themes/lavenderPurple.png"),
        },
      ],
    };
  },
  methods: {
    handleShowPopup() {
      this.isShowThemePopup = true;
    },
    handleCancel() {
      const oldClassName = JSON.parse(localStorage.getItem('hotConfig')).themeName
      this.changeTheme(oldClassName)
      this.isShowThemePopup = false;
    },
    // 確定切换主题色操作
    handleConfirm() {
      // 1.获取缓存中的设置
      // 2.将切换的值赋值给缓存中
      // 3.触发vuex更新state数据
      // 4.存入缓存
      // 5.触发父组件confirm方法

      const hotConfig = JSON.parse(localStorage.getItem("hotConfig"));
      console.log(hotConfig, "hostCo");
      hotConfig.themeName = this.value;
      this.$store.dispatch("base/setThemeName", hotConfig.themeName);
      console.log(JSON.stringify(hotConfig), "hos");
      localStorage.setItem("hotConfig", JSON.stringify(hotConfig));
      this.isShowThemePopup = false;
      // this.$emit("confirm", false);
    },
    // 处理主题色
    handleSwitchTheme(className) {
      this.value = className;
      console.log(this.value);
      this.changeTheme(className);
    },
    changeTheme(className) {
      toggleClass(document.documentElement, className);

      function toggleClass(element, className) {
        if (!element || !className) {
          return;
        }

        element.className = className;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/themeConfig.scss";
.content {
  width: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .dropdown {
    margin-bottom: 12px;
  }
  .title {
    text-align: center;
    @include Yten-color;
  }
}

.switchSkin {
  display: flex;
  flex-wrap: wrap;

  .theme-item {
    flex: 0 0 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    cursor: pointer;

    .img-box {
      padding: 8px;
      border: 1px solid #eee;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      margin-bottom: 16px;

      > img {
        vertical-align: middle;
        height: 90px;
      }
    }

    &.active {
      .img-box {
        @include Yten-bdc;
        border: 1px solid;
      }

      .theme-text {
        @include Yten-color;
      }
    }
  }
}
</style>
