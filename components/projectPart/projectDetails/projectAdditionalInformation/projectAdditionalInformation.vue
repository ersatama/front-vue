<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "projectAdditionalInformation",
    props: ['portalProject'],
    computed: {
        show() {
            return this.$store.state.localStorage.additionalInformation;
        },
    }
})
</script>

<template>
  <div class="block-body-right">
      <div class="block-body-right-header">
          <div class="block-body-right-title">Additional Information</div>
          <div class="block-body-right-desc">Visible to Client</div>
          <div class="block-body-right-header-buttons">
              <button class="block-body-content-filter">
                  <i class="block-body-content-filter-icon block-body-content-filter-icon-edit"></i> Edit
              </button>
              <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleAdditionalInformation');"></div>
          </div>
      </div>
      <div class="block-body-content" :class="{'block-body-content-close':!show}">
          <div class="block-body-content-table">
              <div class="block-body-content-table-header" v-if="portalProject.authcomment">
                  <div class="block-body-content-table-tr">
                      <div class="block-body-content-table-item" style="color: rgb(40, 167, 69);">{{ portalProject.authcomment }}</div>
                  </div>
              </div>
              <project-no-data v-else></project-no-data>
          </div>
      </div>
  </div>
</template>

<style>

</style>