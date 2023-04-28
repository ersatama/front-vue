<template>
    <div class="block-body-right" >
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-soft-vuln-detail :data="softVuln" v-if="softVuln" @closeModal="showDetail = false"></project-soft-vuln-detail>
        </modal-detail>
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
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-60" @click="setOrderBy('id')">
                                    ID <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'id'), 'block-body-content-table-item-down-up':(orderBy === 'id' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-70" @click="setOrderBy('vendor')">
                                    Vendor <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'vendor'), 'block-body-content-table-item-down-up':(orderBy === 'vendor' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-70" @click="setOrderBy('software')">
                                    Software <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'software'), 'block-body-content-table-item-down-up':(orderBy === 'software' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short" @click="setOrderBy('version')">
                                    Version <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'version'), 'block-body-content-table-item-down-up':(orderBy === 'version' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext" @click="setOrderBy('link')">
                                    Link <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'link'), 'block-body-content-table-item-down-up':(orderBy === 'link' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-50" @click="setOrderBy('alert')">
                                    Alert <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'alert'), 'block-body-content-table-item-down-up':(orderBy === 'alert' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext" @click="setOrderBy('vuln')">
                                    Details <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'vuln'), 'block-body-content-table-item-down-up':(orderBy === 'vuln' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-100" @click="setOrderBy('comment')">
                                    Comment <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'comment'), 'block-body-content-table-item-down-up':(orderBy === 'comment' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">Projects</div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">
                            <div class="block-body-content-table-tr" v-for="(softVuln,key) in softVulns" :key="key" @click.stop="showDetailInfo(softVuln)" @mousedown.stop>
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-60">{{ softVuln.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-70">{{ softVuln.vendor }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short-70">{{ softVuln.software }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status-short">{{ softVuln.version }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext block-body-content-table-item-cuttext-dotted">
                                    <span v-if="softVuln.link && softVuln.link.trim() !== ''" :title="softVuln.link">{{ softVuln.link }}</span>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id-short-50">{{ softVuln.alert }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-cuttext block-body-content-table-item-cuttext-dotted">
                                    <span v-if="softVuln.vuln && softVuln.vuln.trim() !== ''" :title="softVuln.vuln">{{ softVuln.vuln }}</span>
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
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectSoftVulnDetail from "./projectSoftVulnDetail.vue";

export default {
    name: "projectSoftVulnMonitor",
    components: {ProjectSoftVulnDetail, ModalDetail, ProjectNoData, ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            orderBy: 'id',
            orderByType: 'asc',
            softVuln: null,
            softVulns: null,
            showDetail: false
        }
    },
    created() {
        this.getSoftVulns();
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
            this.getSoftVulns();
        },
        showDetailInfo(softVuln) {
            this.softVuln   =   softVuln;
            this.showDetail =   true;
        },
        async getSoftVulns() {
            if (this.portalProject) {
                let softVulns = await this.$store.dispatch('localStorage/projsoft_getSoftVulnByProjectId', {
                    project_id: this.portalProject.id,
                    orderBy: this.orderBy,
                    orderByType: this.orderByType
                });
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