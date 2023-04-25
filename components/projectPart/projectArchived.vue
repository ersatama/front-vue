<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Archived</div>
            <div class="block-body-right-desc">Project archives page</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="archives">
                    <template v-if="archives.data.length > 0">
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

                            <div class="block-body-content-table-tr" v-for="(archive, key) in archives.data" :key="key" @click="checkSelected(archive.id)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(archive.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ archive.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ archive.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ archive.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ archive.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ archive.category }}<template v-if="archive.cvss"> / {{ archive.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ archive.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ archive.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ archive.dt_add }}</div>
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
    name: "projectArchived",
    components: {ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            archives: null,
            selected: [],
        }
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.archives) {
                this.archives.data.forEach(archive => {
                    if (!this.selected.includes(archive.id)) {
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
        this.getArchives();
    },
    methods: {
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.archives) {
                this.selected = this.archives.data.map((archive) => {
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
        async getArchives() {
            if (this.portalProject) {
                this.archives = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedByIdAndStatus', {
                    id: this.portalProject.id,
                    status: 'ignore'
                });
            }
        },
    }
}
</script>

<style lang="scss">

</style>