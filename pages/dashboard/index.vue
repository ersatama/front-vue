<template>
  <div>
    <project-status></project-status>
    <div class="d-flex page">
      <div class="page-left">
        <div class="page-left-header">
          <div class="page-left-header-title text-muted">
            Найдено проекта: <span class="page-left-header-title-success"><template v-if="portalProjects.count">{{portalProjects.count}}</template><template v-esle>0</template></span>
          </div>
          <div class="page-left-header-pagination"></div>
        </div>
        <div class="page-left-list">
          <project-item v-for="(portalProject, key) in portalProjects.data" :key="key" :portalProject="portalProject"></project-item>
        </div>
      </div>
      <dashboard-filter></dashboard-filter>
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
      portalProjects: [],
      page: 1
    }
  },
  created() {
    this.getPortalProjects();
  },
  methods: {
    async getPortalProjects() {
      this.portalProjects = await this.$store.dispatch('localStorage/portalProject_get', this.page);
    }
  }
}
</script>

<style lang="scss">
  .page {
      gap: 25px;
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
        }
      }
    /*
    <div class="page-left-header">
          <div class="page-left-header-title">Найдено 1594 проекта</div>
          <div class="page-left-header-pagination"></div>
     */

  }
</style>