<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Patched</div>
            <div class="block-body-right-desc">Project patched page</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="patches">
                    <template v-if="patches.data.length > 0">
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkAll()" onselectstart="return false"></div>
                                </div>
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

                            <div class="block-body-content-table-tr" v-for="(patch, key) in patches.data" :key="key" @click="checkSelected(patch.id)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(patch.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ patch.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ patch.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ patch.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ patch.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ patch.category }}<template v-if="patch.cvss"> / {{ patch.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ patch.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ patch.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ patch.dt_add }}</div>
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
    name: "projectPatched",
    components: {ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            patches: null,
            selected: [],
        }
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.patches) {
                this.patches.data.forEach(patch => {
                    if (!this.selected.includes(patch.id)) {
                        status = false;
                    }
                });
            }
            if (this.selected.length === 0) {
                status  =   false;
            }
            return status;
        }
    },
    created() {
        this.getPatched();
    },
    methods: {
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.patches) {
                this.selected = this.patches.data.map((archive) => {
                    return archive.id;
                });
            }
        },
        checkSelected(id) {
            if (this.selected.includes(id)) {
                let index = this.selected.indexOf(id);
                if (index !== -1) {
                    this.selected.splice(index, 1);
                }
            } else {
                this.selected.push(id);
            }
        },
        async getPatched() {
            if (this.portalProject) {
                this.patches = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedByIdAndStatus', {
                    id: this.portalProject.id,
                    status: 'fixed'
                });
            }
        },
    }
}
</script>

<style lang="scss">

</style>