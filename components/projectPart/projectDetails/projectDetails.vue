<template>
    <div class="block-body-right" >
        <div class="block-body-right-header">
            <div class="block-body-right-title">Project details</div>
            <div class="block-body-right-desc" v-if="portalProject.portalProjectType">
                <template v-if="portalProject.portalProjectType.title">{{portalProject.portalProjectType.title}}</template><template v-if="portalProject.portalProjectType.name"> {{portalProject.portalProjectType.name}}</template><template v-if="portalProject.rescan > 0"> Patch Verification</template>
            </div>
            <div class="block-body-right-header-buttons">
                <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleDetails');"></div>
            </div>
        </div>
        <div class="block-body-content" :class="{'block-body-content-close':!show}">
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
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.scanby" :title="portalProject.scanby">
                                {{ portalProject.scanby }}
                            </div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-web"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Target host</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.host" :title="portalProject.host">{{ portalProject.host }}</div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-link"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Target url</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.url">
                                {{ portalProject.url }}
                                <div class="block-body-content-item-detail-info">
                                    <div class="block-body-content-item-detail-info-angle"></div>
                                    <div class="block-body-content-item-detail-info-main">{{ portalProject.url }}</div>
                                </div>
                            </div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                </div>
                <div class="block-body-content-data-list">
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Scan scheduled on</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.dtshedule" :title="portalProject.dtshedule">{{ portalProject.dtshedule }}</div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Scan jobs starts on</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.starttime" :title="portalProject.starttime">{{ portalProject.starttime }}</div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Scan end on</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.portalProp" :title="portalProject.portalProp">{{ portalProject.portalProp }}</div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-calendar"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Report delivery on</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.portalProp" :title="portalProject.portalProp">{{ portalProject.portalProp }}</div>
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
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.portalUser && portalProject.portalUser.email" :title="portalProject.portalUser.email">{{portalProject.portalUser.email}}</div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                    <div class="block-body-content-item">
                        <div class="block-body-content-item-icon block-body-content-item-icon-writing"></div>
                        <div class="block-body-content-item-detail">
                            <div class="block-body-content-item-detail-title">Special Requirements</div>
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.specreq">
                                {{ portalProject.specreq }}
                                <div class="block-body-content-item-detail-info">
                                    <div class="block-body-content-item-detail-info-angle"></div>
                                    <div class="block-body-content-item-detail-info-main">{{ portalProject.specreq }}</div>
                                </div>
                            </div>
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
                            <div class="block-body-content-item-detail-desc" v-if="portalProject.authcomment">
                                {{ portalProject.authcomment }}
                                <div class="block-body-content-item-detail-info">
                                    <div class="block-body-content-item-detail-info-angle"></div>
                                    <div class="block-body-content-item-detail-info-main">{{ portalProject.authcomment }}</div>
                                </div>
                            </div>
                            <div class="block-body-content-item-detail-desc" v-else>-</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "projectDetails",
    props: ['portalProject'],
    computed: {
        show() {
            return this.$store.state.localStorage.details;
        }
    }
}
</script>

<style scoped>

</style>