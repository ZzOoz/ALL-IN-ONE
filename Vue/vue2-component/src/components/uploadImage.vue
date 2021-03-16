<template>
  <!-- 上传图片组件 -->
  <!-- <etm-upload-img
    resource-name="accountManage"
    :preview-src-list="businessData.businessPlaceDoorHeadSrc"
    :preview-src-key="businessData.businessPlaceDoorHead"
    :limit-number="1"
    :limit-size="5"
    limit-type="JPG"
    @getImgList="getPlaceDoorHead"
  /> -->
  <div class="uploadImg">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      v-bind="$attrs"
      action=""
      :multiple="selectMultiple"
      :limit="limitNumber"
      :show-file-list="false"
      :http-request="upload"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-error="handleError"
    >
      <div class="uploadContent">
        <i class="el-icon-plus" />
        <span>{{ text }}</span>
      </div>
    </el-upload>
    <div v-for="(img, index) in previewSrcList" :key="img" class="imgContent">
      <div class="imgItem">
        <el-image :src="img" fit="cover" />
        <i class="el-icon-error delete" @click="handleFileRemove(url, index)" />
      </div>
    </div>
  </div>
</template>

<script>
// import { uploadFile } from "../api/base";
export default {
  name: "uploadImage",
  props: {
    // 预览图片url的数组
    previewSrcList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    // 预览图片的key数组
    previewKeyList: {
      type: Array,
      default: () => [],
    },
    // 资源路径
    resourceName: {
      type: String,
      required: true,
    },
    // 上传媒体类型（只接受image和video）
    mediaType: {
      type: String,
      default() {
        return "image";
      },
      validator(val) {
        return ["image", "video"].includes(val);
      },
    },
    // 上传文本text
    text: {
      type: String,
      default: () => "",
    },
    // 是否选择多个文件
    selectMultiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    limitNumber: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    limitType: {
      type: String,
      default: null,
    },
    limitSize: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  watch: {
    previewSrcList() {
      this.initImgList();
    },
  },
  methods: {
    // 初始化图片列表
    initImgList() {
      const fileArr = [];
      this.previewSrcList.forEach((item) => {
        fileArr.push({ name: item });
      });

      this.$refs.upload.uploadFiles = fileArr;
      console.log(this.$refs.upload.uploadFiles, "黑恶化");
    },
    // 处理上传时候的逻辑
    upload(object) {
      const file = object.file;
      const resourceName = this.resourceName;
      const mediaType = this.mediaType;
      const temp = {
        file: object.file,
        name: object.file.name,
      };
      console.log(resourceName, mediaType, temp);
      // 因为这个只是个demo 所以先暂时在本地存储
      let previewSrcList = [];
      let previewKeyList = [];

      if (this.previewSrcList.length > 0) {
        previewSrcList = this.previewSrcList;
      }

      if (this.previewKeyList.length > 0) {
        previewKeyList = this.previewKeyList;
      }

      const url = window.URL.createObjectURL(file);
      this.previewSrcList.push(url);
      this.previewKeyList.push(url); // 这里没有后台返回的值 所以暂时用url代替
      this.$emit("getImgList", previewSrcList, previewKeyList);

      // 有后台处理的情况下处理的逻辑
      // uploadFile(temp, resourceName, mediaType).then((res) => {
      //   let previewSrcList = [];
      //   let previewKeyList = [];

      //   if (this.previewSrcList.length > 0) {
      //     previewSrcList = this.previewSrcList;
      //   }

      //   if (this.previewKeyList.length > 0) {
      //     previewKeyList = this.previewKeyList;
      //   }

      //   const url = window.URL.createObjectURL(file);
      //   this.previewSrcList.push(url);
      //   this.previewKeyList.push(res.data.key);
      //   this.$emit("getImgList", previewSrcList, previewKeyList);
      // });
    },
    // 上传之前处理的逻辑（验证图片格式、图片大小等,记得return true 不然无法执行下面逻辑）
    beforeUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      if (!isImage) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (this.limitType) {
        const str = this.limitType.toLowerCase();
        let text = "";
        let type = "";
        if (str.includes("jpg") || str.includes("jpeg")) {
          type = "image/jpeg";
          text = "JPG";
        } else if (str.includes("png")) {
          type = "image/png";
          text = "PNG";
        } else if (str.includes("gif")) {
          type = "image/gif";
          text = "GIF";
        }
        const isLimitType = file.type === type;
        if (!isLimitType) {
          this.$message.error("只能上传" + text + "格式的图片!");
          return false;
        }
      }
      if (this.limitSize) {
        const isLimitSize = file.size / 1024 / 1024 < this.limitSize;
        if (!isLimitSize) {
          this.$message.error(
            "上传的图片大小不能超过" + this.limitSize + "MB!"
          );
          return false;
        }
      }
      return true;
    },
    // 处理上传错误逻辑
    handleError() {
      this.$message.error("文件上传失败!");
    },
    // 超出个数限制的逻辑
    handleExceed() {
      const limit = this.$refs.upload.limit;
      this.$message.error(`最多只能上传${limit}个哦~`);
    },
    // 删除上传图片
    handleFileRemove(url, index) {
      this.previewSrcList.splice(index, 1);
      this.previewKeyList.splice(index, 1);
        // console.log(this.$refs.upload.uploadFiles, "files111");
        // 每次清空 到watch的时候重新赋值
        this.$refs.upload.clearFiles();
      // console.log(this.$refs.upload.uploadFiles, "files");
      this.$emit("getImgList", this.previewSrcList, this.previewKeyList);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadImg {
  display: flex;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  ::v-deep .el-upload {
    width: 100% !important;
    height: 100% !important;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.imgContent {
  .imgItem {
    width: 100px;
    height: 100px;
    margin-left: 15px;
    position: relative;
    .delete {
      color: red;
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
}
</style>
