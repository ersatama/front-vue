<template>
  <div class="filter bg-white">
    <div class="filter-title d-flex align-items-center">
      Filter <div class="filter-reset" @click="resetFilter"></div>
    </div>
    <div class="filter-options">
      <div class="filter-item">
        <div class="filter-item-title text-muted">Project type:</div>
        <div class="filter-item-input">
          <select v-model="type" v-if="portalProjectTypesTitle">
            <option v-for="(item, key) in portalProjectTypesTitle" :key="key" :value="item">{{item}}</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Project status:</div>
          <div class="filter-item-input">
            <input type="text" v-model="projectStatus">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Project ID:</div>
          <div class="filter-item-input">
            <input type="text" v-model="projectId">
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Test project:</div>
        <div class="filter-item-input">
          <select v-model="testProject">
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Host:</div>
          <div class="filter-item-input">
            <input type="text" list="hosts" v-model="host">
            <datalist id="hosts">
              <option v-for="(host,key) in hosts" :key="key">{{ host }}</option>
            </datalist>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Target URL:</div>
          <div class="filter-item-input">
            <input type="text" list="urls" v-model="targetUrl">
            <datalist id="urls">
              <option v-for="(url,key) in urls" :key="key">{{ url }}</option>
            </datalist>
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Project approved:</div>
        <div class="filter-item-input">
          <select v-model="projectApproved">
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Report date:</div>
          <div class="filter-item-input">
            <datepicker v-model="report_date" :input-class="'filter-item-input-date'" :clear-button="true"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Schedule date:</div>
          <div class="filter-item-input">
            <datepicker v-model="scheduled_date" :input-class="'filter-item-input-date'" :clear-button="true"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Scheduled:</div>
          <div class="filter-item-input">
            <datepicker v-model="scheduled_after_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'after date'"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Scheduled:</div>
          <div class="filter-item-input">
            <datepicker v-model="scheduled_before_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'before date'"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous paid:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_paid_after_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'after date'"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous paid:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_paid_before_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'before date'"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous from:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_from_after_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'after date'"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous from:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_from_before_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'before date'"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Auditor:</div>
        <div class="filter-item-input">
          <select v-model="scanby">
            <option v-for="(auditor,key) in auditors" :key="key">{{auditor}}</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Client Name:</div>
          <div class="filter-item-input">
            <input type="text" v-model="client">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Company:</div>
          <div class="filter-item-input">
            <input type="text" list="companies" v-model="company">
            <datalist id="companies">
              <option v-for="(company,key) in companies" :key="key">{{ company }}</option>
            </datalist>
          </div>
        </div>
      </div>
      <button class="filter-item-btn btn btn-primary text-white" @click="searchPortalProjects">Search</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import projectStatus from "./projectStatus.vue";
export default {
  name: "dashboardFilter",
  components: {
    Datepicker
  },
  props: ['filter'],
  data() {
    return {
      scanby: 'All',
      type: 'All',
      projectId: '',
      projectStatus: '',
      testProject: 'All',
      host: '',
      targetUrl: '',
      projectApproved: 'All',
      report_date: '',
      scheduled_date: '',
      scheduled_before_date: '',
      scheduled_after_date: '',
      continuous_paid_before_date: '',
      continuous_paid_after_date: '',
      continuous_from_before_date: '',
      continuous_from_after_date: '',
      client: '',
      company: '',
    }
  },
  async mounted() {
    await this.$store.dispatch('localStorage/portalProjectType_get');
    await this.$store.dispatch('localStorage/portalProject_filter');
  },
  computed: {
    portalProjectTypes() {
      return this.$store.state.localStorage.portalProjectTypes;
    },
    portalProjectFilter() {
      return this.$store.state.localStorage.portalProjectFilter;
    },
    portalProjectTypesTitle() {
      let data  = ['All'];
      this.portalProjectTypes.forEach(portalProjectType => {
        if (!data.includes(portalProjectType.title)) {
          data.push(portalProjectType.title);
        }
      });
      return data;
    },
    auditors() {
      let data  = ['All'];
      if (this.portalProjectFilter && this.portalProjectFilter.auditors) {
        this.portalProjectFilter.auditors.forEach(auditor => {
          if (auditor.scanby) {
            data.push(auditor.scanby);
          }
        });
      }
      return data.sort();
    },
    urls() {
      let data  = [];
      if (this.portalProjectFilter && this.portalProjectFilter.urls) {
        this.portalProjectFilter.urls.forEach(url => {
          if (url.url) {
            data.push(url.url);
          }
        });
      }
      return data.sort();
    },
    hosts() {
      let data  = [];
      if (this.portalProjectFilter && this.portalProjectFilter.hosts) {
        this.portalProjectFilter.hosts.forEach(host => {
          if (host.host) {
            data.push(host.host);
          }
        });
      }
      return data.sort();
    },
    companies() {
      let data  = [];
      if (this.portalProjectFilter && this.portalProjectFilter.companies) {
        this.portalProjectFilter.companies.forEach(company => {
          data.push(company.company);
        });
      }
      return data.sort();
    }
  },
  methods: {
    resetFilter() {
      this.scanby = 'All';
      this.type = 'All';
      this.projectId = '';
      this.projectStatus = '';
      this.testProject = 'All';
      this.host = '';
      this.targetUrl = '';
      this.projectApproved = 'All';
      this.report_date = '';
      this.scheduled_date = '';
      this.scheduled_before_date = '';
      this.scheduled_after_date = '';
      this.continuous_paid_before_date = '';
      this.continuous_paid_after_date = '';
      this.continuous_from_before_date = '';
      this.continuous_from_after_date = '';
      this.client = '';
      this.company = '';
      this.searchPortalProjects();
    },
    searchPortalProjects() {
      this.$emit('changeFilter', {
        scanby: this.scanby,
        type: this.type,
        projectId: this.projectId,
        projectStatus: this.projectStatus,
        testProject: this.testProject,
        host: this.host,
        targetUrl: this.targetUrl,
        projectApproved: this.projectApproved,
        report_date: this.report_date,
        scheduled_date: this.scheduled_date,
        scheduled_before_date: this.scheduled_before_date,
        scheduled_after_date: this.scheduled_after_date,
        continuous_paid_before_date: this.continuous_paid_before_date,
        continuous_paid_after_date: this.continuous_paid_after_date,
        continuous_from_before_date: this.continuous_from_before_date,
        continuous_from_after_date: this.continuous_from_after_date,
        client: this.client,
        company: this.company
      });
    }
  }
}
</script>

<style lang="scss">

</style>