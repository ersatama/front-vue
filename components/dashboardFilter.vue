<template>
  <div class="filter bg-white">
    <div class="filter-title d-flex align-items-center">
      Filters <div class="filter-reset"></div>
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
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Project ID:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Test project:</div>
        <div class="filter-item-input">
          <select>
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
            <input type="text" list="hosts">
            <datalist id="hosts">
              <option v-for="(host,key) in hosts" :key="key">{{ host }}</option>
            </datalist>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Target URL:</div>
          <div class="filter-item-input">
            <input type="text" list="urls">
            <datalist id="urls">
              <option v-for="(url,key) in urls" :key="key">{{ url }}</option>
            </datalist>
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Project approved:</div>
        <div class="filter-item-input">
          <select>
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
            <datepicker v-model="scheduled_before_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'before date'"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Scheduled:</div>
          <div class="filter-item-input">
            <datepicker v-model="scheduled_after_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'after date'"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous paid:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_paid_before_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'before date'"></datepicker>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous paid:</div>
          <div class="filter-item-input">
            <datepicker v-model="continuous_paid_after_date" :input-class="'filter-item-input-date'" :clear-button="true" :placeholder="'after date'"></datepicker>
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous from:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="date before">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous from:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="date after">
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
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Company:</div>
          <div class="filter-item-input">
            <input type="text" list="companies">
            <datalist id="companies">
              <option v-for="(company,key) in companies" :key="key">{{ company }}</option>
            </datalist>
          </div>
        </div>
      </div>
      <button class="filter-item-btn btn btn-primary text-white">Поиск</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  name: "dashboardFilter",
  components: {
    Datepicker
  },
  data() {
    return {
      scanby: 'All',
      type: 'All',
      report_date: '',
      scheduled_date: '',
      scheduled_before_date: '',
      scheduled_after_date: '',
      continuous_paid_before_date: '',
      continuous_paid_after_date: '',
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
  }
}
</script>

<style lang="scss">
.filter {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  padding: 25px;
  border-radius: 10px;
  height: fit-content;
  &-reset {
    background: url(/images/icons/undo.png) no-repeat center;
    width: 24px;
    height: 24px;
    margin-left: auto;
  }
  &-title {
    font-size: 16px;
    font-weight: bold;
  }
  &-options {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
  }
  &-item {
    width: 100%;
    &-btn {
      font-size: 14px;
      font-weight: bold;
      height: 40px;
      margin: 10px 0 0 0;
      border-radius: 5px;
    }
    &-double {
      display: flex;
      gap: 15px;
    }
    position: relative;
    &-title {
      font-size: 12px;
      font-weight: bold;
      pointer-events: none;
      margin-bottom: 5px;
    }
    &-input {
      border-radius: 5px;
      height: 36px;
      width: 100%;
      background: #F1F4F8;
      & > input, & > select {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        padding: 0 10px 0 10px;
        font-size: 12px;
        outline: none;
      }
      &-date {
        border: none;
        background: transparent;
        width: 142px;
        max-width: 142px;
        padding: 0 10px 0 10px;
        font-size: 12px;
        outline: none;
        height: 36px;
      }
    }
  }
}
.vdp-datepicker__calendar {
  background: #fff;
  width: 300px;
  border-radius: 5px;
  border: none !important;
  box-shadow: 0 0 3px 2px #f1f4f8;
  padding: 10px;
  right: 0;
  & > div {
    & > span {
      font-size: 12px;
      font-weight: bold;
      color: #6c757d;
    }
  }
}
.today {
  color: #0b76a6 !important;
  background: #c4e0ed !important;
  border: 1px solid #0b76a6 !important;
}
.vdp-datepicker__clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0,-50%);
}
</style>