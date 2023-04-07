<template>
  <div class="block-body-content-table">
    <modal-box :modal="tableSettingsModal" @closeModal="tableSettingsModal = false">
      <raw-report-table-settings></raw-report-table-settings>
    </modal-box>
    <raw-report-detail :links="links" :size="rawReportSize" @setTake="setTake" :page="page"></raw-report-detail>
    <div class="block-body-content-table-header">
      <div class="block-body-content-table-tr">
        <div class="block-body-content-table-item block-body-content-table-item-checkbox">
          <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':isAllSelected}" @click="checkRawReportAll()" onselectstart="return false"></div>
        </div>
        <div class="block-body-content-table-item block-body-content-table-item-id">ID <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-process">Process <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-scan">Scan <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-service">Service <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-name">Name <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-status">Status <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-rawbase">Rawbase <div class="block-body-content-table-item-down"></div></div>
        <div class="block-body-content-table-item block-body-content-table-item-field-option">
          <div class="block-body-content-table-item-configure" @click="tableSettingsModal = true"></div>
        </div>
      </div>
    </div>
    <div class="block-body-content-table-body">
      <div class="block-body-content-table-tr" v-for="(rawReport, key) in rawReports" :key="key" @click="checkRawReport(rawReport.id)">
        <div class="block-body-content-table-item block-body-content-table-item-checkbox">
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
    <raw-report-detail :links="links" :size="rawReportSize" @setTake="setTake" :page="page"></raw-report-detail>
  </div>
</template>

<script>
import ModalBox from "./modalBox.vue";
import RawReportTableSettings from "./rawReportTableSettings.vue";
import RawReportDetail from "./rawReportDetail.vue";

export default {
  name: "projectRawReport",
  components: {RawReportDetail, RawReportTableSettings, ModalBox},
  props: ['portalProject','links','filter'],
  data() {
    return {
      rawReports: [],
      selected: [],
      tableSettingsModal: false,
      rawReportSize: 0,
      take: 20,
      page: 1
    }
  },
  mounted() {
    this.page = 1;
    this.getRawReports();
  },
  watch: {
    filter() {
      this.getRawReports();
    },
  },
  computed: {
    isAllSelected() {
      let status = true;
      this.rawReports.forEach(rawReport => {
        if (!this.selected.includes(rawReport.id)) {
          status = false;
        }
      });
      return status;
    }
  },
  methods: {
    async getRawReports() {
      if (this.filter) {
        let data  = {
          id: this.portalProject.id,
          take: this.take,
          page: this.page
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
      } else {
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