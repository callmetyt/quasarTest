//引入echarts核心
import * as echarts from "echarts/core";
//引入插件
import {
  LineChart,
  LineSeriesOption,
  LinesChart,
  LinesSeriesOption,
} from "echarts/charts";
import { GridComponent, GridComponentOption } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

//混合出必备组件的接口
export type ECOption = echarts.ComposeOption<
  LineSeriesOption | LinesSeriesOption | GridComponentOption
>;

//注册echarts插件
echarts.use([LineChart, LinesChart, GridComponent, CanvasRenderer]);

//对外暴露echarts
export default echarts;
