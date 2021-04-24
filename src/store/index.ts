import { infoData } from "@/api/getInfo";
import Vue from "vue";
import Vuex from "vuex";
import { root } from "./store";

Vue.use(Vuex);

export default new Vuex.Store<root>({
  state: {
    token: "",
    infoData: [], //每次计数间隔所获取的数据
    latest: 0, //最新的countArr下标
    countArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //每次推送的种类数据
    countArrList: [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], //保存的总体计数数据
    countAll: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //每次计数间隔的最终种类数据
    websocketAddress: "", //websocket地址
    systemAddress: "", //被检测系统地址
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setInfoData(state, infoData: infoData) {
      //接收到一条数据
      state.infoData.push(infoData);
      state.latest++;
      state.countArr[infoData.type]++; //对应类型计数+1
    },
    setCountAvg(state) {
      //更新历史列表的值
      for (let i = 0; i < 10; i++) {
        state.countArrList[i].push(state.countArr[i]);
      }
      //更新总次数
      for (let i = 0; i < 10; i++) {
        let old = state.countAll[i];
        Vue.set(state.countAll, i, old + state.countArr[i]);
      }
      //初始化计数
      state.countArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    setWebsocketAddress(state, val: string) {
      //设置websocketAddress
      state.websocketAddress = val;
    },
    setSystemAddress(state, val: string) {
      //设置systemAddress
      state.systemAddress = val;
    },
  },
  actions: {},
  modules: {},
});
