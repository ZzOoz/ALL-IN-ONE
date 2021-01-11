// 图片懒加载
const LazyLoad = {
  // install方法
  //   install(Vue, options) {
  //     const defaultSrc = options.default;
  //     Vue.directive("lazy", {
  //       bind(el, binding) {
  //         LazyLoad.init(el, binding.value, defaultSrc);
  //       },
  //       inserted(el) {
  //         if (IntersectionObserver) {
  //           LazyLoad.observe(el);
  //         } else {
  //           LazyLoad.listenerScroll(el);
  //         }
  //       },
  //     });
  //   },
  // 初始化
  init(el, val, def) {
    // el就是每一个image
    el.setAttribute("data-src", val);
    el.setAttribute("src", def);
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    // 这里是支持IntersectionObserver的时候执行的方法
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc;
          console.log("setAttr");
          el.removeAttribute("data-src");
        }
      }
    });
    io.observe(el);
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300);
    LazyLoad.load(el);
    window.addEventListener("scroll", () => {
      handler(el);
    });
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight;
    const elTop = el.getBoundingClientRect().top; // elTop el元素上边到视窗上边的距离
    const elBtm = el.getBoundingClientRect().bottom; // elBtm el元素下边到视窗上边的距离
    const realSrc = el.dataset.src; // 真是图片地址
    // 如果元素上边到视窗上边的距离 减去 视窗的高度 是大于0的话 意味着图片是在视窗内的
    // 那就判断是否有src加载图片
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute("data-src");
      }
    }
  },
  // 滚动节流
  throttle(fn, delay) {
    let timer;
    let prevTime;
    return function(...args) {
      const currTime = Date.now();
      const context = this;
      if (!prevTime) prevTime = currTime;
      clearTimeout(timer);

      if (currTime - prevTime > delay) {
        prevTime = currTime;
        fn.apply(context, args);
        clearTimeout(timer);
        return;
      }

      timer = setTimeout(function() {
        prevTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  },
};

export default LazyLoad;
