<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "projectSettings",
    props: ['portalProject'],
    computed: {
        show() {
            return this.$store.state.localStorage.projectSettings;
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
          <div class="block-body-right-title">Project settings</div>
          <div class="block-body-right-desc">Project configuration</div>
          <div class="block-body-right-header-buttons">
              <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectSettings');"></div>
          </div>
      </div>
      <div class="block-body-content" :class="{'block-body-content-close':!show}">
          <div class="block-body-content-table">
              {{portalProject}}
          </div>
      </div>
  </div>
</template>

<style>

</style>