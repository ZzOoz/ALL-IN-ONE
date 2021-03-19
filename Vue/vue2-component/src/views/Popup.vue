<template>
  <div>
    <el-button @click="handleShowPopup">打开simple类型弹出窗</el-button>
    <dialogPop
      :visible.sync="isShowPopup"
      :pop="popType"
      title="弹出层"
      confirm-btn="确定"
      cancel-btn="取消"
      :showCancelBtn="true"
      :showConfirmBtn="true"
      @open="handleShowPopup"
      @close="handleCancel"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
    </dialogPop>
  </div>
</template>

<script>
import dialogPop from "@/components/table/dialogPop";
export default {
  name: "Popup",
  components: { dialogPop },
  data() {
    return {
      isShowPopup: false,
      popType: "big",
    };
  },
  methods: {
    handleConfirm() {
      this.isShowPopup = false;
    },
    handleShowPopup() {
      this.isShowPopup = true;
    },
    handleCancel() {
      this.isShowPopup = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
