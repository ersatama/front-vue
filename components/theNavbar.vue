<template>
  <nav class="navbar navbar-expand-lg navbar-light nav-main">
    <div class="nav bg-white d-flex align-items-center">
      <div class="nav-close rounded-lg" :class="{'nav-close-rotate':!sidebar}" @click="$store.commit('localStorage/sidebar')"></div>
      <div class="nav-title">{{ navTitle }}</div>
        <div class="nav-right">
            <navbar-search></navbar-search>
            <div class="nav-options">
                <div class="nav-options-detail">
                    <div class="nav-options-detail-title">{{ user.name }} {{ user.surname }}</div>
                    <div class="nav-options-detail-desc">{{ user.role }}</div>
                </div>
                <div class="nav-profile bg-primary text-white d-flex align-items-center justify-content-center" v-if="user">
                    <div>{{ getNameLetter(user) }}</div>
                </div>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>
import NavbarSearch from "./navbarSearch.vue";

export default {
  name: "theNavbar",
    components: {NavbarSearch},
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    sidebar() {
      return this.$store.state.localStorage.sidebar;
    },
    navTitle() {
      let title = 'Immuniweb';
      if (this.$route.name === 'profile') {
        title = 'Profile';
      } else if (this.$route.name === 'dashboard') {
        title = 'Dashboard';
      }
      return title;
    }
  },
  methods: {
    getNameLetter(user) {
      let letters = '';
      if (user.name) {
        letters += user.name[0];
      }
      if (user.surname) {
        letters += user.surname[0];
      }
      return letters;
    }
  },
}
</script>

<style lang="scss">

</style>