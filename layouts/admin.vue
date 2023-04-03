<template>
  <div class="d-flex" id="wrapper">
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
.admin {
  margin: 0 25px 25px 25px;
}

#page-content-wrapper {
  min-width: 100vw;
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