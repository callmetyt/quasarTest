import { infoData } from "@/api/getInfo";

let dataHandleIn: dataHandleIn = (data) => {
  //获取攻击类型
  let type = parseInt(data[2]);
  //获取其他攻击信息
  let dataStr = data
    .substring(data.indexOf(",") + 2, data.lastIndexOf(",") - 2)
    .split(",");
  let dataRes = dataStr.map((item) => {
    return parseFloat(item);
  });

  return {
    type,
    smean: dataRes[0],
    sbytes: dataRes[1],
    ct_srv_src: dataRes[2],
    sload: dataRes[3],
    stcpb: dataRes[4],
    ct_srv_dst: dataRes[5],
    proto: dataRes[6],
    dtcpb: dataRes[7],
    ackdat: dataRes[8],
    ct_dst_src_ltm: dataRes[9],
  };
};

export default dataHandleIn;

interface dataHandleIn {
  (data: string): infoData;
}
