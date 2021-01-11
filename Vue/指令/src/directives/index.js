import copy from "./copy";
import longpress from "./longpress";
import debounce from "./debounce";
import emoji from "./emoji";
import lazyload from "./lazyLoad";
import permission from "./permission";
import waterMarker from "./waterMarker";
import draggable from './draggle'
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  lazyload,
  permission,
  waterMarker,
  draggable
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
