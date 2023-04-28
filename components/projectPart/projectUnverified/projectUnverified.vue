<template>
    <div class="block-body-right" >
        <modal-box v-if="portalProject" :modal="filterModal" @closeModal="filterModal = false">
            <unverified-filter :project="portalProject" @setFilter="setFilter" @closeModal="filterModal = false"></unverified-filter>
        </modal-box>
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-unverified-detail :data="data" v-if="data" @closeModal="showDetail = false"></project-unverified-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Unverified</div>
            <div class="block-body-right-desc">Project unverified page</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-filter" @click="filterModal = true"><i class="block-body-content-filter-icon"></i> Filter</button>
            </div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="unverified">
                    <template v-if="unverified.length > 0">
                        <unverified-detail :size="unverifiedSize" @setTake="setTake" :take="take" :page="page"></unverified-detail>
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr" onselectstart="return false">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkAll()"></div>
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
                                    <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">

                            <div class="block-body-content-table-tr" v-for="(item, key) in unverified" :key="key" @click.stop="showDetailInfo(item)" @mousedown.stop>
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox" @click.stop="check(item.id)">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(item.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ item.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ item.display_name }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-url">{{ item.active_path.replace('%', '') }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-service">{{ item.display_param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ item.dt }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.rawbase_type }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-rawbase">{{ item.service }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.status }}</div>
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
                        </div>
                        <unverified-detail :size="unverifiedSize" @setTake="setTake" :take="take" :page="page"></unverified-detail>
                    </template>
                    <project-no-data v-else></project-no-data>
                </template>
                <project-part-loading v-else></project-part-loading>
            </div>
        </div>
    </div>
</template>

<script>
import ModalBox from "../../modal/modalBox.vue";
import UnverifiedFilter from "../../modal/unverifiedFilter.vue";
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import RawReportDetail from "../rawReportDetail.vue";
import UnverifiedDetail from "./unverifiedPagination.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectUnverifiedDetail from "./projectUnverifiedDetail.vue";
import ProjectSoftVulnDetail from "../projectSoftVuln/projectSoftVulnDetail.vue";

export default {
    name: "projectUnverified",
    components: {
        ProjectSoftVulnDetail,
        ProjectUnverifiedDetail,
        ModalDetail,
        UnverifiedDetail, RawReportDetail, ProjectNoData, ProjectPartLoading, UnverifiedFilter, ModalBox},
    props: ['portalProject', 'links'],
    data() {
        return {
            selected: [],
            orderBy: 'id',
            orderByType: 'asc',
            unverified: null,
            unverifiedSize: 0,
            take: 20,
            page: 1,
            showDetail: false,
            filterModal: false,
            data: null,
            filter: {
                type: "ALL",
                status: "NEW",
                search: ''
            },
        }
    },
    watch: {
        filter() {
            this.page = 1;
            this.getUnverified();
        },
    },
    created() {
        this.getUnverified();
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.unverified) {
                this.unverified.forEach(item => {
                    if (!this.selected.includes(item.id)) {
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
    methods: {
        showDetailInfo(data) {
            this.data       =   data;
            this.showDetail =   true;
        },
        check(id) {
            if (this.selected.includes(id)) {
                let index = this.selected.indexOf(id);
                if (index !== -1) {
                    this.selected.splice(index, 1);
                }
            } else {
                this.selected.push(id);
            }
        },
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.unverified) {
                this.selected = this.unverified.map((rawbase) => {
                    return rawbase.id;
                });
            }
        },
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
            this.getUnverified();
        },
        setFilter(filter) {
            this.filter = filter;
        },
        async getUnverified() {
            let data = {
                id: this.portalProject.id,
                take: this.take,
                page: this.page,
                orderBy: this.orderBy,
                orderByType: this.orderByType
            };
            if (this.filter.type !== 'ALL') {
                data.type = this.filter.type;
            }
            if (this.filter.status !== 'ALL') {
                data.status = this.filter.status;
            }
            let unverified = await this.$store.dispatch('localStorage/rawbase_getUnverifiedByProjectId', data);
            if (unverified.data) {
                this.unverified = unverified.data;
                this.unverifiedSize = unverified.count;
            }
        },
        setTake(data) {
            this.take = data.take;
            this.page = data.page;
            this.getUnverified();
        },
    }
}
</script>

<style lang="scss">

</style>