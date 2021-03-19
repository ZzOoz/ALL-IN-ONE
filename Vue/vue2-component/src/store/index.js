import Vue from "vue";
import Vuex from "vuex";
import getter from "./getter";
Vue.use(Vuex);

// 通过webpack的require.context获取module文件夹下的文件路径
const moduleFiles = require.context("./modules", true, /\.js$/);

// module是总值，最后的{}是module的初始值
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  // 与 regexp 中的第1的相匹配的文本
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  // 通过require.context返回的函数获取module的value
  const value = moduleFiles(modulePath);
  modules[moduleName] = value.default;

  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getter
});

export default store
