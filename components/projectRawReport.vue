<template>
  <div class="block-body-content-table">
    <modal-box :modal="tableSettingsModal" @closeModal="tableSettingsModal = false">
      <raw-report-table-settings></raw-report-table-settings>
    </modal-box>
    <raw-report-detail></raw-report-detail>
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
        <div class="block-body-content-table-item block-body-content-table-item-id">3918558</div>
        <div class="block-body-content-table-item block-body-content-table-item-process">36974</div>
        <div class="block-body-content-table-item block-body-content-table-item-scan">33114</div>
        <div class="block-body-content-table-item block-body-content-table-item-service">badbots</div>
        <div class="block-body-content-table-item block-body-content-table-item-name">WEBSEC_X_XSS_PROTECTION_DEPRECATED</div>
        <div class="block-body-content-table-item block-body-content-table-item-status">OLD</div>
        <div class="block-body-content-table-item block-body-content-table-item-rawbase">NO DRAFT</div>
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
    <raw-report-detail></raw-report-detail>
  </div>
</template>

<script>
import ModalBox from "./modalBox.vue";
import RawReportTableSettings from "./rawReportTableSettings.vue";
import RawReportDetail from "./rawReportDetail.vue";

export default {
  name: "projectRawReport",
  components: {RawReportDetail, RawReportTableSettings, ModalBox},
  props: ['portalProject'],
  data() {
    return {
      rawReports: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7}],
      selected: [],
      tableSettingsModal: false,
    }
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
    }
  }
}
</script>

<style lang="scss">

</style>