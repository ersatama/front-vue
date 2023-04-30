<template>
    <div class="block-body-right" >
        <modal-detail :show="scanJobDetail" @closeModal="scanJobDetail = false">
            <project-scan-jobs-detail :data="scanJob" v-if="scanJob" @closeModal="scanJobDetail = false"></project-scan-jobs-detail>
        </modal-detail>
        <modal-detail :show="neuronScanJobDetail" @closeModal="neuronScanJobDetail = false">
            <project-neuron-scan-jobs-detail :data="neuronScanJob" v-if="neuronScanJob" @closeModal="neuronScanJobDetail = false"></project-neuron-scan-jobs-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Scan jobs</div>
            <div class="block-body-right-desc">Project scan jobs</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-report"><i class="block-body-content-filter-icon block-body-content-filter-icon-vuln"></i> Alert processes page</button>
                <button class="block-body-content-vuln"><i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Create new scanjob</button>
            </div>
        </div>
        <div class="block-body-content">
            <div style="width: 100%;">
                <div class="block-body-content-table">
                    <template v-if="scanjobs">
                        <template v-if="scanjobs.data && Object.entries(scanjobs.data).length > 0">
                            <div class="block-body-content-table-header">
                                <div class="block-body-content-table-tr">
                                    <div class="block-body-content-table-item block-body-content-table-item-id">ID</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-url">URL</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">Scan Engine & Config</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">STATUS</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-comment">COMMENT</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-date">Start / End Date</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-body-content-table-body">
                                <div class="block-body-content-table-tr" v-for="(job, key) in Object.entries(scanjobs.data)" :key="key" @click.stop="showScanJobDetailInfo(job)" @mousedown.stop>
                                    <div class="block-body-content-table-item block-body-content-table-item-id">{{ job[1].job_id }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-url">{{ job[1].target_url }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-sitemap-size" style="color: #0b76a6; font-weight: 600;" v-html="parseServices(job[1].services)"></div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">{{ job[1].status }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-comment">{{ job[1].comment }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-date">{{ job[1].starttime }}<br>{{ job[1].endtime }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-option">
                                            <div class="block-body-content-table-item-option-select">
                                                <div class="block-body-content-table-item-option-select-angle"></div>
                                                <div class="block-body-content-table-item-option-select-list">
                                                    <div class="block-body-content-table-item-option-select-item" v-if="job[1].status === 'MANUALSTART'">Start</div>
                                                    <div class="block-body-content-table-item-option-select-item" v-if="job[1].status === 'WAITOSTART' || job[1].status === 'MANUALSTART' || job[1].status === 'DARKWEB_WORKING' || $data['period']">Edit</div>
                                                    <div class="block-body-content-table-item-option-select-item" v-if="job[1].status === 'DRAFT' || job[1].status === 'WAITOSTART' || job[1].status === 'DONE' || job[1].status === 'ERR' || job[1].status === 'MANUALSTART' || job[1].status === 'DARKWEB_WORKING'">Delete</div>
                                                    <div class="block-body-content-table-item-option-select-item" v-if="job[1].processes.length > 0">Expand processes</div>
                                                    <div class="block-body-content-table-item-option-select-item" v-if="job[1].servicesFull.jsverify && job[1].status === 'DONE'">Restart job</div>
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
                <div class="block-body-right-header">
                    <div class="block-body-right-title">Neuron Scan jobs</div>
                    <div class="block-body-right-desc">Project neuron scan jobs</div>
                </div>
                <div class="block-body-content-table">
                    <template v-if="scanjobs">
                        <template v-if="scanjobs.neuronData && scanjobs.neuronData.length > 0">
                            <div class="block-body-content-table-header">
                                <div class="block-body-content-table-tr">
                                    <div class="block-body-content-table-item block-body-content-table-item-id-short-60">ID</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-longstatus">Neuron targets id</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-url">URL</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">Scan Engine & Config</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">Command</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">Status</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-comment">Comment</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-date">Start / End Date</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-body-content-table-body">

                                <div class="block-body-content-table-tr" v-for="(neuronJob, key) in scanjobs.neuronData" :key="key" @click.stop="showNeuronScanJobDetailInfo(neuronJob)" @mousedown.stop>
                                    <div class="block-body-content-table-item block-body-content-table-item-id-short-60">{{ neuronJob.id }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-longstatus">{{ neuronJob.neuron_targets_id }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-url">{{ neuronJob.target_url }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-engine">
                                        <project-scan-jobs-services :services="JSON.parse(neuronJob.services_json)"></project-scan-jobs-services>
                                    </div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">{{ neuronJob.command }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-status">{{ neuronJob.status }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-comment">{{ neuronJob.comment }}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-date">{{ neuronJob.realStartTime }} <template v-if="neuronJob.realEndTime"><br> {{ neuronJob.realEndTime }}</template></div>
                                    <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                        <div class="block-body-content-table-item-option">
                                            <div class="block-body-content-table-item-option-select">
                                                <div class="block-body-content-table-item-option-select-angle"></div>
                                                <div class="block-body-content-table-item-option-select-list">
                                                    <div class="block-body-content-table-item-option-select-item">Start</div>
                                                    <div class="block-body-content-table-item-option-select-item">Edit</div>
                                                    <div class="block-body-content-table-item-option-select-item">Delete</div>
                                                    <div class="block-body-content-table-item-option-select-item">Add authscript</div>
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
    </div>
</template>

<script>
import ProjectScanJobsServices from "./projectScanJobsServices.vue";
import ProjectPartLoading from "../../modal/projectPartLoading.vue";
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectScanJobsDetail from "./projectScanJobsDetail.vue";
import ProjectRawbaseDetail from "../projectRawbase/projectRawbaseDetail.vue";
import ProjectNeuronScanJobsDetail from "./projectNeuronScanJobsDetail.vue";

export default {
  name: "projectScanJobs",
  components: {
      ProjectNeuronScanJobsDetail,
      ProjectRawbaseDetail,
      ProjectScanJobsDetail, ModalDetail, ProjectNoData, ProjectPartLoading, ProjectScanJobsServices},
  props: ['portalProject'],
  data() {
    return {
        scanjobs: null,
        scanJob: null,
        scanJobDetail: false,
        neuronScanJob: null,
        neuronScanJobDetail: false,
    }
  },
  created() {
    this.getScanjobs();
  },
  methods: {
      showScanJobDetailInfo(data) {
          this.scanJob          =   data;
          this.scanJobDetail    =   true;
      },
      showNeuronScanJobDetailInfo(data) {
          this.neuronScanJob        =   data;
          this.neuronScanJobDetail  =   true;
      },
    async getScanjobs() {
      if (this.portalProject) {
          if (this.portalProject.type !== 3010) {
              this.scanjobs = await this.$store.dispatch('localStorage/scanJob_getByProjectId', this.portalProject.id);
          } else {
              this.scanjobs = await this.$store.dispatch('localStorage/scanNeuronJob_getJobsByProjectId', this.portalProject.id);
          }
      }
    },
    parseServices(services) {
      let parsedServices  = services.split(',');
      let result  = parsedServices.map(item => {
        let val = item.replace(/ *\([^)]*\) */g, '');
        if (val === 'START') {
          return 'START (virtual)';
        } else if (val === 'STOP') {
          return 'STOP (virtual)'
        }
        return val;
      });
      result = [...new Set(result)];
      let parsedHtml = '';
      if (result.length > 1) {
        result.forEach(item => {
          parsedHtml  += item + '<br>';
        });
      } else {
        parsedHtml  = result[0];
      }
      return parsedHtml;
    }
  }
}
</script>

<style lang="scss">

</style>