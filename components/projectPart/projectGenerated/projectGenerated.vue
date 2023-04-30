<template>
    <div class="block-body-right" >
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-generated-detail :data="data" v-if="data" @closeModal="showDetail = false"></project-generated-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Generated</div>
            <div class="block-body-right-desc">Project generated page</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="list">
                    <template v-if="list.length > 0">
                        <project-pagination :size="size" @setTake="setTake" :take="take" :page="page"></project-pagination>
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkAll()" onselectstart="return false"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id" @click="setOrderBy('id')">
                                    ID <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'id'), 'block-body-content-table-item-down-up':(orderBy === 'id' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment d-flex" @click="setOrderBy('title')">
                                    Title <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'title'), 'block-body-content-table-item-down-up':(orderBy === 'title' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('cwe')">
                                    CWE-ID <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'cwe'), 'block-body-content-table-item-down-up':(orderBy === 'cwe' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('asvs')">
                                    ASVS <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'asvs'), 'block-body-content-table-item-down-up':(orderBy === 'asvs' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-text" @click="setOrderBy('category')">
                                    CVSS <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'category'), 'block-body-content-table-item-down-up':(orderBy === 'category' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('param')">
                                    Parameters <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'param'), 'block-body-content-table-item-down-up':(orderBy === 'param' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('source')">
                                    Created by <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'source'), 'block-body-content-table-item-down-up':(orderBy === 'source' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-date" @click="setOrderBy('dt_add')">
                                    Added on <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'dt_add'), 'block-body-content-table-item-down-up':(orderBy === 'dt_add' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">Modified by</div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">

                            <div class="block-body-content-table-tr" v-for="(item, key) in list" :key="key" @click.stop="showDetailInfo(item)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox" @click.stop="checkSelected(item.id)">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(item.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ item.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-comment">{{ item.title }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.cwe }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.asvs }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-text">{{ item.category }}<template v-if="item.cvss"> / {{ item.cvss }}</template></div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.param }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ item.source }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-date">{{ item.dt_add }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">
                                    <template v-if="item.lastModifiedBy && item.lastModifiedBy.value">{{ item.lastModifiedBy.value }}</template>
                                </div>
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
                        <project-pagination :size="size" @setTake="setTake" :take="take" :page="page"></project-pagination>
                    </template>
                    <project-no-data v-else></project-no-data>
                </template>
                <project-part-loading v-else></project-part-loading>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectGeneratedDetail from "./projectGeneratedDetail.vue";
import ProjectDraftDetail from "../projectDraft/projectDraftDetail.vue";
import ProjectPagination from "../projectPagination.vue";

export default {
    name: "projectGenerated",
    components: {
        ProjectPagination,
        ProjectDraftDetail, ProjectGeneratedDetail, ModalDetail, ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            list: null,
            size: 0,
            selected: [],
            showDetail: false,
            data: null,
            take: 20,
            page: 1,
            orderBy: 'id',
            orderByType: 'asc',
        }
    },
    computed: {
        isAllSelected() {
            let status = true;
            if (this.list) {
                this.list.forEach(item => {
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
    created() {
        this.getList();
    },
    methods: {
        setTake(data) {
            this.take = data.take;
            this.page = data.page;
            this.getList();
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
            this.getList();
        },
        showDetailInfo(data) {
            this.data       =   data;
            this.showDetail =   true;
        },
        checkAll() {
            if (this.isAllSelected) {
                this.selected = [];
            } else if (this.list) {
                this.selected = this.list.map((item) => {
                    return item.id;
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
        async getList() {
            if (this.portalProject) {
                let portalJitReports    =   await this.$store.dispatch('localStorage/portalJitReport_getWhere', {
                    project_id: this.portalProject.id,
                    status: 'generated',
                    take: this.take,
                    page: this.page,
                    orderBy: this.orderBy,
                    orderByType: this.orderByType
                });
                if (portalJitReports.data) {
                    this.list   =   portalJitReports.data;
                    this.size   =   portalJitReports.count;
                }
            }
        },
    }
}
</script>

<style>

</style>