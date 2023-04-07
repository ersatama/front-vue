<template>
  <div class="border-end bg-white" id="sidebar-wrapper" style="z-index: 2" v-if="sidebar">
    <div class="sidebar-heading d-flex justify-content-center">
      <img src="/images/logo/logo-immuniweb.svg" width="150">
    </div>
    <div class="list-group list-group-flush d-flex">
      <NuxtLink to="/profile" class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg" :class="{'bg-light':($route.name === 'profile'),'text-primary':($route.name === 'profile')}">
        <img src="/images/icons/profile.png" width="24" class="mr-1"> Profile
      </NuxtLink>
      <NuxtLink to="/dashboard" class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg" :class="{'bg-light':($route.name === 'dashboard'),'text-primary':($route.name === 'dashboard')}">
        <img src="/images/icons/dashboard.png" width="24" class="mr-1"> Dashboard
      </NuxtLink>
      <a class="list-group-item list-group-item-action list-group-item-light border-0 rounded-lg" @click="logout">
        <img src="/images/icons/log-out.png" width="24" class="mr-1"> Log out
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  computed:{
    sidebar() {
      return this.$store.state.localStorage.sidebar;
    },
  },
  methods: {
    logout() {
      this.$store.commit('localStorage/setUser', null);
      window.location.href = '/login';
    }
  },
}
</script>

<style>
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