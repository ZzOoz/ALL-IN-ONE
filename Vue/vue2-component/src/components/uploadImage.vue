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
  <div style="height:500px;width:500px">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      v-bind="$attrs"
      action=""
      :multiple="selectMultiple"
      :limit="limitNumber"
      :show-file-list="false"
      :http-request="upload"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :on-error="handleError"
    >
      <div class="uploadContent">
        <i class="el-icon-plus" />
        <span>{{ text }}</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
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
      limitNumber: {
        type: Number,
        default: () => {
          return 0;
        },
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 处理上传时候的逻辑
    upload() {},
    // 上传之前处理的逻辑（验证图片格式、图片大小等,记得return true 不然无法执行下面逻辑）
    beforeUpload() {},
    // 处理上传错误逻辑
    handleError() {},
    // 超出个数限制的逻辑
    handleExceed() {},
    // 删除上传图片
    handleFileRemove() {},
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 300px;
  height: 300px;
  ::v-deep .el-upload {
    width: 100% !important;
    height: 100% !important;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>
