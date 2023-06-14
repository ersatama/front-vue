<template>
    <div class="block">
        <div class="block-title" :class="{'block-title-dark':mode}">Neuron</div>
    </div>
</template>

<script>
export default {
    name: "index",
    layout: 'admin',
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
  }
}
</script>

<style lang="scss">

</style>