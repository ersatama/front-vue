<script>
import {defineComponent} from 'vue'
import ProjectPartLoading from "@/components/modal/projectPartLoading.vue";

export default defineComponent({
    name: "projectJobStatuses",
    components: {ProjectPartLoading},
    props: ['portalProject'],
    data() {
        return {
            data: null
        }
    },
    computed: {
      mode() {
        return this.$store.state.localStorage.mode;
      },
        show() {
            return this.$store.state.localStorage.jobStatuses;
        }
    },
    created() {
        this.getJobStatuses();
    },
    methods: {
        async getJobStatuses() {
            if (this.portalProject) {
                let jobStatuses = await this.$store.dispatch('localStorage/scanJob_getJobStatuses', {
                    project_id: this.portalProject.id,
                    addurls: this.portalProject.addurls,
                    url: this.portalProject.url
                });
                if (jobStatuses.data) {
                    this.data   =   jobStatuses;
                }
            }
        }
    }
})
</script>

<template>
    <div class="block-body-right" :class="{'block-body-right-dark':mode}">
        <div class="block-body-right-header">
            <div class="block-body-right-title">Job statuses</div>
            <div class="block-body-right-desc">Project job statuses</div>
            <div class="block-body-right-header-buttons">
                <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleJobStatuses');"></div>
            </div>
        </div>
        <div class="block-body-content" :class="{'block-body-content-close':!show}">
            <div class="block-body-content-table" v-if="data">
                <div class="block-body-content-table-header">
                    <template v-if="Object.entries(data.data).length > 0">
                        <template v-for="(jobStatus, url) in data.data">
                            <div class="block-body-content-table-tr">
                                <div class="block-body-content-table-item" style="color: #28a745;">{{ url }}</div>
                            </div>
                            <div class="block-body-content-table-tr" style="background: transparent;">
                                <div class="block-body-content-table-item block-body-content-table-item-data">Service</div>
                                <div class="block-body-content-table-item block-body-content-table-item-data">Job</div>
                                <div class="block-body-content-table-item block-body-content-table-item-data">Process</div>
                            </div>
                            <template v-for="(serviceData,service) in jobStatus">
                                <div class="block-body-content-table-tr" style="background: transparent; color: #7d7f81;">
                                    <div class="block-body-content-table-item block-body-content-table-item-data">{{service}}</div>
                                    <div class="block-body-content-table-item block-body-content-table-item-data">
                                        <template v-if="serviceData.job&&!['SOFTKILLED','KILLED','STOPPED','ERROR'].includes(serviceData.jobStatus)">{{serviceData.jobStatus}}</template>
                                        <template v-else-if="serviceData.job&&['SOFTKILLED','KILLED','STOPPED','ERROR'].includes(serviceData.jobStatus)">{{serviceData.jobStatus}}</template>
                                        <template v-else>NO JOB</template>
                                    </div>
                                    <div class="block-body-content-table-item block-body-content-table-item-data">
                                        <template v-if="serviceData.process && !['SOFTKILLED','KILLED','STOPPED','ERROR'].includes(serviceData.processStatus)">{{serviceData.processStatus}}</template>
                                        <template v-else-if="serviceData.process && ['SOFTKILLED','KILLED','STOPPED','ERROR'].includes(serviceData.processStatus)">{{serviceData.processStatus}}</template>
                                        <template v-else>No process</template>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                    <project-no-data v-else></project-no-data>
                </div>
            </div>
            <project-part-loading v-else></project-part-loading>
        </div>
    </div>
</template>

<style>

</style>