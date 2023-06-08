<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectPrivateData",
  props: ['portalProject'],
  data() {
    return {
      privatedata: ''
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectPrivateData;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    if (this.portalProject && this.portalProject.privatedata){
      this.privatedata  = this.portalProject.privatedata;
    }
  }
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Private Data</div>
      <div class="block-body-right-desc">Project private data</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectPrivateData');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-area">
        <div class="block-body-content-area-textarea">
          <textarea v-model="privatedata">{{ privatedata }}</textarea>
        </div>
        <div class="block-body-content-area-buttons">
          <button class="block-body-content-area-button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>