<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Generated</div>
            <div class="block-body-right-desc">Project generated page</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="generates">
                    <template v-if="generates.data.length > 0">
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

                            <div class="block-body-content-table-tr" v-for="(generate, key) in generates.data" :key="key" @click="checkSelected(generate.id)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(generate.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ generate.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ generate.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ generate.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ generate.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ generate.category }}<template v-if="generate.cvss"> / {{ generate.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ generate.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ generate.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ generate.dt_add }}</div>
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
    name: "projectGenerated",
    components: {ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            generates: null,
            selected: [],
        }
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.patches) {
                this.generates.data.forEach(generate => {
                    if (!this.selected.includes(generate.id)) {
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
        this.getGenerated();
    },
    methods: {
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.generates) {
                this.selected = this.generates.data.map((generate) => {
                    return generate.id;
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
        async getGenerated() {
            if (this.portalProject) {
                this.generates = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedByIdAndStatus', {
                    id: this.portalProject.id,
                    status: 'generated'
                });
            }
        },
    }
}
</script>

<style scoped>

</style>