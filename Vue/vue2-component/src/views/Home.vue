<template>
  <div class="home">
    <!-- 上传头像组件使用 -->
    <uploadAvatar
      v-model="userInfo.avatar"
      :resource-name="'basic/account'"
      media-type="image"
      @success="uploadSuccess"
    />

    <!-- 上传图片组件使用 -->
    <uploadImage
      resource-name="accountManage"
      :preview-src-list="userInfo.srcList"
      :preview-src-key="userInfo.srcKeyList"
      :limit-number="1"
      :limit-size="5"
      limit-type="JPG"
      @getImgList="getImgList"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import uploadAvatar from "@/components/uploadAvatar.vue";
import uploadImage from "@/components/uploadImage.vue";
export default {
  name: "Home",
  components: {
    uploadAvatar,
    uploadImage,
  },
  data() {
    return {
      userInfo: {
        avatar: undefined,
        srcList:[],
        srcKeyList:[]
      },
    };
  },
  methods: {
    uploadSuccess(hash, key, url) {
      console.log(hash, "hash");
      console.log(key, "key");
      console.log(url, "url");
    },
    getImgList() {},
  },
};
</script>
