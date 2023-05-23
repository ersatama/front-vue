<template>
  <div class="block">
    <div class="block-title">
        <div class="block-title-data">
            <div class="block-title-data-name">
                <span>Project</span> #{{ projectId }}
            </div>
            <div class="block-title-data-desc" v-if="portalProject && portalProject.portalProjectType">
                <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template><template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template><template v-if="portalProject.rescan > 0"> Patch Verification</template>
            </div>
        </div>
        <div class="block-body-right-header-buttons">
            <button class="block-body-content-vuln"><i class="block-body-content-filter-icon block-body-content-filter-icon-vuln"></i> New vuln</button>
            <button class="block-body-content-report"><i class="block-body-content-filter-icon block-body-content-filter-icon-graph"></i> Report</button>
        </div>
    </div>
    <div class="block-body" v-if="portalProject">
      <project-sidebar :portalProject="portalProject" :tab="tab" :links="links"></project-sidebar>
      <template v-if="tab === 0">
          <div class="block-body-right-split" >
              <project-details :portalProject="portalProject"></project-details>
              <project-server-availability-monitor :portalProject="portalProject"></project-server-availability-monitor>
              <project-statistics-monitor :portalProject="portalProject"></project-statistics-monitor>
              <project-additional-application-urls :portalProject="portalProject"></project-additional-application-urls>
              <project-additional-information :portalProject="portalProject"></project-additional-information>
              <project-job-statuses :portalProject="portalProject"></project-job-statuses>
          </div>
      </template>
      <project-raw-report :portalProject="portalProject" :links="linksRawReport" v-else-if="tab === 1"></project-raw-report>
      <project-alerts :portalProject="portalProject" v-else-if="tab === 2"></project-alerts>
      <project-scan-jobs :portalProject="portalProject" v-else-if="tab === 3"></project-scan-jobs>
      <project-sitemap :links="links" v-else-if="tab === 4"></project-sitemap>
      <project-unpatched :portalProject="portalProject" v-else-if="tab === 5"></project-unpatched>
      <project-tasks :portalProject="portalProject" v-else-if="tab === 6"></project-tasks>
      <project-rawbase :portalProject="portalProject" v-else-if="tab === 7"></project-rawbase>
      <project-blacklist :portalProject="portalProject" v-else-if="tab === 8"></project-blacklist>
      <project-patch-verification :portalProject="portalProject" v-else-if="tab === 9"></project-patch-verification>
      <project-archived :portalProject="portalProject" v-else-if="tab === 10"></project-archived>
      <project-patched :portalProject="portalProject" v-else-if="tab === 11"></project-patched>
      <project-draft :portalProject="portalProject" v-else-if="tab === 12"></project-draft>
      <project-generated :portalProject="portalProject" v-else-if="tab === 13"></project-generated>
      <project-unverified :portalProject="portalProject" v-else-if="tab === 14"></project-unverified>
      <project-tickets :portalProject="portalProject" v-else-if="tab === 15"></project-tickets>
      <project-soft-vuln-monitor :portalProject="portalProject" v-else-if="tab === 16"></project-soft-vuln-monitor>
    </div>
    <project-loading v-else></project-loading>
  </div>
</template>

<script>
import ExtraProfileContent from "../../components/profile/extraProfileContent.vue";
import ProjectRawReport from "../../components/projectPart/projectRawReport/projectRawReport.vue";
import ModalBox from "../../components/modal/modalBox.vue";
import RawReportFilter from "../../components/modal/rawReportFilter.vue";
import ProjectSitemap from "../../components/projectPart/projectSitemap/projectSitemap.vue";
import ProjectScanJobs from "../../components/projectPart/projectScanJobs/projectScanJobs.vue";
import ProjectUnpatched from "../../components/projectPart/projectUnpatched/projectUnpatched.vue";
import ProjectTasks from "../../components/projectPart/projectTasks/projectTasks.vue";
import ProjectRawbase from "../../components/projectPart/projectRawbase/projectRawbase.vue";
import ProjectDetails from "../../components/projectPart/projectDetails/projectDetails.vue";
import ProjectAlerts from "../../components/projectPart/projectAlerts/projectAlerts.vue";
import ProjectSidebar from "../../components/projectPart/projectSidebar.vue";
import ProjectLoading from "../../components/modal/projectLoading.vue";
import ProjectBlacklist from "../../components/projectPart/projectBlacklist/projectBlacklist.vue";
import ProjectPatchVerification from "../../components/projectPart/projectPatchVerification/projectPatchVerification.vue";
import ProjectArchived from "../../components/projectPart/projectArchived/projectArchived.vue";
import ProjectPatched from "../../components/projectPart/projectPatched/projectPatched.vue";
import ProjectDraft from "../../components/projectPart/projectDraft/projectDraft.vue";
import ProjectGenerated from "../../components/projectPart/projectGenerated/projectGenerated.vue";
import ProjectUnverified from "../../components/projectPart/projectUnverified/projectUnverified.vue";
import ProjectTickets from "../../components/projectPart/projectTickets/projectTickets.vue";
import ProjectSoftVulnMonitor from "../../components/projectPart/projectSoftVuln/projectSoftVulnMonitor.vue";
import ProjectServerAvailabilityMonitor
    from "../../components/projectPart/projectDetails/projectServerAvailabilityMonitor/projectServerAvailabilityMonitor.vue";

export default {
  components: {
      ProjectServerAvailabilityMonitor,
      ProjectSoftVulnMonitor,
      ProjectTickets,
      ProjectUnverified,
      ProjectGenerated,
      ProjectDraft,
      ProjectPatched,
      ProjectArchived,
      ProjectPatchVerification,
      ProjectBlacklist,
      ProjectLoading,
      ProjectSidebar,
      ProjectAlerts,
      ProjectDetails,
      ProjectRawbase,
      ProjectTasks,
    ProjectUnpatched,
    ProjectScanJobs, ProjectSitemap, RawReportFilter, ModalBox, ProjectRawReport, ExtraProfileContent},
  layout: 'admin',
  name: "project",
  data() {
    return {
      alias: '',
      name: '',
      surname: '',
      last_name: '',
      email: '',
      mode: false,
      portalProject: null,
      links: null,
    }
  },
  computed: {
    linksRawReport() {
      let rawReport = null;
      if (this.links && this.links.neuron_raw_reports) {
        rawReport = this.links.neuron_raw_reports;
      }
      return rawReport;
    },
    projectId() {
      let id = null;
      if (this.$route.params.project) {
        id = this.$route.params.project;
      }
      return id;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
    tab() {
      let tab = 0;
      if (this.$route.query.tab) {
        let query  = this.$route.query.tab;
        if (query === 'reports') {
          tab = 1;
        } else if (query === 'alerts') {
          tab = 2;
        } else if (query === 'scan_jobs') {
          tab = 3;
        } else if (query === 'sitemaps') {
          tab = 4;
        } else if (query === 'unpatched') {
            tab = 5;
        } else if (query === 'tasks') {
            tab = 6;
        } else if (query === 'rawbase') {
            tab = 7;
        } else if (query === 'blacklist') {
            tab = 8;
        } else if (query === 'patch_verification') {
            tab = 9;
        } else if (query === 'archived') {
            tab = 10;
        } else if (query === 'patched') {
            tab = 11;
        } else if (query === 'draft') {
            tab = 12;
        } else if (query === 'generated') {
            tab = 13;
        } else if (query === 'unverified') {
            tab = 14;
        } else if (query === 'tickets') {
            tab = 15;
        } else if (query === 'monitoring') {
            tab = 16;
        }
      }
      return tab;
    }
  },
  mounted() {
    this.getProjectById();
    this.getLinksById();
  },
  methods: {
    async getProjectById() {
      let project = await this.$store.dispatch('localStorage/portalProject_firstById', this.projectId);
      if (project.data) {
        this.portalProject  = project.data;
      }
    },
    async getLinksById() {
      let links = await this.$store.dispatch('localStorage/portalProject_linksById', this.projectId);
      if (links.data) {
        this.links  = links.data;
      }
    },
  }
}
</script>

<style lang="scss">

</style>