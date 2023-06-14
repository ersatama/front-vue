<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAlertSettings",
  props: ['portalProject'],
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
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
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Alert settings</div>
      <div class="block-body-right-desc">Project alerts settings</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectAlertSettings');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-title">Alert Settings</div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Ignore Delivery Time Alert
      </div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Don't send SMS Alerts about incorrect jobs
      </div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Don't send SMS Alerts about need auth
      </div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Don't send SMS Alerts about missing job with auth scripts
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-buttons">
          <button class="block-body-content-area-button">Save</button>
        </div>
      </div>
      <div class="block-body-content-title">Monitor alerts settings</div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">Alternative Monitor URLs</div>
        <div class="block-body-content-area-textarea">
          <textarea></textarea>
        </div>
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">Need String</div>
        <div class="block-body-content-area-textarea">
          <textarea></textarea>
        </div>
      </div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Disable Alerts
      </div>
      <div class="block-body-content-checkbox">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':false}"></div>
        Disable Tracking
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-buttons">
          <button class="block-body-content-area-button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>