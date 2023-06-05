<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectStatistics",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectStats;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Statistics</div>
      <div class="block-body-right-desc">Project Statistics</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectStats');"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>