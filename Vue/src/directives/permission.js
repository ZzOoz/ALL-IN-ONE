// 权限指令
function checkArray(key) {
  let arr = ["1", "2", "3", "4"];
  let index = arr.indexOf(key);
  if (index > -1) {
    return true; // 有权限
  } else {
    return false; // 无权限
  }
}

const permission = {
  inserted: function(el, binding) {
    // 拿到这个指令里面的值
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      // 通过checkArray判断是否具有权限显示和隐藏
      let hasPermission = checkArray(permission);
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};

export default permission;
