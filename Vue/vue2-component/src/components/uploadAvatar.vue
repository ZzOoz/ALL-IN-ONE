<template>
  <!-- 上傳頭像組件 -->
  <!-- 使用方式： -->
  <!-- <etm-upload-avatar
    v-model="userInfo.avatar"
    :resource-name="'basic/account'"
    media-type="image"
    @success="success"
  /> -->
  <div class="uploadImage" :value="value">
    <div
      class="uploadInput"
      :class="['uploadInput__' + shape]"
      @click="trigger"
    >
      <input type="file" @change="onchange" />
      <img
        class="image"
        v-if="imgUrl && imgUrl !== null"
        :src="imgUrl"
        alt=""
      />
      <span v-else class="no-img"><i class="iconfont iconmorentouxiang"/></span>
      <span class="uploadBtn">{{
        imgUrl && imgUrl !== null ? "编辑" : "上传"
      }}</span>
    </div>
  </div>
</template>

<script>
// import { uploadFile } from "@/api/base.js";
const imgDomain = "";
export default {
  name: "uploadAvatar",
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 上传类型
    type: {
      type: Array,
      default() {
        return ["jpg", "jpeg", "png"];
      },
    },
    // 上传的样式形状
    shape: {
      type: String,
      default() {
        return "circle";
      },
      // 验证从父组件传过来的参数
      validator(val) {
        return ["circle", "square"].includes(val);
      },
    },
    resourceName: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      default: () => {
        // 默认image类型
        return "image";
      },
    },
  },
  data() {
    return {
      imgUrl: this.value,
    };
  },
  watch: {
    value(val) {
      this.imgUrl = imgDomain + val;
    },
  },
  methods: {
    trigger() {
      document
        .querySelector(".uploadInput")
        .querySelector("input")
        .click();
    },
    // 文件读取后的操作
    onchange(e) {
      const file = e.target.files[0];
      console.log(file, "file");
      const isIn = this.type.some((item) => {
        // 判断字符串是否具有这个item
        return file.type.includes(item);
      });

      if (!isIn) {
        // 引入element-ui 直接挂在到$message中
        return this.$message.error(
          "请上传" + this.type.toString() + "类型的图片"
        );
      }

      // 生成blob格式图片连接（因为没有后台所以只能在本地上传，如果是有后台并不是这样操作,要使用下面注释的操作）
      const url = window.URL.createObjectURL(file);
      this.$emit("input", url);
      setTimeout(() => {
        this.imgUrl = url;
      });
      // 没有获取后台的hash和key 只能用url作为代替
      this.upload(url, url, url);

      //   const temp = {
      //     raw: file,
      //     name: file.name,
      //   };

      //   // 调用上传文件的方法
      //   uploadFile(temp, this.resourceName, this.mediaType).then((res) => {
      //     const url = window.URL.createObjectURL(file);
      //     this.$emit("input", res.key);
      //     setTimeout(() => {
      //       this.imgUrl = url;
      //     }, 500);
      //     this.upload(res.data.hash, res.data.key, url);
      //   });
    },

    // 触发父组件的success回调
    upload(hash, key, url) {
      // hash\key\url 可能是后端需要的数据可以在success回调获取
      this.$emit("success", hash, key, url);
    },
  },
};
</script>

<style scoped lang="scss">
.uploadImage {
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  .uploadInput {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    i {
      font-size: 40px;
      color: #c1c4cc;
    }
    .image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .uploadBtn {
    position: absolute;
    font-size: 12px;
    width: 38px;
    top: 24px;
    right: 0px;
    color: white;
    display: none;
    border-bottom-left-radius: 50px;
    background-color: rgba(22, 22, 22, 0.4);
    border-bottom-right-radius: 50px;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    .uploadBtn {
      display: block;
    }
  }
}
input[type="file"] {
  display: none;
}
</style>
