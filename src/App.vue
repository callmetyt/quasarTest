<template>
  <div id="app">
    <!-- 视图出口 -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app",
});
</script>

<style scoped lang="scss">
body {
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
