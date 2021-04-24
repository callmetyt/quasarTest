import axios from "axios";
import config from "@/config/config";
import dataHandleIn from "@/utils/dataHandleIn";
import { Home } from "vue/types/vue";

let getInfo: getInfo = async function(vm) {
  //获取websocket地址
  let websocketAddress = vm.$store.state.websocketAddress;

  //websocket建立
  const socket = new WebSocket("ws://" + websocketAddress + ":7879");

  let conRes = await new Promise<boolean>((resolve) => {
    //connection open
    socket.addEventListener("open", () => {
      // socket.send("hello server");
      // vm.loadingText = "等待socket信息";

      resolve(true);
    });

    //err
    socket.addEventListener("error", (e) => {
      console.log("socket connect err!");
      // vm.isShowLoading = false;

      console.log(e);
      resolve(false);
    });

    //message received
    socket.addEventListener("message", (e) => {
      // console.log("message from server received");
      //接收到第一条socket信息，关闭
      // if (vm.isShowLoading) {
      //   vm.isShowLoading = false;
      // }

      let res = dataHandleIn(e.data);
      // console.log(res);
      vm.$store.commit("setInfoData", res);
    });
  });
  return conRes;
};

export default getInfo;

interface getInfo {
  (vm: Home): Promise<boolean>;
}

export interface infoData {
  type: number;
  smean: number;
  sbytes: number;
  ct_srv_src: number;
  sload: number;
  stcpb: number;
  ct_srv_dst: number;
  proto: number;
  dtcpb: number;
  ackdat: number;
  ct_dst_src_ltm: number;
}
