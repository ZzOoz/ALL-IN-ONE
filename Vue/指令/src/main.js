import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Directives from "./directives";

Vue.config.productionTip = false;
Vue.use(Directives);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
