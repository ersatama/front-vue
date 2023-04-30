<template>
    <div class="block-body-right" >
        <modal-box v-if="portalProject" :modal="filterModal" @closeModal="filterModal = false">
            <raw-report-filter :project="portalProject" @setFilter="setFilter" @closeModal="filterModal = false"></raw-report-filter>
        </modal-box>
        <modal-box :modal="tableSettingsModal" @closeModal="tableSettingsModal = false">
            <raw-report-table-settings></raw-report-table-settings>
        </modal-box>
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-raw-report-detail :data="data" v-if="data" @closeModal="showDetail = false"></project-raw-report-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Raw reports</div>
            <div class="block-body-right-desc">Neuron raw reports</div>
            <div class="block-body-right-header-buttons">
                <template v-if="selected.length > 0">
                    <button class="block-body-content-delete">
                        <i class="block-body-content-filter-icon block-body-content-filter-icon-delete"></i> Delete drafts
                    </button>
                    <button class="block-body-content-filter">
                        <i class="block-body-content-filter-icon block-body-content-filter-icon-move"></i> Mark as FP
                    </button>
                    <button class="block-body-content-filter">
                        <i class="block-body-content-filter-icon block-body-content-filter-icon-move"></i> Change status
                    </button>
                </template>
                <button class="block-body-content-filter" @click="filterModal = true"><i class="block-body-content-filter-icon"></i> Filter</button>
            </div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="rawReports">
                    <template v-if="rawReports.length > 0">
                        <raw-report-detail :links="links" :size="rawReportSize" @setTake="setTake" :take="take" :page="page"></raw-report-detail>
                        <div class="block-body-content-table-header">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkRawReportAll()" onselectstart="return false"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id" @click="setOrderBy('id')">
                                    ID <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'id'), 'block-body-content-table-item-down-up':(orderBy === 'id' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-process" @click="setOrderBy('process')">
                                    Process <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'process'), 'block-body-content-table-item-down-up':(orderBy === 'process' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-scan" @click="setOrderBy('scan')">
                                    Scan <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'scan'), 'block-body-content-table-item-down-up':(orderBy === 'scan' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-service" @click="setOrderBy('service')">
                                    Service <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'service'), 'block-body-content-table-item-down-up':(orderBy === 'service' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-name" @click="setOrderBy('name')">
                                    Name <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'name'), 'block-body-content-table-item-down-up':(orderBy === 'name' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-status" @click="setOrderBy('status')">
                                    Status <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'status'), 'block-body-content-table-item-down-up':(orderBy === 'status' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-rawbase" @click="setOrderBy('rawbase')">
                                    Rawbase <div class="block-body-content-table-item-down" :class="{'block-body-content-table-item-down-disabled':(orderBy !== 'rawbase'), 'block-body-content-table-item-down-up':(orderBy === 'rawbase' && orderByType === 'desc')}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                    <div class="block-body-content-table-item-configure" @click="tableSettingsModal = true"></div>
                                </div>
                            </div>
                        </div>
                        <div class="block-body-content-table-body">

                            <div class="block-body-content-table-tr" v-for="(rawReport, key) in rawReports" :key="key" @click.stop="showDetailInfo(rawReport)">
                                <div class="block-body-content-table-item block-body-content-table-item-checkbox" @click.stop="checkRawReport(rawReport.id)">
                                    <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':selected.includes(rawReport.id)}"></div>
                                </div>
                                <div class="block-body-content-table-item block-body-content-table-item-id">{{ rawReport.id }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-process">{{ rawReport.process }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-scan">{{ rawReport.scan }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-service">{{ rawReport.service }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-name">{{ rawReport.name }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-status">{{ rawReport.status }}</div>
                                <div class="block-body-content-table-item block-body-content-table-item-rawbase">
                                    <template v-if="rawReport.rawbase === 0">NO DRAFT</template>
                                    <template v-else>DRAFT</template>
                                </div>
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
                        <raw-report-detail :links="links" :size="rawReportSize" @setTake="setTake" :take="take" :page="page"></raw-report-detail>
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
import RawReportTableSettings from "../../modal/rawReportTableSettings.vue";
import RawReportDetail from "../rawReportDetail.vue";
import RawReportFilter from "../../modal/rawReportFilter.vue";
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectRawReportDetail from "./projectRawReportDetail.vue";
import ProjectUnpatchedDetail from "../projectUnpatched/projectUnpatchedDetail.vue";

export default {
  name: "projectRawReport",
  components: {
      ProjectUnpatchedDetail,
      ProjectRawReportDetail,
      ModalDetail,
      ProjectNoData, ProjectPartLoading, RawReportFilter, RawReportDetail, RawReportTableSettings, ModalBox},
  props: ['portalProject','links'],
  data() {
    return {
      rawReports: null,
      selected: [],
      tableSettingsModal: false,
      rawReportSize: 0,
      take: 20,
      page: 1,
        orderBy: 'id',
        orderByType: 'asc',
      filterModal: false,
        data: null,
        showDetail: false,
        filter: {
            target: "all",
            service: "All",
            status: "ALL",
            draft: "ALL",
            search: ''
        },
    }
  },
  watch: {
    filter() {
      this.page = 1;
      this.getRawReports();
    },
  },
  computed: {
    isAllSelected() {
      let status = true;
      if (this.rawReports) {
          this.rawReports.forEach(rawReport => {
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
  methods: {
      showDetailInfo(data) {
          this.data       =   data;
          this.showDetail =   true;
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
          this.getRawReports();
      },
      setFilter(filter) {
          this.filter = filter;
      },
    async getRawReports() {
      if (this.filter && this.portalProject) {
        let data  = {
          id: this.portalProject.id,
          take: this.take,
          page: this.page,
            orderBy: this.orderBy,
            orderByType: this.orderByType
        };
        if (this.filter.target !== 'all') {
          data.target = this.filter.target;
        }
        if (this.filter.service !== 'All') {
          data.service = this.filter.service;
        }
        if (this.filter.status !== 'ALL') {
          data.status = this.filter.status;
        }
        if (this.filter.draft !== 'ALL') {
          data.draft = this.filter.draft;
        }
        if (this.filter.search !== '') {
          data.search = this.filter.search;
        }
        let rawReports = await this.$store.dispatch('localStorage/scanReportRawMaster_getByProjectId', data);
        if (rawReports.data) {
          this.rawReports = rawReports.data;
          this.rawReportSize  = rawReports.count;
        }
      }
    },
    checkRawReportAll() {
      if (this.isAllSelected) {
        this.selected = [];
      } else if (this.rawReports) {
          this.selected = this.rawReports.map((rawReport) => {
              return rawReport.id;
          });
      }
    },
    checkRawReport(id) {
      if (this.selected.includes(id)) {
        let index = this.selected.indexOf(id);
        if (index !== -1) {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected.push(id);
      }
    },
    setTake(data) {
      this.take = data.take;
      this.page = data.page;
      this.getRawReports();
    },
  }
}
</script>

<style lang="scss">

</style>