<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectApplicationEvaluation",
  props: ['portalProject'],
  computed: {
    show() {
      return this.$store.state.localStorage.projectApplicationEvaluation;
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
      <div class="block-body-right-title">Application evaluation</div>
      <div class="block-body-right-desc">Project application evaluation</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectApplicationEvaluation');"></div>
      </div>
    </div>
  </div>
</template>

<style>

</style>