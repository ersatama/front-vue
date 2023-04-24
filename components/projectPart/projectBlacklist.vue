<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Blacklist</div>
            <div class="block-body-right-desc">Blacklist page</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="blacklists">
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
                        <template v-if="blacklists && blacklists.data.length > 0">
                            <div class="block-body-content-table-tr" v-for="(blacklist, key) in blacklists.data" :key="key" @click="checkSelected(blacklist.id)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(blacklist.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ blacklist.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ blacklist.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ blacklist.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ blacklist.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ blacklist.category }}<template v-if="blacklist.cvss"> / {{ blacklist.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ blacklist.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ blacklist.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ blacklist.dt_add }}</div>
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
    name: "projectBlacklist",
    components: {ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            blacklists: null,
            selected: [],
        }
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.blacklists) {
                this.blacklists.data.forEach(rawReport => {
                    if (!this.selected.includes(rawReport.id)) {
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
        this.getBlacklists();
    },
    methods: {
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.blacklists) {
                this.selected = this.blacklists.data.map((unpatch) => {
                    return unpatch.id;
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
        async getBlacklists() {
            if (this.portalProject) {
                this.blacklists = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedByIdAndStatus', {
                    id: this.portalProject.id,
                    status: 'deleted'
                });
            }
        },
    }
}
</script>

<style lang="scss">

</style>