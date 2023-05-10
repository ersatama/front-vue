<template>
  <div>
      <div class="bg"></div>
      <div class="d-flex justify-content-center" id="wrapper">
          <!-- Sidebar-->
          <sidebar></sidebar>
          <!-- Page content wrapper-->
          <div id="page-content-wrapper">
              <!-- Top navigation-->
              <the-navbar :className="className" :title="title"></the-navbar>
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
    computed: {
      route() {
          let name = '';
          let route = this.$route.path.split('/');
          if (route[1]) {
              name = route[1];
          }
          return name;
      },
      className() {
          let className =   '';
          if (this.route === 'profile') {
              className = '';
          } else if (this.route === 'dashboard') {
              className = 'sidebar-menu-item-projects';
          } else if (this.route === 'tickets') {
              className = 'sidebar-menu-item-tickets';
          } else if (this.route === 'content') {
              className = 'sidebar-menu-item-editor';
          } else if (this.route === 'system') {
              className = 'sidebar-menu-item-system';
          } else if (this.route === 'neuron') {
              className = 'sidebar-menu-item-neuron';
          } else if (this.route === 'discovery') {
              className = 'sidebar-menu-item-discovery';
          }
          return className;
      },
        title() {
            let title =   '';
            if (this.route === 'profile') {
                title = 'Profile';
            } else if (this.route === 'dashboard') {
                title = 'Dashboard';
            } else if (this.route === 'tickets') {
                title = 'Support tickets';
            } else if (this.route === 'content') {
                title = 'Content editor';
            } else if (this.route === 'system') {
                title = 'System configuration';
            } else if (this.route === 'neuron') {
                title = 'Neuron';
            } else if (this.route === 'discovery') {
                title = 'Discovery';
            }
            return title;
        }
    }
}
</script>

<style lang="scss">
@import "assets/block.scss";
@import "assets/page.scss";
@import "assets/modal.scss";
@import "assets/scrollBar.scss";
@import "assets/filter.scss";
@import "assets/item.scss";
@import "assets/navbar.scss";
@import "assets/sidebar.scss";
.admin {
  margin: 0 20px 20px 20px;
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