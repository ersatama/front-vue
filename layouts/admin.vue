<template>
  <div>
      <div class="bg"></div>
      <div class="d-flex justify-content-center" id="wrapper">
          <!-- Sidebar-->
          <sidebar></sidebar>
          <!-- Page content wrapper-->
          <div id="page-content-wrapper">
              <!-- Top navigation-->
              <the-navbar></the-navbar>
              <!-- Page content-->
              <div class="admin">
                  <Nuxt />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import TheNavbar from "../components/theNavbar.vue";
import Sidebar from "../components/sidebar.vue";

export default {
  name: "admin",
  components: {Sidebar, TheNavbar},
  head() {
    return {
      bodyAttrs: {
        class: 'bg-light'
      }
    }
  },
}
</script>

<style lang="scss">
@import "assets/block.scss";
@import "assets/page.scss";
@import "assets/modal.scss";
@import "assets/scrollBar.scss";
.admin {
  margin: 0 25px 25px 25px;
}
.bg {
    background: url('/images/photos/bg.png');
    width: 100%;
    height: 100vh;
    opacity: 0.025;
    position: fixed;
    z-index: -1;
}

#page-content-wrapper {
  min-width: 100vw;
    max-width: 1500px;
}

body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
  margin-left: 0;
}
@media (min-width: 768px) {

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
}

</style>