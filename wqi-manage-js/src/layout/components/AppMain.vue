<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <!-- <div class="text-center footer-main">Smart Device &copy; All rights reserved.</div> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
.footer-main {
  border-top: 1px solid rgba(0, 21, 41, 0.15);
  padding: 0.5rem 0;
  font-weight: 700;
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
