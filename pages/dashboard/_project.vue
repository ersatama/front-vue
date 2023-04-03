<template>
  <div class="block">
    <div class="block-title">Project {{ projectId }}</div>
    <div class="block-body">
      <div class="block-body-left">
        <NuxtLink :to="'/dashboard/' + projectId">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 0)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-detail"></div> <span>Details</span> <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=alerts'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 1)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-warning"></div> Alerts <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=reports'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 2)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-analysis"></div> Raw reports <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=scan_jobs'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 3)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-bag"></div> Scan Jobs <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + projectId + '?tab=sitemaps'">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 4)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-website"></div> Site maps <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
      </div>
      <div class="block-body-right">
        <template v-if="tab === 0">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Profile</div>
            <div class="block-body-right-desc">Edit your profile</div>
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
                    <div class="block-body-content-item-detail-desc" v-if="portalProject.portalUser.email">{{portalProject.portalUser.email}}</div>
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
            <div class="block-body-right-title">Settings</div>
            <div class="block-body-right-desc">Customize your interface</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Language</div>
                <div class="block-body-content-form-item-content">
                  <select>
                    <option>English</option>
                    <option>Russian</option>
                  </select>
                </div>
              </div>
              <div class="block-body-content-form-switcher">
                <div class="block-body-content-form-switcher-title">Night mode</div>
                <div class="block-body-content-form-switcher-status" :class="{'block-body-content-form-switcher-status-active':mode}" @click="mode = !mode"><div class="block-body-content-form-switcher-status-in"></div></div>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
        <template v-else-if="tab === 2">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Notifications</div>
            <div class="block-body-right-desc">History of alerts, notifications, logs</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Alias</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="alias">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Name</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Surname</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="surname">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Last name</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="last_name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Email</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" readonly v-model="email">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <button class="block-body-content-form-item-button">Save</button>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
        <template v-else-if="tab === 3">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Security</div>
            <div class="block-body-right-desc">Manage access to your account</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Current password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="alias">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">New password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Repeat new password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="surname">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <button class="block-body-content-form-item-button">Save</button>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ExtraProfileContent from "../../components/extraProfileContent.vue";

export default {
  components: {ExtraProfileContent},
  layout: 'admin',
  name: "_project",
  data() {
    return {
      alias: '',
      name: '',
      surname: '',
      last_name: '',
      email: '',
      mode: false,
      portalProject: null
    }
  },
  computed: {
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
        if (query === 'alerts') {
          tab = 1;
        } else if (query === 'reports') {
          tab = 2;
        } else if (query === 'scan_jobs') {
          tab = 3;
        } else if (query === 'sitemaps') {
          tab = 4;
        }
      }
      return tab;
    }
  },
  mounted() {
    this.getProjectById();
  },
  methods: {
    async getProjectById() {
      let project = await this.$store.dispatch('localStorage/portalProject_firstById', this.projectId);
      if (project.data) {
        this.portalProject  = project.data;
      }
    }
  }
}
</script>

<style scoped>

</style>