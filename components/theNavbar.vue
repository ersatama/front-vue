<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nav-main">
    <div class="nav bg-white d-flex align-items-center">
      <div class="nav-close rounded-lg" :class="{'nav-close-rotate':!sidebar}" @click="$store.commit('localStorage/sidebar')"></div>
      <div class="nav-title">{{ navTitle }}</div>
      <div class="nav-options d-flex align-items-center">
        <div></div>
        <div class="nav-profile bg-primary text-white d-flex align-items-center justify-content-center" v-if="user">
          <div>{{ getNameLetter(user) }}</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "theNavbar",
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
  .nav {
    width: 100%;
    gap: 25px;
    padding: 25px;
    border-radius: 10px;
    &-main {
      padding: 25px;
    }
    &-title {
      color: #212529;
      font-weight: bold;
    }
    &-profile {
      width: 36px;
      height: 36px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 30px;
    }
    &-options {
      margin-left: auto;
    }
    &-close {
      width: 30px;
      height: 30px;
      background: #F1F4F8;
      position: relative;
      cursor: pointer;
      &-rotate {
        transform: rotate(180deg);
      }
      &:hover {
        background: #e7eaee;
      }
      &:before, &:after {
        content: '';
        position: absolute;
        background: #6c757d;
        width: 4px;
        height: 13px;
        border-radius: 3px;
      }
      &:before {
        transform: rotate(45deg);
        margin: 5px 0 0 12px;
      }
      &:after {
        transform: rotate(-45deg);
        margin: 12px 0 0 12px;
      }
    }
  }
</style>