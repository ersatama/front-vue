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
        <div class="page-left-list">
          <project-item v-for="(portalProject, key) in portalProjects.data" :key="key" :portalProject="portalProject"></project-item>
        </div>
      </div>
      <dashboard-filter :filter="filter" @changeFilter="changeFilter"></dashboard-filter>
    </div>
  </div>
</template>

<script>
import ProjectStatus from "../../components/projectStatus.vue";
import ProjectItem from "../../components/projectItem.vue";
import DashboardFilter from "../../components/dashboardFilter.vue";

export default {
  components: {DashboardFilter, ProjectItem, ProjectStatus},
  layout: 'admin',
  name: "index",
  data() {
    return {
      portalProjects: null,
      page: 1,
      pageBreak: 1,
      view: 5,
      take: 20,
      filter: {
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
      if (this.filter.projectId.trim() !== '') {
        data.id = this.filter.projectId.trim();
      }
      if (this.filter.report_date && this.filter.report_date !== '') {
        data.dtreport = this.convertDate(this.filter.report_date);
      }
      if (this.filter.scheduled_date && this.filter.scheduled_date !== '') {
        data.dtshedule = this.convertDate(this.filter.scheduled_date);
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
      if (this.filter.projectStatus.trim() !== '') {
        data.status = this.filter.projectStatus.trim();
      }
      if (this.filter.host.trim() !== '') {
        data.host = this.filter.host.trim();
      }
      if (this.filter.targetUrl.trim() !== '') {
        data.url = this.filter.targetUrl.trim();
      }
      this.portalProjects = await this.$store.dispatch('localStorage/portalProject_get', data);
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
  .page {
      gap: 25px;
      max-width: 1400px;
      margin: 0 auto 0 auto;
      &-info {
        display: flex;
        background: #fff;
        border-radius: 10px;
        margin-bottom: 25px;
        &-items {
          flex-grow: 1;
          & > div:first-child {
            padding-top: 25px;
          }
          & > div:last-child {
            padding-bottom: 25px;
          }
          &:first-child {
            & > div {
              padding-left: 25px;
            }
          }
          &:last-child {
            & > div {
              padding-right: 25px;
            }
          }
        }
        &-item {
          border-right: 1px solid #F1F4F8;
          border-bottom: 1px solid #F1F4F8;
          padding: 10px;
          gap: 10px;
          &-icon {
            width: 32px;
            height: 32px;
            background: no-repeat center;
            background-size: contain;
            &-warning {
              background-image: url("/images/icons/warning.png");
            }
            &-database {
              background-image: url("/images/icons/database.png");
            }
            &-locked {
              background-image: url("/images/icons/lock.png");
            }
            &-info {
              background-image: url("/images/icons/info.png");
            }
            &-refresh {
              background-image: url("/images/icons/refresh.png");
            }
            &-mobile {
              background-image: url("/images/icons/mobile.png");
            }
            &-file {
              background-image: url("/images/icons/file.png");
            }
            &-pause {
              background-image: url("/images/icons/pause.png");
            }
            &-network {
              background-image: url("/images/icons/network.png");
            }
          }
          &-header {
            display: flex;
            align-items: center;
            flex-grow: 1;
          }
          &-title {
            font-size: 14px;
          }
          &:last-child {
            border-bottom: none;
          }
          &-count {
            margin-left: auto;
            gap: 10px;
            display: flex;
            & > div {
              padding: 3px 10px 3px 10px;
              border-radius: 5px;
              display: flex;
              align-items: center;
              font-size: 15px;
              font-weight: bold;
            }
            &-danger {
              color: #dc3545;
              background: rgb(249, 211, 215);
            }
            &-success {
              color: #28a745;
              background: #c8f1d2;
            }
          }
        }
      }
      &-left {
          flex-grow: 3;
        &-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin: 25px 0 0 0;
        }
        &-header {
          background: #fff;
          border-radius: 10px;
          padding: 25px;
          display: flex;
          align-items: center;
          &-next, &-prev {
            background: #f9d3d7 url('/images/icons/next.png') no-repeat center !important;
          }
          &-prev {
            transform: rotate(180deg);
          }
          &-title {
            display: flex;
            align-items: center;
            &-success {
              padding: 3px 10px 3px 10px;
              border-radius: 5px;
              display: flex;
              align-items: center;
              font-size: 15px;
              font-weight: bold;
              color: #28a745;
              background: #c8f1d2;
              margin-left: 15px;
            }
          }
          &-detail {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 15px;
          }
          &-pagination {
            display: flex;
            gap: 10px;
            font-size: 12px;
            font-weight: bold;
          }
          &-pages {
            background: #F1F4F8;
            color: #6c757d;
            border-radius: 20px;
            height: 36px;
            width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover, &-selected {
              color: #28a745;
              background: #c8f1d2;
            }
          }
          &-take {
            & > select {
              border: none;
              padding: 0 10px 0 10px;
              outline: none;
              background: #F1F4F8;
              height: 36px;
              border-radius: 5px;
              font-size: 12px;
            }
          }
        }
      }
    /*
    <div class="page-left-header">
          <div class="page-left-header-title">Найдено 1594 проекта</div>
          <div class="page-left-header-pagination"></div>
     */

  }
</style>