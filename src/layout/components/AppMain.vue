<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view class="app-main-container" :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px - #{$TopHeadHeight});
  width: 100%;
  position: relative;
  overflow: hidden;

  .app-main-container {
    position: absolute;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
