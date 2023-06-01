<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAlertSettings",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectAlertSettings;
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
      <div class="block-body-right-title">Alert settings</div>
      <div class="block-body-right-desc">Project alerts settings</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectAlertSettings');"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>