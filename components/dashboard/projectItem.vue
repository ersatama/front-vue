<template>
  <div class="item" v-if="portalProject" :class="{'item-hide':!show}">
    <div class="item-header">
        <div class="item-header-icon">
            <div>{{portalProject.status}}</div>
        </div>
      <div class="item-header-title">
        <NuxtLink :to="'/dashboard/'+portalProject.id">
          <div class="item-header-title-text" v-if="portalProject.portalProjectType">
              <span>#{{portalProject.id}}</span>
              <span v-if="portalProject.url" class="item-header-title-url">{{portalProject.url}}</span>
              <span v-if="portalProject.projname" class="item-header-title-projname">{{portalProject.projname}}</span>
              <span class="item-header-title-auditor">{{portalProject.scanby}}</span>
          </div>
        </NuxtLink>
        <div class="item-header-title-desc">
            <template v-if="portalProject.portalProjectType">
                <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template>
                <template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template>
                <template v-if="portalProject.rescan > 0"> Patch Verification</template>
            </template>
        </div>
          <div class="item-alerts" v-if="portalProject.alerts">
              <div class="item-alert" v-for="(alert,key) in portalProject.alerts" :key="key" :class="{'item-alert-danger': (alert === 'Has stopped jobs')}">{{ alert }}</div>
          </div>
      </div>
      <div class="item-header-detail">
          <div class="item-header-detail-buttons">
              <template v-if="portalProject.type < 3000">
                  <div class="item-header-detail-button" :style="projectStatusStyle">
                      <template v-if="portalProject.jit === 0">
                          <template v-if="portalProject.hasOwnProperty('reportStatus')">
                              <template v-if="portalProject.reportStatus === 'blue'">
                                  <i class="block-body-content-filter-icon block-body-content-filter-icon-play"></i>
                              </template>
                              <template v-else-if="portalProject.reportStatus === 'orange'">
                                  <template v-if="(portalProject.projectReportStatuses && portalProject.projectReportStatuses.length > 0) && (portalProject.notFinishedUsers && portalProject.notFinishedUsers.length === 0) && (portalProject.allApproved && !portalProject.allApproved)">
                                      <i class="block-body-content-filter-icon block-body-content-filter-icon-tick" title="Finished by all"></i>
                                  </template>
                                  <template v-if="portalProject.projectReportStatus === 1">
                                      <i class="block-body-content-filter-icon block-body-content-filter-icon-check" title="Approved by all"></i>
                                  </template>
                                  <template v-if="portalProject.projectReportStatus === 0 && portalProject.SEND_TO_READ_BY_AUDITORS">
                                      <template v-if="portalProject.allApproved">
                                          <i class="block-body-content-filter-icon block-body-content-filter-icon-check" title="Approved by all"></i>
                                      </template>
                                      <template v-else>
                                          <i class="block-body-content-filter-icon block-body-content-filter-icon-exclamation" title="Not approved by all auditors"></i>
                                      </template>
                                  </template>
                              </template>
                          </template>
                      </template>
                      Report
                      <i class="block-body-content-filter-icon block-body-content-filter-icon-message" v-if="portalProject.portalProp" :title="portalProject.portalProp"></i>
                  </div>
              </template>
              <template v-else-if="portalProject.mobile === 1">
                  <div class="item-header-detail-button">Mobile Portal</div>
              </template>
          </div>
        <div class="item-header-switcher" v-if="portalProject.portalJitReport">
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 3)}" @click="table = 3">
                Details
            </div>
            <NuxtLink class="item-header-switcher-item" :to="'/dashboard/' + portalProject.id + '?tab=scan_jobs'">
                Jobs <div class="item-header-switcher-item-count" v-if="portalProject.scanjobs > 0">{{ portalProject.scanjobs }}</div>
            </NuxtLink>
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 1)}" @click="table = 1">
              Vuln <div class="item-header-switcher-item-count" v-if="portalProject.portalJitReport.vulns > 0">{{ portalProject.portalJitReport.vulns }}</div>
            </div>
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 2)}" @click="table = 2">
              Drafts <div class="item-header-switcher-item-count" v-if="portalProject.portalJitReport.drafts > 0">{{ portalProject.portalJitReport.drafts }}</div>
            </div>
            <div class="item-header-switcher-item" style="background: transparent;" @click="show = !show">
                <div class="item-header-switcher-item-hide" :class="{'item-header-switcher-item-hide-show':show}"></div>
            </div>
        </div>
      </div>
    </div>
    <div class="item-body">
        <project-vulns v-if="table === 1" :portalProject="portalProject"></project-vulns>
        <project-drafts v-if="table === 2" :portalProject="portalProject"></project-drafts>
        <template v-else-if="table === 3">
            <div class="item-body-right">
                <div class="item-body-left-table">
                    <div class="item-body-left-table-body">
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
                        </div>
                        <div class="item-body-left-table-body-items">
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
                        </div>
                        <div class="item-body-left-table-body-items">
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
                    </div>
                </div>
            </div>
        </template>
    </div>
  </div>
</template>

<script>
import ProjectVulns from "./projectVulns.vue";
import ProjectDrafts from "./projectDrafts.vue";

export default {
  name: "projectItem",
    components: {ProjectDrafts, ProjectVulns},
  props: ['portalProject'],
  data() {
    return {
      detail: 1,
      table: 3,
        show: false,
    }
  },
    computed: {
      user() {
          return this.$store.state.localStorage.user;
      },
        reportcheck() {
            let status = false;
            if (this.user && this.user.auditor && this.user.auditor.access) {
                let accesses    =   this.user.auditor.access.split(',');
                if (accesses.includes('reportcheck')) {
                    status = true;
                }
            }
            return status;
        },
        projectStatusStyle() {
            let projectStatusStyle  =   {};
            if (this.portalProject) {
                if (this.portalProject.jit === 0) {
                    if (this.portalProject.reportStatus) {
                        projectStatusStyle.backgroundColor  =   this.portalProject.reportStatus;
                    }
                } else if (this.portalProject.jit === 1) {
                    projectStatusStyle.backgroundColor  =   'green';
                }
            }
            return projectStatusStyle;
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

</style>