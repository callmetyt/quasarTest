import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//quasar ui
//quasar 插件引入
import "./plugins/quasar";

//api
//api 引入
import api from "./api/index";
//挂载到Vue原型上，使其可以通过 this.$api 进行访问
Vue.prototype.$api = api;

//echart
//echart 引入
import echarts from "@/plugins/echarts";
//同 api 挂载作用
Vue.prototype.$echarts = echarts;

//关闭生产提示
Vue.config.productionTip = false;

//创建 Vue 实例并挂载到app上
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
