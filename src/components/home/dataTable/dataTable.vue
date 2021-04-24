<template>
  <transition name="table">
    <!-- 带有echarts的实时数据框 -->
    <q-table
      v-if="switchTable"
      :columns="dataColumns"
      row-key="name"
      :data="latestInfoData"
      title="实时数据"
      key="1"
      :pagination="paginationInit"
      hide-pagination
    >
      <template #top-right>
        <q-btn label="切换" @click="switchTable = !switchTable"></q-btn>
      </template>
    </q-table>

    <!-- 具体数据框 -->
    <q-table
      title="总体数据"
      row-key="name"
      :columns="allColumns"
      :data="allDataRows"
      v-else
      key="2"
      :pagination="paginationInit"
      hide-pagination
    >
      <template #top-right>
        <q-btn label="切换" @click="switchTable = !switchTable"></q-btn>
      </template>
      <template #body-cell-list="props">
        <q-td :props="props">
          <!-- <div>{{ props.row.list }}</div> -->
          <charts :list="props.row.list"></charts>
        </q-td>
      </template>
    </q-table>
  </transition>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { mapState } from "vuex";
import { infoData } from "@/api/getInfo";
import { countArr, countArrList } from "@/store/store";
import config from "@/config/config";
import charts from "./charts.vue";

@Component({
  name: "dataTable",
  computed: {
    ...mapState({
      infoData: (state: any) => state.infoData,
      countAll: (state: any) => state.countAll,
      countArrList: (state: any) => state.countArrList,
    }),
  },
  components: {
    charts,
  },
})
export default class DataTable extends Vue {
  //data
  public infoData!: infoData[];
  public countAll!: countArr;
  public countArrList!: countArrList;
  private switchTable: boolean = false;
  private dataColumns = config.dataColumns; //config中配置的列
  private allColumns = config.allColumns; //config中配置的列
  private paginationInit = {
    rowsPerPage: 10,
  };

  //computed
  get allDataRows() {
    //获取攻击的10条数据
    //all为总计数，list为每次间隔的计数（用于echarts渲染）
    return [
      { type: "Normal", all: this.countAll[0], list: this.countArrList[0] },
      { type: "Generic", all: this.countAll[1], list: this.countArrList[1] },
      { type: "Exploits", all: this.countAll[2], list: this.countArrList[2] },
      { type: "Fuzzers", all: this.countAll[3], list: this.countArrList[3] },
      { type: "DoS", all: this.countAll[4], list: this.countArrList[4] },
      {
        type: "Reconnaissance",
        all: this.countAll[5],
        list: this.countArrList[5],
      },
      { type: "Analysis", all: this.countAll[6], list: this.countArrList[6] },
      { type: "Backdoor", all: this.countAll[7], list: this.countArrList[7] },
      { type: "Shellcode", all: this.countAll[8], list: this.countArrList[8] },
      { type: "Worms", all: this.countAll[9], list: this.countArrList[9] },
    ];
  }
  get latestInfoData() {
    //获取最新的10条数据
    return this.infoData.slice(-10);
  }
}
</script>

<style scoped lang="scss">
.table-enter-active {
  animation-name: fadeIn;
  animation-duration: 0.3s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
