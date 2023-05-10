<template>
  <nav class="navbar navbar-expand-lg navbar-light nav-main">
      <modal-box v-if="user" :modal="modal" @closeModal="modal = false">
        <the-navbar-detail @closeModal="modal = false"></the-navbar-detail>
      </modal-box>
    <div class="nav bg-white d-flex align-items-center">
      <div :class="'nav-icon '+className"></div>
      <div class="nav-title">{{ title }}</div>
        <div class="nav-right">
            <navbar-search></navbar-search>
            <div class="nav-options" @click="modal = true">
                <div class="nav-options-notification">
                    <div class="nav-options-notification-icon"></div>
                </div>
                <div class="nav-options-detail">
                    <div class="nav-options-detail-title">{{ user.name }} {{ user.surname }}</div>
                    <div class="nav-options-detail-desc" v-if="user.auditor && user.auditor.user">{{ user.auditor.user }}</div>
                </div>
                <div class="nav-profile bg-primary text-white d-flex align-items-center justify-content-center" v-if="user">
                    <div>{{ getNameLetter(user) }}</div>
                </div>
                <div class="nav-options-menu">
                    <div class="nav-options-menu-item"></div>
                </div>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>
import NavbarSearch from "./navbarSearch.vue";
import ModalBox from "./modal/modalBox.vue";
import TheNavbarDetail from "./theNavbar/theNavbarDetail.vue";

export default {
  name: "theNavbar",
    components: {TheNavbarDetail, ModalBox, NavbarSearch},
    props: ['className', 'title'],
    data() {
      return {
          modal: false
      }
    },
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    sidebar() {
      return this.$store.state.localStorage.sidebar;
    },
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