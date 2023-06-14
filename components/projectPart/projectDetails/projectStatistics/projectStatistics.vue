<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectStatistics",
  props: ['portalProject'],
  data() {
    return {
      data: null
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectStats;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getProjectStat();
  },
  methods: {
    async getProjectStat() {
      this.data = await this.$store.dispatch('localStorage/scanStat_getProjectStat', {
        project_id: this.portalProject.id,
      });
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Statistics</div>
      <div class="block-body-right-desc">Project Statistics</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectStats');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table">
        <div class="block-body-content-table-header" v-if="data">
          <div class="block-body-content-table-tr">
            <div class="block-body-content-table-item block-body-content-table-item-status">Period</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">HTTP Requests</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">Bytes sent</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">Bytes received</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">Scanner Notifications</div>
          </div>
          <div class="block-body-content-table-tr" v-for="(value,key) in data" :key="key">
            <div class="block-body-content-table-item block-body-content-table-item-status">{{ key }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.RequestCnt }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.Upload }} bytes</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.Download }} bytes</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.EventCnt }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>