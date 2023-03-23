<template>
  <div class="item" v-if="portalProject">
    <div class="item-header">
      <div class="item-header-title">
        <div class="item-header-title-text">#{{portalProject.id}}</div>
        <div class="item-header-title-desc text-muted" v-if="portalProject.portalProjectType">
          <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template><template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template><template v-if="portalProject.rescan > 0"> Patch Verification</template>
        </div>
      </div>
      <div class="item-header-detail">
        <div class="item-header-buttons">
          <button class="item-header-button bg bg-danger text-white">Report</button>
        </div>
        <div class="item-header-switcher">
          <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 1)}" @click="table = 1">Drafts</div>
          <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 2)}" @click="table = 2">Vuln</div>
        </div>
      </div>
    </div>
    <div class="item-alerts" v-if="portalProject.alerts">
      <div class="item-alert text-white" v-for="(alert,key) in portalProject.alerts" :key="key">{{ alert }}</div>
    </div>
    <div class="item-body">
      <div class="item-body-right">
        <div class="item-body-right-table">
          <div class="item-body-right-table-header">
            <div class="item-body-right-table-item">Title</div>
            <div class="item-body-right-table-item">CWE-ID</div>
            <div class="item-body-right-table-item">Risk Level</div>
            <div class="item-body-right-table-item">Action</div>
          </div>
          <div class="item-body-right-table-body">
            <div class="item-body-right-table-body-empty text-muted">No elements found</div>
          </div>
        </div>
      </div>
      <div class="item-body-left">
        <div class="item-body-left-table">
          <div class="item-body-left-table-switcher">
            <div class="item-body-left-table-switcher-item" :class="{'item-body-left-table-switcher-item-sel':(detail === 1)}" @click="detail = 1">Details</div>
            <div class="item-body-left-table-switcher-item" :class="{'item-body-left-table-switcher-item-sel':(detail === 2)}" @click="detail = 2">Jobs</div>
          </div>
          <div class="item-body-left-table-body">
            <template v-if="detail === 1">
              <div class="item-body-left-table-body-items">
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-scan"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Scan / Report Date</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalProp">{{ convertDate(portalProject.portalProp) }} / {{ portalProject.portalProp }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-manager"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Project manager</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.scanby">{{ portalProject.scanby }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-project"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Project Name</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.projname">{{ portalProject.projname }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-body-left-table-body-items">
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-project"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Active from/to Date</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.jit === 1">{{ portalProject.dtjitfrom }} / {{ portalProject.dtjitpaid_total }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-login"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Login</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.authlogin">{{ portalProject.authlogin }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-password"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Password</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.authpass">{{ portalProject.authpass }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-body-left-table-body-items">
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-user"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Client</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalUser">
                        <template v-if="portalProject.portalUser.tt">{{ portalProject.portalUser.tt }}</template> <template v-if="portalProject.portalUser.fname">{{ portalProject.portalUser.fname }}</template> <template v-if="portalProject.portalUser.lname">{{ portalProject.portalUser.lname }}</template>
                      </template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-company"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Company</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalUser && portalProject.portalUser.company">{{ portalProject.portalUser.company }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-position"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Position</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalUser && portalProject.portalUser.pos">{{ portalProject.portalUser.pos }}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-body-left-table-body-items">
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-email"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Email</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalUser && portalProject.portalUser.email">{{portalProject.portalUser.email}}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-link"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Url</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject && portalProject.url">
                        <a :href="portalProject.url" target="_blank">{{portalProject.url}}</a>
                      </template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div class="item-body-left-table-body-item">
                  <div class="item-body-left-table-body-icon item-body-left-table-body-icon-globe"></div>
                  <div class="item-body-left-table-body-detail">
                    <div class="item-body-left-table-body-detail-title text-muted">Country</div>
                    <div class="item-body-left-table-body-detail-desc">
                      <template v-if="portalProject.portalUser && portalProject.portalUser.countryName">{{portalProject.portalUser.countryName}}</template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="detail === 2">
              No jobs
            </template>
          </div>
        </div>
      </div>

    </div>
    <div class="item-footer" style="word-break: break-word; width: 980px;">

    </div>
  </div>
</template>

<script>
export default {
  name: "projectItem",
  props: ['portalProject'],
  data() {
    return {
      detail: 1,
      table: 1
    }
  },
  methods: {
    convertDate(date) {
      let dateArr = date.split('-');
      if (dateArr.length === 3) {
        return dateArr[2]+'.'+dateArr[1]+'.'+dateArr[0];
      }
      return date;
    }
  }
}
</script>

<style lang="scss">
  .item {
    min-height: 150px;
    background: #fff;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    position: relative;
    &-alerts {
      display: flex;
      font-size: 12px;
      gap: 15px;
    }
    &-alert {
      border-radius: 20px;
      background: #d18700;
      padding: 6px 12px 6px 12px;
      font-weight: bold;
    }
    &-header {
      display: flex;
      align-items: center;
      &-title {
        &-text {
          font-size: 20px;
          font-weight: bold;
        }
        &-desc {
          font-size: 12px;
        }
      }
      &-detail {
        margin-left: auto;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      &-buttons {
        display: flex;
        gap: 10px;
      }
      &-button {
        font-size: 12px;
        height: 34px;
        border: none;
        border-radius: 5px;
        padding: 0 15px 0 15px;
      }
      &-switcher {
        display: flex;
        font-size: 12px;
        background: #F1F4F8;
        padding: 5px;
        border-radius: 5px;
        font-weight: bold;
        gap: 5px;
        &-item {
          padding: 8px 16px 8px 16px;
          color: #6c757d;
          border-radius: 2px;
          cursor: pointer;
          &:hover, &-sel {
            background: #fff;
            color: #0b76a6;
          }
        }
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      gap: 25px;
      & > div {
        flex-grow: 1;
      }
      &-left {
        &-table {
          display: flex;
          flex-direction: column;
          &-switcher {
            display: flex;
            font-size: 12px;
            gap: 5px;
            padding: 5px;
            background: #F1F4F8;
            border-radius: 5px 5px 0 0;
            &-item {
              flex-grow: 1;
              text-align: center;
              border-radius: 2px;
              padding: 8px 16px 8px 16px;
              color: #6c757d;
              font-weight: bold;
              cursor: pointer;
              &:hover, &-sel {
                background: #fff;
                color: #0b76a6;
              }
            }
          }
          &-body {
            border: 2px solid #F1F4F8;
            border-top: none;
            border-radius: 0 0 5px 5px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            &-icon {
              width: 16px;
              min-width: 16px;
              height: 16px;
              background: no-repeat center;
              background-size: contain;
              &-user {
                background-image: url('/images/icons/user-mini.png');
              }
              &-company {
                background-image: url('/images/icons/company.png');
              }
              &-position {
                background-image: url('/images/icons/briefcase.png');
              }
              &-email {
                background-image: url('/images/icons/email.png');
              }
              &-mobile {
                background-image: url('/images/icons/call.png');
              }
              &-edit {
                background-image: url('/images/icons/pen.png');
              }
              &-scan {
                background-image: url('/images/icons/analytics.png');
              }
              &-project {
                background-image: url('/images/icons/layers.png');
              }
              &-manager {
                background-image: url('/images/icons/manager.png');
              }
              &-configure {
                background-image: url('/images/icons/configure.png');
              }
              &-login {
                background-image: url('/images/icons/login.png');
              }
              &-password {
                background-image: url('/images/icons/locked.png');
              }
              &-globe {
                background-image: url('/images/icons/world.png');
              }
              &-link {
                background-image: url('/images/icons/link.png');
              }
            }
            &-detail {
              font-size: 12px;

              &-title {

              }
              &-desc {
                font-weight: bold;
                word-break: break-all;
              }
            }
            &-items {
              display: flex;
              gap: 15px;
              & > div {
                flex-grow: 1;
                flex-basis: 0
              }
            }
            &-item {
              display: flex;
              align-items: center;
              gap: 15px;
            }
          }
        }
      }
      &-right {
        &-table {
          width: 100%;
          border: 2px solid #F1F4F8;
          border-radius: 5px;
          font-size: 12px;
          &-header {
            display: flex;
            & > div {
              flex-grow: 1;
            }
            font-weight: bold;
            color: #0b76a6;
          }
          &-body {
            &-empty {
              text-align: center;
              font-size: 12px;
              padding: 15px 0 15px 0;
              border-top: 2px solid #F1F4F8;
            }
          }
          &-item {
            padding: 15px;
            border-right: 2px solid #F1F4F8;
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
    &-footer {

    }
  }
</style>