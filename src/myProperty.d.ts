import Vue from "vue";
import api from "./api";
import echarts from "./plugins/echarts";

//补充 Vue 原型的一些自定义属性
declare module "vue/types/vue" {
  interface Vue {
    $api: api;
    $echarts: echarts;
  }
  interface Home extends Vue {
    isShowLoading: boolean;
    loadingText: string;
  }
}
