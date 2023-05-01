<template>
  <div class="item" v-if="portalProject">
    <div class="item-header">
      <div class="item-header-title">
        <NuxtLink :to="'/dashboard/'+portalProject.id">
          <div class="item-header-title-text" v-if="portalProject.portalProjectType">
              <template>
                  <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template>
                  <template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template>
                  <template v-if="portalProject.rescan > 0"> Patch Verification</template>
              </template>
              <span>#{{portalProject.id}}</span>
          </div>
        </NuxtLink>
        <div class="item-header-title-desc text-muted">
            <div class="item-alerts" v-if="portalProject.alerts">
                <div class="item-alert" v-for="(alert,key) in portalProject.alerts" :key="key">{{ alert }}</div>
            </div>
        </div>
      </div>
      <div class="item-header-detail">
        <div class="item-header-buttons">
          <button class="item-header-button bg bg-danger text-white">Report</button>
        </div>
        <div class="item-header-switcher" v-if="portalProject.portalJitReport">
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 3)}" @click="table = 3">
                Details
            </div>
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 4)}" @click="table = 4">
                Jobs
            </div>
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 1)}" @click="table = 1">
              Vuln <div class="item-header-switcher-item-count" v-if="portalProject.portalJitReport.vulns.length > 0">{{ portalProject.portalJitReport.vulns.length }}</div>
            </div>
            <div class="item-header-switcher-item" :class="{'item-header-switcher-item-sel':(table === 2)}" @click="table = 2">
              Drafts <div class="item-header-switcher-item-count" v-if="portalProject.portalJitReport.drafts.length > 0">{{ portalProject.portalJitReport.drafts.length }}</div>
            </div>
        </div>
      </div>
    </div>
    <div class="item-body">
      <div class="item-body-right">
          <template v-if="table === 1">
          <div class="item-body-right-table">
            <div class="item-body-right-table-header">
              <div class="item-body-right-table-item">Title</div>
              <div class="item-body-right-table-item">CWE-ID</div>
              <div class="item-body-right-table-item">Risk Level</div>
              <div class="item-body-right-table-item">Action</div>
            </div>
            <div class="item-body-right-table-body" v-if="portalProject.portalJitReport.vulns.length > 0">
              <div v-for="(vuln, key) in portalProject.portalJitReport.vulns" :key="key" :class="{'item-body-right-table-item-medium':(vuln.category === 'MEDIUM'),'item-body-right-table-item-critical':(vuln.category === 'CRITICAL'),'item-body-right-table-item-warning':(vuln.category === 'WARNING'),'item-body-right-table-item-low':(vuln.category === 'LOW'),'item-body-right-table-item-high':(vuln.category === 'HIGH')}">
                <div class="item-body-right-table-item">{{ vuln.title }}</div>
                <div class="item-body-right-table-item">{{ vuln.cwe }}</div>
                <div class="item-body-right-table-item">
                  <template v-if="vuln.cwe && vuln.cwe !== 'MAIN_WARNING'">
                    {{ warn(vuln.cvss) }}
                  </template>
                  {{ vuln.category }}
                </div>
                <div class="item-body-right-table-item">
                    <div class="item-body-right-table-item-option">
                        <div class="item-body-right-table-item-option-list">
                            <div class="item-body-right-table-item-option-list-angle"></div>
                            <div class="item-body-right-table-item-option-list-select">
                                <div class="item-body-right-table-item-option-list-select-item">Edit</div>
                                <div class="item-body-right-table-item-option-list-select-item">Delete</div>
                                <div class="item-body-right-table-item-option-list-select-item">Log</div>
                            </div>
                        </div>
                        <div class="item-body-right-table-item-option-dots"></div>
                    </div>
<!--                  <div class="item-body-right-table-item-btn">
                    <button class="btn-success">Edit</button>
                    <button class="btn-warning text-white">Delete</button>
                    <button class="btn-success">Log</button>
                  </div>-->
                </div>
              </div>
            </div>
            <div class="item-body-right-table-body" v-else>
              <div class="item-body-right-table-body-empty text-muted">No elements found</div>
            </div>
          </div>
        </template>
          <template v-else-if="table === 2">
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
        </template>
          <template v-else-if="table === 3">
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
                  </div>
              </div>
          </template>
          <template v-else-if="table === 4">
              <div class="item-body-left-table">
                  <div class="item-body-left-table-body">
                      <div class="item-body-right-table-body-empty text-muted">No jobs</div>
                  </div>
              </div>
          </template>
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
      table: 3
    }
  },
  methods: {
    warn(cvss) {
      if (cvss) {
        let num = parseFloat(cvss.substring(0,4));
        if (!isNaN(num)) {
          return num;
        }
      }
      return 0;
    },
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