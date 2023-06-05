<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAlert",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectAlert;
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
      <div class="block-body-right-title">Alerts</div>
      <div class="block-body-right-desc">Project alerts</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectAlert');"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>