<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Soft vuln monitor</div>
            <div class="block-body-right-desc">Project soft vuln monitor</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-vuln">
                    <i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Add new vuln soft
                </button>
            </div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="softVulns">
                    <template v-if="softVulns.length > 0">
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-60">ID</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Vendor</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-60">Software</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short">Version</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext">Link</div>
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-50">Alert</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext">Details</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-100">Comment</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">Projects</div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">
                            <div class="block-body-content-table-tr" v-for="(softVuln,key) in softVulns" :key="key">
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-60">{{ softVuln.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ softVuln.vendor }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-60">{{ softVuln.software }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short">{{ softVuln.version }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext block-body-content-table-item-cuttext-dotted">
                                    <span v-if="softVuln.link && softVuln.link.trim() !== ''">{{ softVuln.link }}</span>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-50">{{ softVuln.alert }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext block-body-content-table-item-cuttext-dotted">
                                    <span v-if="softVuln.vuln && softVuln.vuln.trim() !== ''">{{ softVuln.vuln }}</span>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-100">{{ softVuln.comment }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" style="color: rgb(11, 118, 166); font-weight: 600;">
                                    <template v-if="softVuln.projsoft && softVuln.projsoft.length > 0">
                                        {{ softVuln.projsoft.length }}
                                        <template v-if="softVuln.projsoft.length > 1">projects</template><template v-else>project</template>
                                    </template>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-option">
                                        <div class="block-body-content-table-item-option-select">
                                            <div class="block-body-content-table-item-option-select-angle"></div>
                                            <div class="block-body-content-table-item-option-select-list">
                                                <div class="block-body-content-table-item-option-select-item">Edit</div>
                                                <div class="block-body-content-table-item-option-select-item">Delete</div>
                                            </div>
                                        </div>
                                        <div class="block-body-content-table-item-option-dots"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <project-no-data v-else></project-no-data>
                </template>
                <project-part-loading v-else></project-part-loading>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectPartLoading from "../modal/projectPartLoading.vue";
import ProjectNoData from "./projectNoData.vue";

export default {
    name: "projectSoftVulnMonitor",
    components: {ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            softVulns: null
        }
    },
    created() {
        this.getSoftVulns();
    },
    methods: {
        async getSoftVulns() {
            if (this.portalProject) {
                let softVulns = await this.$store.dispatch('localStorage/projsoft_getSoftVulnByProjectId', this.portalProject.id);
                if (softVulns.data) {
                    this.softVulns  =  softVulns.data;
                }
            }
        }
    }
}
</script>

<style lang="scss">

</style>