<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Unpatched</div>
            <div class="block-body-right-desc">Project details</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table block-body-content-table-bottom">
                <template v-if="unpatched">
                    <div class="block-body-content-table-header">
                        <div class="block-body-content-table-tr">
                            <div class="block-body-content-table-item block-body-content-table-item-id">ID</div>
                            <div class="block-body-content-table-item block-body-content-table-item-comment">Title</div>
                            <div class="block-body-content-table-item block-body-content-table-item-status">CWE-ID</div>
                            <div class="block-body-content-table-item block-body-content-table-item-status">ASVS</div>
                            <div class="block-body-content-table-item block-body-content-table-item-text">CVSS</div>
                            <div class="block-body-content-table-item block-body-content-table-item-status">Parameters</div>
                            <div class="block-body-content-table-item block-body-content-table-item-status">Created by</div>
                            <div class="block-body-content-table-item block-body-content-table-item-date">Added on</div>
                            <div class="block-body-content-table-item block-body-content-table-item-status">Modified by</div>
                            <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-body-content-table-body">
                        <template v-if="unpatched && unpatched.length > 0">
                            <div class="block-body-content-table-tr" v-for="(unpatch, key) in unpatched.data" :key="key">
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ unpatch.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ unpatch.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ unpatch.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ unpatch.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ unpatch.category }}<template v-if="unpatch.cvss"> / {{ unpatch.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ unpatch.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ unpatch.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ unpatch.dt_add }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status"></div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-option">
                                        <div class="block-body-content-table-item-option-select">
                                            <div class="block-body-content-table-item-option-select-angle"></div>
                                            <div class="block-body-content-table-item-option-select-list">
                                                <div class="block-body-content-table-item-option-select-item">Edit</div>
                                                <div class="block-body-content-table-item-option-select-item">Delete</div>
                                                <div class="block-body-content-table-item-option-select-item">Log</div>
                                                <div class="block-body-content-table-item-option-select-item">Source raw reports</div>
                                            </div>
                                        </div>
                                        <div class="block-body-content-table-item-option-dots"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="block-body-content-table-body-empty" v-else>No data</div>
                    </div>
                </template>
                <project-part-loading v-else></project-part-loading>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectPartLoading from "../modal/projectPartLoading.vue";
export default {
  name: "projectUnpatched",
    components: {ProjectPartLoading},
  props: ['portalProject'],
  data() {
    return {
      unpatched: null
    }
  },
  created() {
    this.getUnpatched();
  },
  methods: {
    async getUnpatched() {
      if (this.portalProject) {
        this.unpatched = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedById', this.portalProject.id);
      }
    },
  }
}
</script>

<style scoped>

</style>