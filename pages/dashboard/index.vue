<template>
  <div>
    <project-status></project-status>
    <div class="d-flex page" v-if="portalProjects">
      <div class="page-left">
        <div class="page-left-header">
          <div class="page-left-header-title text-muted">
            Найдено проекта: <span class="page-left-header-title-success"><template v-if="portalProjects.count">{{portalProjects.count}}</template><template v-else>0</template></span>
          </div>
          <div class="page-left-header-detail">
            <div class="page-left-header-pagination">
              <div class="page-left-header-pages page-left-header-prev" v-if="prev" @click="pageBreak--"></div>
              <div class="page-left-header-pages" v-for="(n,key) in ranges" :key="key" :class="{'page-left-header-pages-selected':(n === page)}" @click="page = n">{{ n }}</div>
              <div class="page-left-header-pages page-left-header-next" v-if="next" @click="pageBreak++"></div>
            </div>
            <div class="page-left-header-take">
              <select v-model="take">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>
          <div class="page-left-list" v-if="loadingStatus">
            <project-item v-for="(portalProject, key) in portalProjects.data" :key="key" :portalProject="portalProject"></project-item>
          </div>
          <div class="block-dashboard-loading-left-items" style="margin-top: 20px;" v-else>
              <div class="block-dashboard-loading-left-item">
                  <div class="block-dashboard-loading-left-item-header">
                      <div class="block-dashboard-loading-left-item-header-left">
                          <div class="block-loading-item-field"></div>
                      </div>
                      <div class="block-dashboard-loading-left-item-header-right">
                          <div class="block-loading-item-field"></div>
                      </div>
                  </div>
              </div>
              <div class="block-dashboard-loading-left-item">
                  <div class="block-dashboard-loading-left-item-header">
                      <div class="block-dashboard-loading-left-item-header-left">
                          <div class="block-loading-item-field"></div>
                      </div>
                      <div class="block-dashboard-loading-left-item-header-right">
                          <div class="block-loading-item-field"></div>
                      </div>
                  </div>
              </div>
              <div class="block-dashboard-loading-left-item">
                  <div class="block-dashboard-loading-left-item-header">
                      <div class="block-dashboard-loading-left-item-header-left">
                          <div class="block-loading-item-field"></div>
                      </div>
                      <div class="block-dashboard-loading-left-item-header-right">
                          <div class="block-loading-item-field"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <dashboard-filter :filter="filter" @changeFilter="changeFilter"></dashboard-filter>
    </div>
    <dashboard-loading v-else></dashboard-loading>
  </div>
</template>

<script>
import ProjectStatus from "../../components/dashboard/projectStatus.vue";
import ProjectItem from "../../components/dashboard/projectItem.vue";
import DashboardFilter from "../../components/dashboard/dashboardFilter.vue";
import DashboardLoading from "../../components/modal/dashboardLoading.vue";

export default {
  components: {DashboardLoading, DashboardFilter, ProjectItem, ProjectStatus},
  layout: 'admin',
  name: "index",
  data() {
    return {
        loadingStatus: false,
      portalProjects: null,
      page: 1,
      pageBreak: 1,
      view: 5,
      take: 20,
      filter: {
        scanby: 'All',
        type: 'All',
        projectId: '',
        projectStatus: 'All',
        testProject: 'All',
        host: '',
        targetUrl: '',
        projectApproved: 'Yes',
        report_date: '',
        scheduled_before_date: '',
        scheduled_after_date: '',
        continuous_paid_before_date: '',
        continuous_paid_after_date: '',
        continuous_from_before_date: '',
        continuous_from_after_date: '',
        client: '',
        company: '',
      }
    }
  },
  watch: {
    page() {
      this.getPortalProjects();
    },
    take(value) {
      this.pageBreak = 1;
      this.page = 1;
      this.getPortalProjects();
    },
  },
  mounted() {
    this.getPortalProjects();
  },
  computed: {
    portalProjectTypes() {
      return this.$store.state.localStorage.portalProjectTypes;
    },
    pages() {
      let pages = 0;
      if (this.portalProjects && this.portalProjects.count && this.portalProjects.count > this.take) {
        let count = Math.floor(this.portalProjects.count / this.take);
        let last  = this.portalProjects.count % this.take;
        if (last > 0) {
          count++;
        }
        pages = count;
      }
      return pages;
    },
    ranges() {
      let ranges = [];
      if (this.pages > this.view) {
        let max = this.pageBreak * this.view;
        if (max > this.pages) {
          max = this.pages;
        }
        for (let i = ((this.pageBreak - 1) * this.view); i < max; i++) {
          ranges.push(i + 1);
        }
      } else {
        for (let i = 0; i < this.pages; i++) {
          ranges.push(i + 1);
        }
      }
      return ranges;
    },
    prev() {
      let prev = false;
      if (this.pageBreak > 1) {
        prev = true;
      }
      return prev;
    },
    next() {
      let next = false;
      if ((this.pages - (this.pageBreak * this.view)) > 0) {
        next = true;
      }
      return next;
    },
  },

  methods: {
    async getPortalProjects() {
        this.loadingStatus = false;
      let data  = {
        page: this.page,
        take: this.take
      };
      if (this.filter.scanby !== 'All') {
        data.scanby = this.filter.scanby;
      }
      if (this.filter.testProject !== 'All') {
        data.test = ['Yes'].includes(this.filter.testProject)?1:0;
      }
      if (this.filter.projectApproved !== 'All') {
        data.approved = ['Yes'].includes(this.filter.projectApproved);
      }
      if (this.portalProjectTypes && this.filter.type !== 'All') {
        let codes = [];
        this.portalProjectTypes.forEach(portalProjectType => {
          if (portalProjectType.title === this.filter.type) {
            codes.push(portalProjectType.code);
          }
        });
        data.type = codes;
      }
        if (this.filter.projectStatus !== '' && this.filter.projectStatus !== 'All') {
            data.status = this.filter.projectStatus;
        }
      if (this.filter.projectId.trim() !== '') {
        data.id = this.filter.projectId.trim();
      }
      if (this.filter.report_date && this.filter.report_date !== '') {
        data.dtreport = this.convertDate(this.filter.report_date);
      }
      if (this.filter.scheduled_after_date && this.filter.scheduled_after_date !== '') {
        data.dtshedule_after = this.convertDate(this.filter.scheduled_after_date);
      }
      if (this.filter.scheduled_before_date && this.filter.scheduled_before_date !== '') {
        data.dtshedule_before = this.convertDate(this.filter.scheduled_before_date);
      }
      if (this.filter.continuous_paid_after_date && this.filter.continuous_paid_after_date !== '') {
        data.dtjitpaid_after = this.convertDate(this.filter.continuous_paid_after_date);
      }
      if (this.filter.continuous_paid_before_date && this.filter.continuous_paid_before_date !== '') {
        data.dtjitpaid_before = this.convertDate(this.filter.continuous_paid_before_date);
      }
      if (this.filter.continuous_from_after_date && this.filter.continuous_from_after_date !== '') {
        data.dtjitfrom_after = this.convertDate(this.filter.continuous_from_after_date);
      }
      if (this.filter.continuous_from_before_date && this.filter.continuous_from_before_date !== '') {
        data.dtjitfrom_before = this.convertDate(this.filter.continuous_from_before_date);
      }
      if (this.filter.client.trim() !== '') {
        data.client = this.filter.client.trim();
      }
      if (this.filter.company.trim() !== '') {
        data.company = this.filter.company.trim();
      }
      if (this.filter.host.trim() !== '') {
        data.host = this.filter.host.trim();
      }
      if (this.filter.targetUrl.trim() !== '') {
        data.url = this.filter.targetUrl.trim();
      }
      this.portalProjects = await this.$store.dispatch('localStorage/portalProject_get', data);
        this.loadingStatus = true;
    },
    convertDate(date) {
      if (date) {
        return date.getFullYear() + '-' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('0' + date.getDate()).slice(-2)
      }
      return null;
    },
    changeFilter(filter) {
      this.page = 1;
      this.pageBreak = 1;
      this.filter = filter;
      this.getPortalProjects();
    }
  }
}
</script>

<style lang="scss">

</style>