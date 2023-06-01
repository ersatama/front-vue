<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectSCA",
  props: ['portalProject'],
  data() {
    return {
      active: false,
      data: null,
      actualSoftware: null,
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectSCA;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getSettings();
    this.getActualSoftware();
  },
  methods: {
    async getSettings() {
      if (this.portalProject) {
        let softReport = await this.$store.dispatch('localStorage/portalProject_getSoftReport', {
          id: this.portalProject.id,
          jit: this.portalProject.jit,
          mobile: this.portalProject.mobile,
          user: this.user.auditor.user,
          auditor_id: this.user.auditor.id,
          active: false
        });
        if (softReport) {
          this.data = softReport;
        }
      }
    },
    async getActualSoftware() {
      let actualSoftware = await this.$store.dispatch('localStorage/portalProject_getActualSoftware', {
        id: this.portalProject.id,
        active: false
      });
      if (actualSoftware) {
        this.actualSoftware = actualSoftware;
      }
    }
  }
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">SCA</div>
      <div class="block-body-right-desc">Project SCA</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-button-checkbox" :class="{'block-body-right-header-button-checkbox-active':active}" @click="active = !active">
          <div class="block-body-right-header-button-checkbox-icon"></div>
          Show inactive elements
        </div>
        <button class="block-body-content-add">
          <i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Add new soft
        </button>
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectSCA');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table" v-if="actualSoftware && actualSoftware.software">
        <div class="block-body-content-table-header">
          <div class="block-body-content-table-tr">
            <div class="block-body-content-table-item block-body-content-table-item-status">Name</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">CurrVer</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">Latest</div>
            <div class="block-body-content-table-item block-body-content-table-item-status">Type</div>
            <div class="block-body-content-table-item block-body-content-table-item-field-option"></div>
          </div>
        </div>
        <div class="block-body-content-table-body">
          <template v-for="(soft, key, mkey) in actualSoftware.software">
            <div class="block-body-content-table-tr" :key="mkey">
              <div class="block-body-content-table-item" style="color: #0b76a6; font-weight: 600;">{{ key }}</div>
            </div>
            <div class="block-body-content-table-tr" v-for="(item, itemKey) in soft" :key="itemKey">
              <div class="block-body-content-table-item block-body-content-table-item-status">{{ itemKey }}</div>
              <div class="block-body-content-table-item block-body-content-table-item-status">
                <template v-for="(v,k, ind) in Object.entries(item)">
                  <div :key="ind">{{v[0]}}</div>
                </template>
              </div>
              <div class="block-body-content-table-item block-body-content-table-item-status" style="flex-direction: column; align-items: start; gap: 5px;">
                <template v-for="(v,k, ind) in Object.entries(item)">
                  <template v-for="(v1,k1) in v[1]">
                    <template v-if="!active">
                      <div v-for="(v2,k2) in v1" :key="k2" v-if="v2.active === 1">{{ v2.last }}</div>
                    </template>
                    <template v-else>
                      <div v-for="(v2,k2) in v1" :key="k2">{{ v2.last }}</div>
                    </template>
                  </template>
                </template>
              </div>
              <div class="block-body-content-table-item block-body-content-table-item-status" style="flex-direction: column; align-items: start; gap: 5px;">
                <template v-for="(v,k, ind) in Object.entries(item)">
                  <template v-for="(v1,k1) in v[1]">
                    <template v-if="!active">
                      <div v-for="(v2,k2) in v1" :key="k2" v-if="v2.active === 1">{{ v2.type }}</div>
                    </template>
                    <template v-else>
                      <div v-for="(v2,k2) in v1" :key="k2">{{ v2.type }}</div>
                    </template>
                  </template>
                </template>
              </div>
              <div class="block-body-content-table-item block-body-content-table-item-field-option">
                <div class="block-body-content-table-item-option">
                  <div class="block-body-content-table-item-option-select">
                    <div class="block-body-content-table-item-option-select-angle"></div>
                    <div class="block-body-content-table-item-option-select-list">
                      <div class="block-body-content-table-item-option-select-item">Edit soft</div>
                      <div class="block-body-content-table-item-option-select-item">Make inactive</div>
                      <div class="block-body-content-table-item-option-select-item">Delete element</div>
                      <div class="block-body-content-table-item-option-select-item">Jitreport not exists</div>
                    </div>
                  </div>
                  <div class="block-body-content-table-item-option-dots"></div>
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>