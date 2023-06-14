<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectAlert",
  props: ['portalProject'],
  data() {
    return {
      alerts: null
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectAlert;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getAlert();
  },
  methods: {
    async getAlert() {
      this.alerts = await this.$store.dispatch('localStorage/evenalerterEvent_getAlert', {
        project_id: this.portalProject.id,
      });
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Alerts</div>
      <div class="block-body-right-desc">Project alerts</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectAlert');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table">
        <template v-if="alerts && alerts.alerts.length > 0">
          <div class="block-body-content-table-header">
            <div class="block-body-content-table-tr">
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Type</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">ObjSubID</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Added / Updated</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Type</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Status</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Importance</div>
              <div class="block-body-content-table-item block-body-content-table-item-field-option"></div>
            </div>
          </div>
          <div class="block-body-content-table-body">
            <div class="block-body-content-table-tr" v-for="(value, key) in alerts.alerts" :key="key">
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">
                <template v-if="alerts.names && alerts.names.hasOwnProperty(value.etype)">
                  {{ alerts.names[value.etype] }}
                </template>
                <template v-else>
                  {{ value.etype }}
                </template>
              </div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ value.objsubid }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ value.dtadded_out }} / {{ value.dtedit_out }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ value.objtype }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ value.status }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ value.importance }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-field-option">
                <div class="block-body-content-table-item-option">
                  <div class="block-body-content-table-item-option-select">
                    <div class="block-body-content-table-item-option-select-angle"></div>
                    <div class="block-body-content-table-item-option-select-list">
                      <template v-if="value.status === 'ACTIVE'">
                        <div class="block-body-content-table-item-option-select-item">Ignore</div>
                      </template>
                      <template v-if="value.status === 'ACTIVE' || value.status === 'IGNOR'">
                        <div class="block-body-content-table-item-option-select-item">Mars as Resolved</div>
                      </template>
                      <template v-if="value.status === 'DONEIGNOR' || value.status === 'IGNOR'">
                        <div class="block-body-content-table-item-option-select-item">Remove Ignore</div>
                      </template>
                    </div>
                  </div>
                  <div class="block-body-content-table-item-option-dots"></div>
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