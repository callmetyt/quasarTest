<template>
  <div class="home">
    <!-- loading组件 -->
    <loading :isShow="isShowLoading" :text="loadingText"></loading>

    <transition :name="tab === 'monitor' ? 'moveRight' : 'moveLeft'">
      <!-- router视图 -->
      <router-view></router-view>
    </transition>

    <!-- 底部的tabbar -->
    <q-tabs
      v-model="tab"
      class="bg-indigo text-white"
      switch-indicator
      indicator-color="yellow"
      dense
      @input="tabbarSwitch"
    >
      <q-tab name="index" label="主页" icon="fas fa-align-left"></q-tab>
      <q-tab name="monitor" label="监控" icon="fas fa-chart-line"></q-tab>
    </q-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import Loading from "@/components/loading.vue";
import config from "@/config/config";

@Component({
  name: "home",
  computed: {
    ...mapState({
      token: (state: any) => state.token, //没用到的token
    }),
  },
  components: {
    Loading,
  },
})
export default class Home extends Vue {
  //data
  public token: string | undefined;
  private tab: "index" | "monitor" = "index"; //tab值控制底部的样式
  public isShowLoading: boolean = false;
  public loadingText: string = "";
  private timer: null | number = null; //定时器

  //methods
  tabbarSwitch(value: string) {
    //修改tabbar的方法
    this.$router.push({ name: value });
  }

  //lifeCycle
  async created() {
    //连接socket
    // this.isShowLoading = true;
    // this.loadingText = "socket连接中";
    this.$router.push({ name: "index" });

    //初始化定时器
    const delay = config.timeGap;
    this.timer = setInterval(() => {
      this.$store.commit("setCountAvg");
    }, delay * 1000);

    //渲染假数据
    let res = [
      {
        type: 0,
        smean: 559,
        sbytes: 7541,
        ct_srv_src: 10,
        sload: 195053368,
        stcpb: 320410755,
        ct_srv_dst: 15,
        proto: 112,
        dtcpb: 2399098621,
        ackdat: 0.01693238791481,
        ct_dst_src_ltm: 25,
      },
      {
        type: 0,
        smean: 166,
        sbytes: 7990,
        ct_srv_src: 23,
        sload: 21659911,
        stcpb: 508564234,
        ct_srv_dst: 21,
        proto: 115,
        dtcpb: 2476009137,
        ackdat: 0.005121579265372264,
        ct_dst_src_ltm: 20,
      },
      {
        type: 0,
        smean: 450,
        sbytes: 2973,
        ct_srv_src: 26,
        sload: 17882121,
        stcpb: 615492566,
        ct_srv_dst: 3,
        proto: 112,
        dtcpb: 1529462406,
        ackdat: 0.4354952435368124,
        ct_dst_src_ltm: 10,
      },
    ];
    res.forEach((item, index) => {
      //遍历每个数据，按一定的间隔推送
      setTimeout(() => {
        this.$store.commit("setInfoData", item);
      }, index * 3 * 1000);
    });

    //延迟10秒
    setTimeout(async () => {
      //websocket搭建
      let res = await this.$api.getInfo(this);
      if (res) {
        this.$q.notify({
          type: "success",
          message: "状态正常",
          position: "top",
          timeout: 3000,
        });
      } else {
        this.$q.notify({
          type: "error",
          message: "状态错误",
          position: "top",
          timeout: 3000,
        });
      }
    }, 10 * 1000);
  }
  beforeDestoryed() {
    //清除定时器
    clearInterval(this.timer!);
    this.timer = null;
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .q-tabs {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .moveLeft-enter-active {
    animation-name: slideInLeft;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  .moveRight-enter-active {
    animation-name: slideInRight;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
}
@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
