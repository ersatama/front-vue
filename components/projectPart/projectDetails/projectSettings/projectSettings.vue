<script>
import {defineComponent} from 'vue'
import ProjectPartLoading from "@/components/modal/projectPartLoading.vue";
import portalProject from "@/repositories/Portal/portalProject/portalProject";

export default defineComponent({
    name: "projectSettings",
    components: {ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            data: null,
            pauseProjectUntil: '',
            approved: false,
            projectPaused: false
        }
    },
    computed: {
        show() {
            return this.$store.state.localStorage.projectSettings;
        },
        user() {
            return this.$store.state.localStorage.user;
        }
    },
    created() {
        this.getSettings();
    },
    methods: {
        async getSettings() {
            if (this.portalProject) {
                let settings = await this.$store.dispatch('localStorage/portalProject_getSettings', {
                    id: this.portalProject.id,
                    jit: this.portalProject.jit,
                    mobile: this.portalProject.mobile,
                    user: this.user.auditor.user,
                    auditor_id: this.user.auditor.id
                });
                if (settings) {
                    this.data = settings;
                    if (settings.portalProject.type < 1000) {
                        if (['30','40', 30, 40].includes(settings.portalProject.status) && settings.portalProject.scanby) {
                            this.approved = true;
                        } else {
                            this.approved = false;
                        }
                    }
                    if (settings.portalProject.pauseDt) {
                        this.pauseProjectUntil = settings.portalProject.pauseDt * 1000;
                        this.projectPaused = true;
                    } else {
                        this.pauseProjectUntil = '';
                        this.projectPaused = false;
                    }

                }
            }
        }
    }
})
</script>

<template>
  <div class="block-body-right">
      <div class="block-body-right-header">
          <div class="block-body-right-title">Project settings</div>
          <div class="block-body-right-desc">Project configuration</div>
          <div class="block-body-right-header-buttons">
            <button class="block-body-content-filter">
              <i class="block-body-content-filter-icon block-body-content-filter-icon-edit"></i> Edit
            </button>
              <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectSettings');"></div>
          </div>
      </div>
      <div class="block-body-content" :class="{'block-body-content-close':!show}">
          <div class="block-body-content-table" v-if="data">
              <div class="block-body-content-table-header">
                  <div class="block-body-content-table-tr">
                      <div class="block-body-content-table-item" style="width: 50%;">Project type</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                          <span v-if="portalProject && portalProject.portalProjectType">
                              <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template>
                              <template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template>
                              <template v-if="portalProject.rescan > 0"> Patch Verification</template>
                          </span>
                          <span v-if="!this.approved">(Unapproved)</span>
                          <span v-if="this.projectPaused">(Paused)</span>
                      </div>
                  </div>
                  <div class="block-body-content-table-tr">
                      <div class="block-body-content-table-item" style="width: 50%;">Responsible person</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                          <template v-if="portalProject.scanby">
                              <span v-if="data.portalProject.jit === 1 && data.portalProject.actualAuditor">{{ data.portalProject.actualAuditor.actualAuditor}}</span>
                              <span v-else>{{portalProject.scanby}}</span>
                          </template>
                          <template v-else>
                              <span>No responsible person</span>
                          </template>
                      </div>
                  </div>
                  <div class="block-body-content-table-tr" v-if="data.auditorHistory.length">
                      <div class="block-body-content-table-item">Auditor history</div>
                  </div>
                  <div class="block-body-content-table-tr" v-for="(auditorHistory, key) in data.auditorHistory" :key="key">
                      <div class="block-body-content-table-item" style="width: 50%;">{{ auditorHistory.auditor }}</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69);">
                          {{ auditorHistory.started_at }} / {{ auditorHistory.finished_at }}
                      </div>
                  </div>
                  <div class="block-body-content-table-tr" v-if="Object.keys(data.projComments).length">
                      <div class="block-body-content-table-item" style="width: 50%;">Comments</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69);">
                          <template v-for="(comment_data, comment_dt) in data.projComments">
                              <b>{{comment_dt}} {{comment_data['user']}}</b><br>
                              {{comment_data['comment']}}<br>
                          </template>
                      </div>
                  </div>
                  <div class="block-body-content-table-tr">
                      <div class="block-body-content-table-item" style="width: 50%;">Target url</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                        {{ data.portalProject.url }}
                        <template v-if="data.portalProject.subdomains"><br/> Subdomains allowed</template>
                        <template v-if="data.portalProject.virtualAppliance"><br/> Virtual Appliance is required </template>
                        <template v-if="data.portalProject.notifyCrit"><br/> Notify me before report delivery if a critical vulnerability is found </template>
                      </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Target host</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.host }}
                    </div>
                  </div>
                <template v-if="portalProject.jit !== 1">
                  <template v-if="data.portalProject.type < 1000 && Object.keys(data.prevProjects).length">
                    <div class="block-body-content-table-tr">
                      <div class="block-body-content-table-item" style="width: 50%;">Other projects</div>
                      <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                        <template v-for="(v,k) in data.prevProjects">
                          <NuxtLink  :to="'/dashboard/'+k" :key="k">#{{k}} {{v}}</NuxtLink>
                        </template>

                      </div>
                    </div>
                  </template>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Scan scheduled on</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.dtshedule }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr" v-if="data.portalProject.jobStartTime">
                    <div class="block-body-content-table-item" style="width: 50%;">Scan jobs starts on</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.jobStartTime.starttime }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Scan end on</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.reportDeliveryDate }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Report delivery on</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.reportDeliveryDate }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Active from</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.dtjitfrom }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Active from</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.dtjitfrom }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Active to</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.dtjitpaid_total }}
                    </div>
                  </div>
                </template>

                  <div class="block-body-content-table-tr" v-if="portalProject.mobile === 1">
                    <div class="block-body-content-table-item" style="width: 50%;">Application Platform</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      <template v-if="1 === portalProject.mobiletype">Android</template>
                      <template v-else-if="2 === portalProject.mobiletype">iOS</template>
                      <template v-else>Unknown</template>
                    </div>
                  </div>

                <div class="block-body-content-table-tr">
                  <div class="block-body-content-table-item" style="width: 50%;">Project owner</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ portalProject.portalUser.company }}
                  </div>
                </div>

                <template v-if="data.portalProject.testApi">
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Test API</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      <div>Yes</div>
                      <div v-if="data.portalProject.testApi.type_descr">{{ data.portalProject.testApi.type_descr }}</div>
                      <div v-if="data.portalProject.testApi.url">{{ data.portalProject.testApi.url }}</div>
                      <div v-if="data.portalProject.testApi.doc">{{ data.portalProject.testApi.doc }}</div>
                    </div>
                  </div>
                  <div class="block-body-content-table-tr" v-if="data.portalProject.testApiResults">
                    <div class="block-body-content-table-item" style="width: 50%;">Test API Results</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      <template v-if="data.portalProject.testApiResults.valid">{{ data.portalProject.testApiResults.valid.count ?? 0 }} url detected at last test at {{ data.portalProject.testApiResults.dt }}</template>
                      <template v-else>
                        Not valid api, last test at {{ data.portalProject.testApiResults.dt }}
                        <div>valid errors:</div>
                        <div>{{ data.portalProject.testApiResults.validErrors }}</div>
                        <div>system errors:</div>
                        <div>{{ data.portalProject.testApiResults.systemErrors }}</div>
                      </template>
                    </div>
                  </div>
                </template>

                <div class="block-body-content-table-tr" v-if="data.portalProject.addinfo">
                  <div class="block-body-content-table-item" style="width: 50%;">Additional Information</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.addinfo }}
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.techemail">
                  <div class="block-body-content-table-item" style="width: 50%;">Tech email</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.techemail }}
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.specreq">
                  <div class="block-body-content-table-item" style="width: 50%;">Special Requirements</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.specreq }}
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.excludeurls">
                  <div class="block-body-content-table-item" style="width: 50%;">Excluded URLs</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.excludeurls }}
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.needauthorization !== -1">
                  <div class="block-body-content-table-item" style="width: 50%;">Authentication Required</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    <span v-if="data.portalProject.needauthorization === 0">NO</span>
                    <span v-else>YES</span>
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.authtype !== -1">
                  <div class="block-body-content-table-item" style="width: 50%;">Authentication Method</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    <span v-if="data.portalProject.authtype === 0">HTTP (Basic, NTLM, Digest)</span>
                    <span v-if="data.portalProject.authtype === 1">WEB (Login Forms, OTP, etc)</span>
                    <span v-if="data.portalProject.authtype === 2">Client Certificate Authentication</span>
                    <span v-if="data.portalProject.authtype === 3">SSO (OAuth1.0 , OAuth2.0, OpenID, Other)</span>
                    <span v-if="data.portalProject.authtype === 4">Other</span>
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.loginurl">
                  <div class="block-body-content-table-item" style="width: 50%;">Loginurl</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.Loginurl }}
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.frw !== -1">
                  <div class="block-body-content-table-item" style="width: 50%;">WAF or IPS Presenc</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    <span v-if="data.portalProject.frw === 0">NO</span>
                    <span v-else>YES</span>
                  </div>
                </div>
                <div class="block-body-content-table-tr" v-if="data.portalProject.authtype === 2">
                  <div class="block-body-content-table-item" style="width: 50%;">Certificate password</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                    {{ data.portalProject.crtpassword }}
                  </div>
                </div>

                <template v-if="data.portalProject.authlogin !== '' && data.portalProject.authtype !== 2">
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Login</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.authlogin }}
                    </div>
                  </div>
                  <div class="block-body-content-table-tr">
                    <div class="block-body-content-table-item" style="width: 50%;">Password</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">
                      {{ data.portalProject.authpass }}
                      <template v-if="!data.portalProject.isPasswordTested">
                        <div style="color: #dc3545;" :title="data.portalProject.authpass.__tb"> NOT TESTED</div>
                      </template>
                      <template v-if="data.portalProject.isPasswordTested === 'TESTED'">
                        <div :title="data.portalProject.authpass.__tb"> TESTED</div>
                      </template>
                      <template v-if="data.portalProject.isPasswordTested === 'NOTWORK' || data.portalProject.isPasswordTested === 'NOTWORKED'">
                        <div style="color: #dc3545;" :title="data.portalProject.authpass.__tb"> NOTWORK</div>
                      </template>
                    </div>
                  </div>
                </template>

                <template v-if="data.portalProject.authlogins.length">
                  <div class="block-body-content-table-tr" v-for="(item, index) in data.portalProject.authlogins" :key="index">
                    <div class="block-body-content-table-item" style="width: 50%;">{{ item[0] }}</div>
                    <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px;">{{ item[1] }}</div>
                  </div>
                </template>

                <div class="block-body-content-table-tr" v-if="data.portalProject.authcomment">
                  <div class="block-body-content-table-item" style="width: 50%;">Authentication Comment</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px; white-space: pre-wrap; word-break: break-all">
                    {{ data.portalProject.authcomment }}
                  </div>
                </div>

                <div class="block-body-content-table-tr" v-if="data.portalProject.discountComment">
                  <div class="block-body-content-table-item" style="width: 50%;">Discount Comment</div>
                  <div class="block-body-content-table-item" style="width: 50%; color: rgb(40, 167, 69); display: flex; gap: 5px; white-space: pre-wrap; word-break: break-all">
                    {{ data.portalProject.discountComment }}
                  </div>
                </div>

                <!--
<tr v-if="data.oldProject.prop['discount_comment']">
                        <td><b>Discount Comment:</b></td>
                        <td><div style="word-break: break-word;">
                            {{data.oldProject.prop['discount_comment']}}
                        </div></td>
                    </tr>
                -->

              </div>
          </div>
          <project-part-loading v-else></project-part-loading>
      </div>
  </div>
</template>

<style>

</style>