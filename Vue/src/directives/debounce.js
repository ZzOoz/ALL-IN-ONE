// 防抖操作 用户表单输入节省性能
const debounce = {
  // inserted: 插入父元素的时候调用
  inserted: function(el, binding) {
    let timer;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 1000);
    });
  },
};

export default debounce;
