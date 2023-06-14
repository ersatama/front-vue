<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectVPNConfiguration",
  props: ['portalProject'],
  data() {
    return {
      vpn: null
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectVPNConfiguration;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getConfig();
  },
  methods: {
    async getConfig() {
      this.alerts = await this.$store.dispatch('localStorage/vpn_getConfig', {
        project_id: this.portalProject.id,
      });
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">VPN Configuration</div>
      <div class="block-body-right-desc">Project VPN Configuration</div>
      <div class="block-body-right-header-buttons">
        <button class="block-body-content-add">
          <i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Create
        </button>
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectVPNConfiguration');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table">
        <template v-if="vpn && vpn.vpn.length > 0">
          <div class="block-body-content-table-header">
            <div class="block-body-content-table-tr">
              <div class="block-body-content-table-item block-body-content-table-item-status">Host</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">Local IP</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">Remote IP</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">Type</div>
              <div class="block-body-content-table-item block-body-content-table-item-field-option"></div>
            </div>
            <div class="block-body-content-table-tr" style="background: transparent; color: rgb(125, 127, 129);" v-for="(value, key) in vpn.vpn.length" :key="key">
              <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.host }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.ip }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">{{ value.remoteip }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">Type</div>
              <div class="block-body-content-table-item block-body-content-table-item-field-option">
                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                  <div class="block-body-content-table-item-option">
                    <div class="block-body-content-table-item-option-select">
                      <div class="block-body-content-table-item-option-select-angle"></div>
                      <div class="block-body-content-table-item-option-select-list">
                        <div class="block-body-content-table-item-option-select-item">Delete</div>
                      </div>
                    </div>
                    <div class="block-body-content-table-item-option-dots"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <project-no-data v-else></project-no-data>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>