<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectApplicationEvaluation",
  props: ['portalProject'],
  data() {
    return {
      applicationEvaluation: null,
      recommendedSteps: '',
      testExclusions: '',
      scopeStat:  []
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectApplicationEvaluation;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getApplicationEvaluation();
  },
  methods: {
    async getApplicationEvaluation() {
      if (this.portalProject) {
        let applicationEvaluation  = await this.$store.dispatch('localStorage/portalProp_getApplicationEvaluation', {
          project_id: this.portalProject.id,
          user: this.user.auditor.user,
        });
        this.recommendedSteps = applicationEvaluation.app_recommended_steps;
        this.testExclusions   = applicationEvaluation.app_test_exclusions;
        this.scopeStat        = applicationEvaluation.reportScopestat;
      }
    },
    autofill() {
      this.recommendedSteps = '<ul>\n' +
          '<li><p>Address the reported medium risk vulnerabilities as a first priority.</p></li>\n' +
          '<li><p>Address the reported security warnings.</p></li>\n' +
          '<li><p>Run free patch verification to ensure that all of the detected security issues are properly fixed.</p></li>\n' +
          '<li><p>Perform another penetration test after the next major update of your web application.</p></li>\n' +
          '</ul>';
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Application evaluation</div>
      <div class="block-body-right-desc">Project application evaluation</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectApplicationEvaluation');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">
          Recommended further steps
          <div class="block-body-content-area-title-btn" @click="autofill">Autofill</div>
        </div>
        <div class="block-body-content-area-textarea">
          <textarea v-model="recommendedSteps">{{ recommendedSteps }}</textarea>
        </div>
        <div class="block-body-content-area-buttons">
          <button class="block-body-content-area-button">Save</button>
        </div>
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">Exclusions</div>
        <div class="block-body-content-area-textarea">
          <textarea v-model="testExclusions">{{ testExclusions }}</textarea>
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