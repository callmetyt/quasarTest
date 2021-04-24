<template>
  <div id="monitor">
    <header>设备检测</header>

    <!-- 是否收到攻击框 -->
    <q-card class="attacked">
      <q-card-section class="text-h6 text-center">安全状况</q-card-section>
      <q-separator></q-separator>
      <q-card-section class="text-body2 text-center">
        {{ isAttacked ? "不安全" : "安全" }}
        <q-icon
          :name="
            isAttacked ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle'
          "
          :class="isAttacked ? 'text-red' : 'text-green'"
        ></q-icon>
      </q-card-section>
    </q-card>

    <!-- 攻击种类框 -->
    <q-card class="species">
      <q-card-section class="text-h6 text-center">攻击种类</q-card-section>
      <q-separator></q-separator>
      <q-card-section class="text-body2 text-center">
        {{ AttackSort }}
      </q-card-section>
    </q-card>

    <!-- 实时检测数据框 -->
    <q-card class="data">
      <data-table></data-table>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { mapState } from "vuex";
import { infoData } from "@/api/getInfo";
import config from "@/config/config";
import dataTable from "./dataTable/dataTable.vue";

@Component({
  name: "monitor",
  computed: {
    ...mapState({
      infoData: (state: any) => state.infoData, //检测数据
      latest: (state: any) => state.latest, //最新的条数下标
    }),
  },
  components: {
    dataTable,
  },
})
export default class Monitor extends Vue {
  //data
  public infoData!: infoData[];
  public latest!: number;

  //computed
  get latestData() {
    return this.infoData[this.latest - 1]; //最新的一条数据
  }
  get isAttacked() {
    //只要有一条数据存在攻击类型，就被攻击
    return this.infoData.some((val) => {
      return val.type !== 0;
    });
  }
  get AttackSort() {
    //获取对应攻击类型的文字描述
    return config.attackSorts[this.latestData.type];
  }
}
</script>

<style scoped lang="scss">
#monitor {
  height: 100vh;
  overflow-y: scroll;
  header {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 4px;
    background-color: #3f51b5;
    color: white;
    padding: 10px 0;
  }
  > :nth-child(n + 2) {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 90vw;
  }
  > :last-child {
    margin-bottom: 15vh;
  }
}
</style>
