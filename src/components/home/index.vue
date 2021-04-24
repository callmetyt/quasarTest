<template>
  <div id="index">
    <header>管理首页</header>

    <!-- 设备探测框 -->
    <q-card class="device">
      <q-card-section class="text-h6 text-center">设备信息</q-card-section>
      <q-separator></q-separator>
      <q-card-section class="text-body1">
        {{ systemString }}
      </q-card-section>
    </q-card>

    <!-- 管理员信息 -->
    <q-card class="info">
      <q-card-section class="text-h6 text-center">管理员信息</q-card-section>
      <q-separator></q-separator>
      <q-card-section class="text-body1">
        用户名：admin
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { mapState } from "vuex";

@Component({
  name: "index",
  computed: {
    ...mapState({
      systemAddress: (state: any) => state.systemAddress,
    }),
  },
})
export default class Index extends Vue {
  //data
  private deviceList: string[] = [
    "钢冶炼工控系统",
    "电力工控系统",
    "有色冶金工控系统",
  ];
  public systemAddress!: string;

  //computed
  get systemString() {
    //根据被检测系统地址的最后一位确定设备类型
    let flag = this.systemAddress[this.systemAddress.length - 1];
    return this.deviceList[parseInt(flag)];
  }
}
</script>

<style scoped lang="scss">
#index {
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
}
</style>
