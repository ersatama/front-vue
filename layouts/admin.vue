<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar-->
    <div class="border-end bg-white" id="sidebar-wrapper" style="z-index: 2" v-if="sidebar">
      <div class="sidebar-heading d-flex justify-content-center">
        <img src="/images/logo/logo-immuniweb.svg" width="150">
      </div>
      <div class="list-group list-group-flush d-flex">
        <a class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg">
          <img src="/images/icons/profile.png" width="24" class="mr-1"> Profile
        </a>
        <a class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg">
          <img src="/images/icons/settings.png" width="24" class="mr-1"> Settings
        </a>
        <a class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg bg-light text-primary font-we">
          <img src="/images/icons/dashboard.png" width="24" class="mr-1"> Dashboard
        </a>
        <a class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg" @click="logout">
          <img src="/images/icons/log-out.png" width="24" class="mr-1"> Log out
        </a>

      </div>
    </div>
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

export default {
  name: "admin",
  components: {TheNavbar},
  head() {
    return {
      bodyAttrs: {
        class: 'bg-light'
      }
    }
  },
  methods: {
    logout() {
      this.$store.commit('localStorage/setUser', null);
      window.location.href = '/login';
    }
  },
  computed:{
    sidebar() {
      return this.$store.state.localStorage.sidebar;
    },
  }
}
</script>

<style lang="scss">
.admin {
  margin: 0 25px 25px 25px;
}
#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  margin: 25px 0 25px 25px !important;
  border-radius: 10px;
  transition: margin 0.25s ease-out;
  height: calc(100vh - 50px);
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #F1F4F8;
}

#sidebar-wrapper .list-group {
  margin: 25px;
  gap: 5px;
}
.list-group-item {
  width: 250px;
  font-size: 14px;
  padding: 10px 15px 10px 15px;
  background: transparent;
}
#page-content-wrapper {
  min-width: 100vw;
}

body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>