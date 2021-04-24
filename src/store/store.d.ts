import { infoData } from "@/api/getInfo";

//vuexRoot的一些类型接口

interface root {
  token: string;
  infoData: infoData[];
  latest: number;
  countArr: countArr;
  countArrList: countArrList;
  countAll: countArr;
  websocketAddress: string;
  systemAddress: string;
}

type countArr = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

type countArrList = [
  number[],
  number[],
  number[],
  number[],
  number[],
  number[],
  number[],
  number[],
  number[],
  number[]
];
