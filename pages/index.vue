<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage',
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        }
    },
    beforeCreate() {
      if (this.user) {
          window.location.href = '/dashboard';
      } else {
          window.location.href = '/login';
      }
    }
}
</script>
