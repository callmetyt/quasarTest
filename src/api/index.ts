import axios from "axios";
import config from "../config/config";
//初始化axios
// axios.defaults.baseURL = config.serverAddress;

//引入具体的 api
import login from "./login";
import getInfo from "./getInfo";

//组合所有api
let api = {
  login,
  getInfo,
};

//对外暴露组合好的api
export default api;

//api接口
interface api {
  login: login;
  getInfo: getInfo;
}
