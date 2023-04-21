<template>
  <div class="block">
    <modal-box v-if="portalProject" :modal="filterModal" @closeModal="filterModal = false">
      <raw-report-filter :project="portalProject" @setFilter="setFilter" @closeModal="filterModal = false"></raw-report-filter>
    </modal-box>
    <div class="block-title"><span>Project</span> #{{ projectId }}</div>
    <div class="block-body" v-if="portalProject">
      <div class="block-body-left">
        <NuxtLink :to="'/dashboard/' + projectId">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 0)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-detail"></div> <span>Details</span> <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=reports'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 1)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-analysis"></div>
            Raw reports
            <div class="block-body-left-item-count-double" v-if="links && links.neuron_raw_reports">
              <div class="block-body-left-item-count-double-first" v-if="links.neuron_raw_reports.newReports && links.neuron_raw_reports.newReports > 0">{{ links.neuron_raw_reports.newReports }}</div>
              <div class="block-body-left-item-count-double-last" v-if="links.neuron_raw_reports.newReports && links.neuron_raw_reports.allReports > 0">{{ links.neuron_raw_reports.allReports }}</div>
            </div>
            <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=alerts'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 2)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-warning"></div> Alerts <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=scan_jobs'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 3)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-bag"></div>
            Scan Jobs
            <div class="block-body-left-item-count" v-if="links && links.scanjobs && links.scanjobs > 0">{{ links.scanjobs }}</div>
            <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=sitemaps'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 4)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-website"></div>
            Site maps
            <div class="block-body-left-item-count" v-if="links && links.sitemaps && Object.entries(links.sitemaps).length > 0">{{ Object.entries(links.sitemaps).length }}</div>
            <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=unpatched'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 5)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-unpatched"></div>
            Unpatched
            <div class="block-body-left-item-count" v-if="links && links.unpatched">{{ links.unpatched }}</div>
            <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=tasks'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 6)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-tasks"></div>
                Tasks
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=rawbase'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 7)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-rawbase"></div>
                All rawbase
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
      </div>
      <div class="block-body-right" >
        <template v-if="tab === 0">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Project details</div>
            <div class="block-body-right-desc" v-if="portalProject.portalProjectType">
              <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template><template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template><template v-if="portalProject.rescan > 0"> Patch Verification</template>
            </div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-data" v-if="portalProject">
              <div class="block-body-content-data-list">
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-layer"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Project type</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalProjectType">
                      <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template><template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template><template v-if="portalProject.rescan > 0"> Patch Verification</template>
                    </div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-profile"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Responsible person</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.scanby">
                      {{ portalProject.scanby }}
                    </div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-web"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Target host</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.host">{{ portalProject.host }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-link"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Target url</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.url">{{ portalProject.url }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
              </div>
              <div class="block-body-content-data-list">
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Scan scheduled on</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.dtshedule">{{ portalProject.dtshedule }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Scan jobs starts on</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.starttime">{{ portalProject.starttime }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Scan end on</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalProp">{{ portalProject.portalProp }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Report delivery on</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalProp">{{ portalProject.portalProp }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
              </div>
              <div class="block-body-content-data-list">
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-key"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Project owner</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalUser">
                      <template v-if="portalProject.portalUser.tt">{{ portalProject.portalUser.tt }}</template> <template v-if="portalProject.portalUser.fname">{{ portalProject.portalUser.fname }}</template> <template v-if="portalProject.portalUser.lname">{{ portalProject.portalUser.lname }}</template><template v-if="portalProject.portalUser.company"> <span style="color: #6c757d;"> /</span> {{ portalProject.portalUser.company }}</template>
                    </div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-copy"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Technical Documentation Attachments</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.docfilereal">{{portalProject.docfilereal}}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-email"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Tech email</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalUser && portalProject.portalUser.email">{{portalProject.portalUser.email}}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-writing"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Special Requirements</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.specreq">{{ portalProject.specreq }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
              </div>
              <div class="block-body-content-data-list">
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-auth"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Authentication Required</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.needauthorization === 0">NO</div>
                    <div class="block-body-content-item-detail-desc" v-else>YES</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-auth-method"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Authentication Method</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.authtype !== -1">
                      <template v-if="portalProject.authtype === 0">
                        HTTP (Basic, NTLM, Digest)
                      </template>
                      <template v-else-if="portalProject.authtype === 1">
                        WEB (Login Forms, OTP, etc)
                      </template>
                      <template v-else-if="portalProject.authtype === 2">
                        Client Certificate Authentication
                      </template>
                      <template v-else-if="portalProject.authtype === 3">
                        SSO (OAuth1.0 , OAuth2.0, OpenID, Other)
                      </template>
                      <template v-else-if="portalProject.authtype === 4">
                        Other
                      </template>
                    </div>
                    <div class="block-body-content-item-detail-desc" v-else>Yes</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-ips"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">WAF or IPS Presence</div>
                    <template v-if="portalProject.frw !== -1">
                      <div class="block-body-content-item-detail-desc" v-if="portalProject.frw === 0">NO</div>
                      <div class="block-body-content-item-detail-desc" v-else>Yes</div>
                    </template>
                    <div class="block-body-content-item-detail-desc" v-else>Yes</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-file"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Filename</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.authtype > 0">
                      <template v-if="portalProject.crtsysfilename">{{ portalProject.crtsysfilename }}</template>
                      <template v-else>-</template>
                    </div>
                    <div class="block-body-content-item-detail-desc" v-else>Yes</div>
                  </div>
                </div>
              </div>
              <div class="block-body-content-data-list">
                <template v-if="portalProject.authlogin && portalProject.authtype !== 2">
                  <div class="block-body-content-item">
                    <div class="block-body-content-item-icon block-body-content-item-icon-login"></div>
                    <div class="block-body-content-item-detail">
                      <div class="block-body-content-item-detail-title">Login</div>
                      <div class="block-body-content-item-detail-desc" v-if="portalProject.authlogin">{{ portalProject.authlogin }}</div>
                      <div class="block-body-content-item-detail-desc" v-else>-</div>
                    </div>
                  </div>
                  <div class="block-body-content-item">
                    <div class="block-body-content-item-icon block-body-content-item-icon-password"></div>
                    <div class="block-body-content-item-detail">
                      <div class="block-body-content-item-detail-title">Password</div>
                      <div class="block-body-content-item-detail-desc" v-if="portalProject.authpass">
                        {{ portalProject.authpass }}
                        <span v-if="portalProject.isPasswordTested">{{ portalProject.isPasswordTested.value }}</span>
                      </div>
                      <div class="block-body-content-item-detail-desc" v-else>-</div>
                    </div>
                  </div>
                </template>
                <div class="block-body-content-item" v-if="portalProject.authtype === 2">
                  <div class="block-body-content-item-icon block-body-content-item-icon-password"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Certificate password</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.crtpassword">{{ portalProject.crtpassword }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
                <div class="block-body-content-item">
                  <div class="block-body-content-item-icon block-body-content-item-icon-comment"></div>
                  <div class="block-body-content-item-detail">
                    <div class="block-body-content-item-detail-title">Authentication Comment</div>
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.authcomment">{{ portalProject.authcomment }}</div>
                    <div class="block-body-content-item-detail-desc" v-else>-</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </template>
        <template v-else-if="tab === 1">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Raw reports</div>
            <div class="block-body-right-desc">Neuron raw reports</div>
            <div class="block-body-right-header-buttons">
              <button class="block-body-content-vuln"><i class="block-body-content-filter-icon block-body-content-filter-icon-vuln"></i> New vuln</button>
              <button class="block-body-content-report"><i class="block-body-content-filter-icon block-body-content-filter-icon-graph"></i> Report</button>
              <button class="block-body-content-filter" @click="filterModal = true"><i class="block-body-content-filter-icon"></i> Filter</button>
            </div>
          </div>
          <div class="block-body-content">
            <project-raw-report :portalProject="portalProject" :links="linksRawReport" :filter="filter"></project-raw-report>
          </div>
        </template>
        <template v-else-if="tab === 2">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Alerts</div>
            <div class="block-body-right-desc">Project alerts</div>
          </div>
          <div class="block-body-content">

          </div>
        </template>
        <template v-else-if="tab === 3">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Scan jobs</div>
            <div class="block-body-right-desc">Project scan jobs</div>
            <div class="block-body-right-header-buttons">
              <button class="block-body-content-filter"><i class="block-body-content-filter-icon block-body-content-filter-icon-pie"></i> Report</button>
              <button class="block-body-content-report"><i class="block-body-content-filter-icon block-body-content-filter-icon-vuln"></i> New vuln</button>
              <button class="block-body-content-report"><i class="block-body-content-filter-icon block-body-content-filter-icon-vuln"></i> Alert processes page</button>
              <button class="block-body-content-vuln"><i class="block-body-content-filter-icon block-body-content-filter-icon-add"></i> Create new scanjob</button>
            </div>
          </div>
          <div class="block-body-content">
            <project-scan-jobs :portalProject="portalProject"></project-scan-jobs>
          </div>
        </template>
        <template v-else-if="tab === 4">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Sitemaps</div>
            <div class="block-body-right-desc">Project sitemaps</div>
          </div>
          <div class="block-body-content">
            <project-sitemap :links="links"></project-sitemap>
          </div>
        </template>
        <template v-else-if="tab === 5">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Unpatched</div>
            <div class="block-body-right-desc">Project details</div>
          </div>
          <div class="block-body-content">
            <project-unpatched :portalProject="portalProject"></project-unpatched>
          </div>
        </template>
        <template v-else-if="tab === 6">
          <div class="block-body-right-header">
              <div class="block-body-right-title">Tasks</div>
              <div class="block-body-right-desc">Project tasks</div>
          </div>
          <div class="block-body-content">
            <project-tasks :portalProject="portalProject"></project-tasks>
          </div>
        </template>
        <template v-else-if="tab === 7">
            <div class="block-body-right-header">
                <div class="block-body-right-title">All rawbase</div>
                <div class="block-body-right-desc">Project tasks</div>
            </div>
            <div class="block-body-content">
                <project-rawbase :portalProject="portalProject"></project-rawbase>
            </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ExtraProfileContent from "../../components/extraProfileContent.vue";
import ProjectRawReport from "../../components/projectRawReport.vue";
import ModalBox from "../../components/modalBox.vue";
import RawReportFilter from "../../components/rawReportFilter.vue";
import ProjectSitemap from "../../components/projectSitemap.vue";
import ProjectScanJobs from "../../components/projectScanJobs.vue";
import ProjectUnpatched from "../../components/projectUnpatched.vue";
import ProjectTasks from "../../components/projectTasks.vue";
import ProjectRawbase from "../../components/projectRawbase.vue";

export default {
  components: {
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
      filterModal: false,
      links: null,
      filter: {
        target: "all",
        service: "All",
        status: "ALL",
        draft: "ALL",
        search: ''
      },
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
    setFilter(filter) {
      this.filter = filter;
    },
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