// 节流函数
export function throttle(fn, delay = 500) {
  let last, deferTimer;
  return (args) => {
    const that = this;
    const _args = args;
    const now = +new Date();
    // 如果现在的时间 < 上一次的时间 + 间隔 代表是频繁点击触发 清除定时器
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(that, _args);
      });
    } else {
      // 否则就是非频繁触发 
      last = now;
      fn.apply(that, _args);
    }
  };
}
