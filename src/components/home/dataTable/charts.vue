<template>
  <div id="charts" ref="charts" :style="chartWidth"></div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import { ECOption } from "@/plugins/echarts";
import config from "@/config/config";

@Component({
  name: "chart",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
})
export default class Chart extends Vue {
  //methods
  updateCharts() {
    //频率数组
    let data: [] = this.$props.list;
    //生成二维图标数组
    const timeGap = config.timeGap;
    let length = data.length;
    let chartData = [];
    for (let i = 0; i < length; i++) {
      chartData.push([i * timeGap, data[i]]);
    }
    //删除容器
    this.$echarts.dispose(this.$refs.charts);
    //获取容器
    let myChart = this.$echarts.init(this.$refs.charts);
    //指定配置
    let option: ECOption = {
      title: {
        show: false,
      },
      grid: {
        show: false,
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: {
        type: "line",
        name: "频率",
        data: chartData,
        symbol: "circle",
      },
    };
    //渲染
    myChart.setOption(option);
  }

  //watch
  @Watch("list")
  updateChart(newV: [], oldV: []) {
    //数据更新后修改视图
    this.updateCharts();
  }

  //lifeCycle
  mounted() {
    //挂载后才能访问到DOM
    this.updateCharts();
  }

  //computed
  get chartWidth() {
    //图标更新后，增长图像的width
    let val = this.$props.list.length * 10 + 30;
    return {
      "--chartWidth": val + "px",
    };
  }
}
</script>

<style scoped lang="scss">
#charts {
  height: 100px;
  width: var(--chartWidth);
}
</style>
