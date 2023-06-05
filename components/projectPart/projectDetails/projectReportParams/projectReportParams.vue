<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectReportParams",
  props: ['portalProject'],
  data() {
    return {
      reportParams: null,
      scope_checked: false,
      projectstat_checked: false,
      ssl_checked: 0,
      websec_checked: 0,
      radar_checked: 0,
      donotcheckru_checked: false,
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectReportParams;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getReportParams();
  },
  methods: {
    async getReportParams() {
      if (this.portalProject) {
        let reportParams = await this.$store.dispatch('localStorage/portalProp_getReportParams', {
          project_id: this.portalProject.id,
          user: this.user.auditor.user,
        });
        this.scope_checked  = Boolean(reportParams.scope_checked);
        this.projectstat_checked  = Boolean(reportParams.projectstat_checked);
        this.ssl_checked  = reportParams.ssl_checked;
        this.websec_checked = reportParams.websec_checked;
        this.radar_checked  = reportParams.radar_checked;
        this.donotcheckru_checked = Boolean(reportParams.donotcheckru_checked);
      }
    },
  }
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Report params</div>
      <div class="block-body-right-desc">Project report params</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectReportParams');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-checkbox" @click="scope_checked = !scope_checked">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':scope_checked}"></div>
        Do not add "Scope of ImmuniWeb® Assessment" page
      </div>
      <div class="block-body-content-checkbox" @click="projectstat_checked = !projectstat_checked">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':projectstat_checked}"></div>
        Do not add "Scope of Testing" page
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">SSL Test in Report</div>
        <div class="block-body-content-area-textarea">
          <select v-model="ssl_checked">
            <option value="0">Normal</option>
            <option value="1">Do not add SSL Test page to report</option>
            <option value="2">Website Banned SSL Test Free Service</option>
          </select>
        </div>
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">WEBSEC Test in Report</div>
        <div class="block-body-content-area-textarea">
          <select v-model="websec_checked">
            <option value="0">Normal</option>
            <option value="1">Do not add WEBSEC Test page to report</option>
            <option value="2">Website Banned WEBSEC Test Free Service</option>
          </select>
        </div>
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-title">RADAR Test in Report</div>
        <div class="block-body-content-area-textarea">
          <select v-model="radar_checked">
            <option value="0">Normal</option>
            <option value="1">Do not add RADAR Test page to report</option>
            <option value="2">Website Banned RADAR Test Free Service</option>
          </select>
        </div>
      </div>
      <div class="block-body-content-checkbox" @click="donotcheckru_checked = !donotcheckru_checked">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':donotcheckru_checked}" ></div>
        Do not check for russian symbols on reports
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