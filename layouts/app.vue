<template>
  <div>
    <theHeader></theHeader>
    <Nuxt />
    <theFooter></theFooter>
  </div>
</template>

<script>
import theHeader from "./theHeader.vue";
import TheFooter from "./theFooter.vue";
export default {
  name: "app",
  components: {TheFooter, theHeader},
}
</script>

<style lang="scss">

</style>