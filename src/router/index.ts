import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home", //home视图
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/", //home的首页
        name: "index",
        component: () => import("../components/home/index.vue"),
      },
      {
        path: "monitor", //home的监测页面
        name: "monitor",
        component: () => import("../components/home/monitor.vue"),
      },
    ],
  },
  {
    path: "/", //登录视图（默认）
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
