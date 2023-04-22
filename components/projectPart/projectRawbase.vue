<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">All rawbase</div>
            <div class="block-body-right-desc">Project tasks</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <modal-box :modal="tableSettingsModal" @closeModal="tableSettingsModal = false">
                    <rawbase-filter @setFilter="setFilter" @closeModal="tableSettingsModal = false"></rawbase-filter>
                </modal-box>
                <template v-if="rawbases">
                    <div class="block-body-content-table-header">
                        <div class="block-body-content-table-tr" onselectstart="return false">
                            <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkRawbaseAll()"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-id" @click="setOrderBy('id')">
                                ID <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'id'), 'block-body-content-table-item-down-up':(orderBy === 'id' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-text" @click="setOrderBy('display_name')">
                                Title <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'display_name'), 'block-body-content-table-item-down-up':(orderBy === 'display_name' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-url" @click="setOrderBy('active_path')">
                                URL <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'active_path'), 'block-body-content-table-item-down-up':(orderBy === 'active_path' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-service" @click="setOrderBy('display_params')">
                                Params <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'display_params'), 'block-body-content-table-item-down-up':(orderBy === 'display_params' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-date" @click="setOrderBy('dt')">
                                Added <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'dt'), 'block-body-content-table-item-down-up':(orderBy === 'dt' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('rawbase_type')">
                                Type <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'rawbase_type'), 'block-body-content-table-item-down-up':(orderBy === 'rawbase_type' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-rawbase" @click="setOrderBy('service')">
                                Scanner <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'service'), 'block-body-content-table-item-down-up':(orderBy === 'service' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('status')">
                                Status <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'status'), 'block-body-content-table-item-down-up':(orderBy === 'status' && orderByType === 'desc')}"></div>
                            </div>
                            <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                <div class="block-body-content-table-item-configure" @click="tableSettingsModal = true"></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-body-content-table-body">
                        <template v-if="rawbases && rawbases.length > 0">
                            <div class="block-body-content-table-tr" v-for="(rawbase, key) in rawbases" :key="key" @click="checkRawbase(rawbase.id)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(rawbase.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ rawbase.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ rawbase.display_name }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-url">{{ rawbase.active_path.replace('%', '') }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-service">{{ rawbase.display_params }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ rawbase.dt }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ rawbase.rawbase_type }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-rawbase">{{ rawbase.service }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ rawbase.status }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-option">
                                        <div class="block-body-content-table-item-option-select">
                                            <div class="block-body-content-table-item-option-select-angle"></div>
                                            <div class="block-body-content-table-item-option-select-list">
                                                <div class="block-body-content-table-item-option-select-item">Edit</div>
                                                <div class="block-body-content-table-item-option-select-item">Log</div>
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
import ModalBox from "../modal/modalBox.vue";
import RawbaseFilter from "../modal/rawbaseFilter.vue";
import RawReportFilter from "../modal/rawReportFilter.vue";
import ProjectPartLoading from "../modal/projectPartLoading.vue";

export default {
    name: "projectRawbase",
    components: {ProjectPartLoading, RawReportFilter, RawbaseFilter, ModalBox},
    props: ['portalProject'],
    data() {
        return {
            rawbases: null,
            selected: [],
            orderBy: 'id',
            orderByType: 'asc',
            tableSettingsModal: false,
            filter: {
                status: "ALL",
                type: "ALL",
                search: ''
            }
        }
    },
    watch: {

    },
    created() {
        this.getRawbase();
    },
    computed: {
        isAllSelected() {
            let status = true;
            this.rawbases.forEach(rawbase => {
                if (!this.selected.includes(rawbase.id)) {
                    status = false;
                }
            });
            if (this.selected.length === 0) {
                status  =   false;
            }
            return status;
        }
    },
    methods: {
        setOrderBy(orderBy) {
            if (orderBy === this.orderBy) {

                if (this.orderByType === 'asc') {
                    this.orderByType    =   'desc';
                } else {
                    this.orderByType    =   'asc';
                }
            } else {
                this.orderBy        =   orderBy;
                this.orderByType    =   'asc';
            }
            this.getRawbase();
        },
        setFilter(filter) {
            this.filter = filter;
            this.getRawbase();
        },
        checkRawbaseAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else {
                this.selected = this.rawbases.map((rawbase) => {
                    return rawbase.id;
                });
            }
        },
        checkRawbase(id) {
            if (this.selected.includes(id)) {
                let index = this.selected.indexOf(id);
                if (index !== -1) {
                    this.selected.splice(index, 1);
                }
            } else {
                this.selected.push(id);
            }
        },
        async getRawbase() {
            if (this.portalProject) {
                let data    =   {
                    id: this.portalProject.id,
                    type: this.filter.type,
                    orderBy: this.orderBy,
                    orderByType: this.orderByType
                };
                if (this.filter.status && this.filter.status !== 'ALL') {
                    data.status =   this.filter.status;
                }
                let rawbases = await this.$store.dispatch('localStorage/portalProjectType_getRawbaseById', data);
                this.rawbases = rawbases.data;
            }
        }
    }
}
</script>

<style lang="scss">

</style>