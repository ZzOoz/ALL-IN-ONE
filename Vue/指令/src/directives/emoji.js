// 禁止输入特殊字符和emoji表情
// 返回元素
let findEle = (parent, type) => {
  // 当前元素的tagName是否等于type？ 是就返回这个元素
  return parent.tagName.toLowerCase() === type
    ? parent
    : parent.querySelector(type);
};

const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

const emoji = {
  bind: function(el, binding, vnode) {
    // 正则规则可根据需求自定义
    var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
    let $inp = findEle(el, "input");
    // 当前元素的$inp赋值
    el.$inp = $inp;
    // 处理函数
    $inp.handle = function() {
      // 将输入的val通过正则匹配后用空字符串消除
      let val = $inp.value;
      $inp.value = val.replace(regRule, "");

      trigger($inp, "input");
    };
    // 监听事件
    $inp.addEventListener("keyup", $inp.handle);
  },
  unbind: function(el) {
    el.$inp.removeEventListener("keyup", el.$inp.handle);
  },
};

export default emoji;
