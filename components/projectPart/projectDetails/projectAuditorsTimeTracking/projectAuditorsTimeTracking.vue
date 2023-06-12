<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAuditorsTimeTracking",
  props: ['portalProject'],
  data() {
    return {
      data: null
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectAuditorsTimeTracking;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getTimetracking();
  },
  methods: {
    async getTimetracking() {
      this.data = await this.$store.dispatch('localStorage/portalProp_getAuditorTimetracking', {
        project_id: this.portalProject.id,
      });
    }
  }
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
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table">
        <div class="block-body-content-table-header">
          <div class="block-body-content-table-tr">
            <div class="block-body-content-table-item block-body-content-table-item-status">1 day</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">7 days</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">2 week</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">1 month</div>
          </div>
        </div>
        <div class="block-body-content-table-body" v-if="data">
          {{ data }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>