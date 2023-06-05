<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectDDOSSustainability",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectDDOSSustainability;
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
      <div class="block-body-right-title">DDoS Sustainability</div>
      <div class="block-body-right-desc">Project DDoS Sustainability</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectDDOSSustainability');"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>