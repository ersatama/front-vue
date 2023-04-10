<template>
  <div class="border-end bg-white" id="sidebar-wrapper" style="z-index: 2" v-if="sidebar">
    <div class="sidebar-heading d-flex justify-content-center">
      <img src="/images/logo/logo-immuniweb.svg" width="150">
    </div>
    <div class="list-group list-group-flush d-flex">
      <NuxtLink to="/profile" class="list-group-item" :class="{'list-group-item-active':($route.name === 'profile')}">
        <img src="/images/icons/profile.png" width="24" height="24"> Profile <div class="block-body-left-item-icon-arr"></div>
      </NuxtLink>
      <NuxtLink to="/dashboard" class="list-group-item" :class="{'list-group-item-active':($route.name === 'dashboard')}">
        <img src="/images/icons/dashboard.png" width="24" height="24"> Dashboard <div class="block-body-left-item-icon-arr"></div>
      </NuxtLink>
      <a class="list-group-item" @click="logout">
        <img src="/images/icons/log-out.png" width="24" height="24"> Log out <div class="block-body-left-item-icon-arr"></div>
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

<style lang="scss">
#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  margin: 25px 0 25px 25px !important;
  border-radius: 10px;
  transition: margin 0.25s ease-out;
  height: max-content;
  min-width: 300px;
  font-weight: bold;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #F1F4F8;
}

#sidebar-wrapper .list-group {

}
.list-group-item {
  width: 100%;
  font-size: 14px;
  padding: 15px 15px 15px 25px;
  border-bottom: 1px solid #F1F4F8;
  display: flex;
  gap: 10px;
  background: transparent !important;
  color: #6c757d !important;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  &:hover, &-active {
    color: #0b76a6 !important;
    & > .block-body-left-item-icon-arr {

      &:before, &:after {
        background: #0b76a6;
      }
    }
  }
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