// 长按操作指令
const longpress = {
  bind: function(el, binding, vNode) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    // 定义变量
    let pressTimer = null;
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e) => {
      // e.type 指的是触发的事件
      if (e.type === "click" && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler();
        }, 2000);
      }
    };
    // 取消计时器
    let cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 运行函数
    const handler = (e) => {
      binding.value(e);
    };
    // 添加事件监听器
    /***
       * touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。

         touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。

         touchend事件：当手指从屏幕上离开的时候触发。
       */
    el.addEventListener("mousedown", start); // 鼠标按钮被按下
    el.addEventListener("touchstart", start); //
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel); // 鼠标从某元素移开
    el.addEventListener("touchend", cancel); //
    el.addEventListener("touchcancel", cancel);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
};

export default longpress;
