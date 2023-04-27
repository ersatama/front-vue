<template>
  <div>
      <div class="border-end bg-white" id="sidebar-wrapper" style="z-index: 2" v-if="sidebar">
          <div class="sidebar-heading d-flex justify-content-center">
              <img src="/images/logo/logo-immuniweb.svg" width="150">
          </div>
          <div class="list-group list-group-flush d-flex">
              <NuxtLink to="/dashboard" class="list-group-item" :class="{'list-group-item-active':(name === 'dashboard')}">
                  <img src="/images/icons/dashboard.png" width="24" height="24"> Projects <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <NuxtLink to="/tickets" class="list-group-item" :class="{'list-group-item-active':(name === 'tickets')}">
                  <img src="/images/icons/receipt.png" width="24" height="24"> Tickets <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <NuxtLink to="/content" class="list-group-item" :class="{'list-group-item-active':(name === 'content')}">
                  <img src="/images/icons/copy-writing.png" width="24" height="24"> Content editor <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <NuxtLink to="/system" class="list-group-item" :class="{'list-group-item-active':(name === 'system')}">
                  <img src="/images/icons/management.png" width="24" height="24"> System <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <NuxtLink to="/neuron" class="list-group-item" :class="{'list-group-item-active':(name === 'neuron')}">
                  <img src="/images/icons/neuron.png" width="24" height="24"> Neuron <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <NuxtLink to="/discovery" class="list-group-item" :class="{'list-group-item-active':(name === 'discovery')}">
                  <img src="/images/icons/discover.png" width="24" height="24"> Discovery <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
          </div>
      </div>
      <div class="border-end bg-white" id="sidebar-wrapper" style="z-index: 2" v-if="sidebar">
          <div class="list-group list-group-flush d-flex">
              <NuxtLink to="/profile" class="list-group-item" :class="{'list-group-item-active':(name === 'profile')}">
                  <img src="/images/icons/profile.png" width="24" height="24"> Profile <div class="block-body-left-item-icon-arr"></div>
              </NuxtLink>
              <a class="list-group-item" @click="logout">
                  <img src="/images/icons/log-out.png" width="24" height="24"> Log out <div class="block-body-left-item-icon-arr"></div>
              </a>
          </div>
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
      name() {
          let route = '';
          let path  = this.$route.path;
          let split = path.split('/');
          if (split.length > 1) {
            route = split[1]
          }
          return route;
      }
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
  overflow: hidden;
}

#sidebar-wrapper {
  margin: 25px 0 25px 25px !important;
  border-radius: 10px;
  transition: margin 0.25s ease-out;
  height: max-content;
  min-width: 280px;
  font-weight: 600;
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
  font-size: 12px;
  padding: 12px 15px 12px 25px;
  border-bottom: 1px solid #F1F4F8;
  display: flex;
  gap: 10px;
  background: transparent !important;
  color: #6c757d !important;
  align-items: center;
    & > img {
        transform: scale(.9);
    }
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