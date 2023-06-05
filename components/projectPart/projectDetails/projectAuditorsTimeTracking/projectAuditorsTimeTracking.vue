<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAuditorsTimeTracking",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectAuditorsTimeTracking;
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
      <div class="block-body-right-title">Auditors Time Tracking</div>
      <div class="block-body-right-desc">Project Auditors Time Tracking</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectAuditorsTimeTracking');"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>