//探测时间间隔
const timeGap = 10;

export default {
  attackSorts: [
    //攻击种类
    "Normal",
    "Generic",
    "Exploits",
    "Fuzzers",
    "DoS",
    "Reconnaissance",
    "Analysis",
    "Backdoor",
    "Shellcode",
    "Worms",
  ],
  allColumns: [
    //总探测列
    {
      name: "type",
      label: "类型",
      field: "type",
      align: "center",
    },
    {
      name: "all",
      label: "总探测次数",
      field: "all",
      align: "center",
    },
    {
      name: "list",
      label: `每${timeGap}秒探测频率`,
      align: "center",
      field: "list",
    },
  ],
  dataColumns: [
    //详细探测列
    { name: "smean", label: "smean", field: "smean", align: "center" },
    { name: "sbytes", label: "sbytes", field: "sbytes", align: "center" },
    {
      name: "ct_srv_src",
      label: "ct_srv_src",
      field: "ct_srv_src",
      align: "center",
    },
    { name: "sload", label: "sload", field: "sload", align: "center" },
    { name: "stcpb", label: "stcpb", field: "stcpb", align: "center" },
    {
      name: "ct_srv_dst",
      label: "ct_srv_dst",
      field: "ct_srv_dst",
      align: "center",
    },
    { name: "proto", label: "proto", field: "proto", align: "center" },
    { name: "dtcpb", label: "dtcpb", field: "dtcpb", align: "center" },
    { name: "ackdat", label: "ackdat", field: "ackdat", align: "center" },
    {
      name: "ct_dst_src_ltm",
      label: "ct_dst_src_ltm",
      field: "ct_dst_src_ltm",
      align: "center",
    },
  ],
  timeGap,
};
