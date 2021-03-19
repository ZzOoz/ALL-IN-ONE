<template>
  <!-- 基于element-ui的弹出层弹窗 -->
  <el-dialog
    ref="dialog"
    v-dialogDrag
    v-bind="attributes"
    v-on="events"
    top="15vh"
    :custom-class="attributes.pop"
    class="Pop"
  >
    <!-- 具体内容插槽 -->
    <slot />
    <!-- content内容显示 -->
    <component :is="attributes.content" />
    <div slot="footer">
      <el-button
        v-if="showCancelBtn"
        v-throttle="attributes.btnThrottle"
        plain
        @click.stop="handleCancel"
        >{{ attributes.cancelBtn }}</el-button
      >
      <el-button
        v-if="showConfirmBtn"
        v-throttle="attributes.btnThrottle"
        plain
        @click.stop="handleConfirm"
        >{{ attributes.confirmBtn }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    // 控制显示和隐藏
    visible: {
      type: Boolean,
      default: false,
    },
    // 控制弹出层的大小
    pop: {
      type: String,
      default: "big",
      validator(value) {
        return ["simple", "complex", "big"].includes(value);
      },
    },
    // 弹出层标题
    title: {
      type: String,
      default: "请加上标题",
    },
    // 组件的内容可以通过cotent给到
    content: {
      type: Object,
    },
    // 元素节点属性
    elementAttributes: {
      type: Object,
    },
    // 元素节点事件
    elementEvent: {
      type: Object,
    },
    confirmBtn: {
      type: String,
      default: "确定",
    },
    cancelBtn: {
      type: String,
      default: "取消",
    },
    // 确认事件
    confirm: {
      type: Function,
    },
    // 删除事件
    cancel: {
      type: Function,
    },
    showConfirmBtn: {
      type: Boolean,
      default: true,
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    }
  },
  directives: {
    // 节流指令
    throttle: {
      // 元素挂载的时候执行这个inserted
      inserted(el, binding) {
        // 点击click事件的时候就会触发
        el.addEventListener("click", () => {
          // 如果disabled为false的时候就重置为true，然后给个定时器变回false
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              el.disabled = false;
            }, binding.value || 1200);
          }
        });
      },
    },
    // 拖拽指令
    dialogDrag: {
      bind(el) {
        const dialogHeaderEl = el.querySelector(".el-dialog__header");
        const dragDom = el.querySelector(".el-dialog");

        dialogHeaderEl.style.cssText += ";cursor:move;";
        dragDom.style.cssText += ";top:0px;";
        dragDom.style.userSelect = "none";

        // 获取某个css样式的值 (立刻执行函数)
        const sty = (function() {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr];
          } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr];
          }
        })();

        dialogHeaderEl.onmousedown = function(e) {
          // 当鼠标点击下去的时候获取它的x和y的偏移量 其实就是等于它的clientX/clientY(鼠标点击的x轴/y轴)-头部header的宽/高
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;

          // 获取body的宽和高
          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          // 获取对话框的宽和高
          const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
          const dragDomHeight = dragDom.offsetHeight; // 对话框高度

          // 这里的maxDragDomLeft（是向右偏移的最大值），minDragDomLeft（是向左偏移的最大值）
          const minDragDomLeft = dragDom.offsetLeft;
          const maxDragDomLeft =
            screenWidth - dragDomWidth - dragDom.offsetLeft; // 向右偏移最大值 = body宽度-对话窗的宽度-向左偏移值

          // 这里的maxDragDomTop（是向下偏移的最大值），minDragDomTop（是向上偏移的最大值）
          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop =
            screenHeight - dragDomHeight - dragDom.offsetTop; // 向下偏移最大值 = body宽度-对话窗的高度-向上偏移值


          let styL = sty(dragDom, "left");
          let styT = sty(dragDom, "top");
          
          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (styL.includes("%")) {
            styL = +document.body.clientWidth * (+styL.replace(/%/g, "") / 100);
            styT =
              +document.body.clientHeight * (+styT.replace(/%/g, "") / 100);
          } else {
            styL = +styL.replace(/px/g, "");
            styT = +styT.replace(/px/g, "");
          }

          document.onmousemove = function(e) {
            // 这里的left和top是用来进行边界处理 用鼠标的偏移量-disX/disY（就是上面mousedown的鼠标偏移量-dialog的头部宽高，这是一个固定值当mousedown触发的时候）
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            if (-left > minDragDomLeft) {
              // 因为mousemove的clientX是一个可变的值 那么负的left会小于minDragDomLeft 那么就直接left取反=maxDragDom就可以了
              left = -minDragDomLeft;
            } else if (left > maxDragDomLeft) {
              // 因为mousemove的clientX是一个可变的值 那么left会大于maxDragDom 那么就直接left=maxDragDom就可以了
              left = maxDragDomLeft;
            }

            // 这里也同理
            if (-top > minDragDomTop) {
              top = -minDragDomTop;
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop;
            }

            // 更新当期的位置 偏移量（styl、styT）加上 偏移量left、top
            dragDom.style.cssText += `;left:${left + styL}px;top:${top +
              styT}px;`;
          };

          // 清空
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
  computed: {
    // 将所有的属性进行整合然后一次性v-bind绑定所有属性
    attributes() {
      const propsArr = [
        "visible",
        "pop",
        "title",
        "content",
        "confirmBtn",
        "cancelBtn",
        "btnThrottle",
        "closeOnClickModal",
        "appendToBody",
      ];
      const userObj = {};
      console.log(this.title, "我是title");
      propsArr.forEach((v) => {
        userObj[v] = this[v];
      });
      console.log(userObj, "attrs");
      return Object.assign({}, userObj, this.elementAttributes, this.$attrs);
    },
    // 将所有的事件整合然后一次性v-on监听所有事件
    events() {
      const userObj = {
        open: this.handleOpen,
        close: this.handleClose,
      };

      return Object.assign({}, userObj, this.elementEvent, this.$attrs);
    },
  },
  data() {
    return {};
  },
  methods: {
    handleOpen() {
      // 获取弹出层的节点 每次点击都回归原位
      const el = this.$refs.dialog.$el.querySelector(".el-dialog");
      el.style.top = 0;
      el.style.left = 0;
      this.$emit("open");
      // console.log(el, "el");
    },
    handleClose() {
      this.$emit("close");
    },
    handleCancel() {
      this.cancel && this.cancel();
      this.$emit("cancel");
    },
    handleConfirm() {
      this.confirm && this.confirm();
      this.$emit("confirm");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/common/var.scss";
.EtmPop {
  .el-dialog {
    background-color: $white;
    border-radius: 4px;
    margin-bottom: 0 !important;
    &.simple {
      width: 480px;
      .el-dialog__body {
        min-height: 115px;
        max-height: 226px;
      }
    }
    &.complex {
      width: 686px;
      .el-dialog__body {
        min-height: 281px;
        max-height: calc(70vh - 139px);
      }
    }
    &.big {
      width: 1000px;
      .el-dialog__body {
        min-height: 421px;
        max-height: calc(70vh - 139px);
      }
    }
    .el-dialog__header {
      height: 55px;
      padding: 19px 24px 20px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      // border-color: $etm-border-color;
      .el-dialog__title {
        // color: $--color-text-primary;
        font-size: 16px;
        font-weight: 400;
        line-height: 1;
      }
      .el-dialog__headerbtn {
        top: 16px;
        &:hover .el-dialog__close,
        &:focus .el-dialog__close {
          color: $--color-primary;
        }
      }
    }
    .el-dialog__body {
      margin-top: 24px;
      padding: 0 24px 0;
      overflow: auto;
    }
    .el-dialog__footer {
      width: 100%;
      padding: 14px 24px 14px;
      .el-button {
      }
      .el-button + .el-button {
        margin-left: 8px;
      }
    }
  }
}
</style>
