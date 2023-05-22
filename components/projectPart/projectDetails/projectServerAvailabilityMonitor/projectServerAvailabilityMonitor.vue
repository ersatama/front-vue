<template>
    <div class="block-body-right" >
        <modal-detail :show="filterModal" @closeModal="filterModal = false">
            <project-server-availability-monitor-filter :filter="filter" @setFilter="setFilter" :portal-project="portalProject" @closeModal="filterModal = false"></project-server-availability-monitor-filter>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Server availability monitor</div>
            <div class="block-body-right-desc">
                Current status -
                <template v-if="portalProject.projectStatus === 'OK' || portalProject.projectStatus === 'ONLINE'">
                    <span class="block-body-right-desc-success">{{ portalProject.projectStatus }}</span>
                </template>
                <template v-else-if="portalProject.projectStatus === 'OFFLINE (ban)' || portalProject.projectStatus === 'OFFLINE'">
                    <span class="block-body-right-desc-fail">{{ portalProject.projectStatus }}</span>
                </template>
                <template v-else>
                    {{ portalProject.projectStatus }}
                </template>
            </div>
            <div class="block-body-right-header-buttons">
                <div class="block-body-right-header-options">
                    <div class="block-body-right-header-option" :class="{'block-body-right-header-option-sel':(period === 1)}" @click="period = 1">Default</div>
                    <div class="block-body-right-header-option" :class="{'block-body-right-header-option-sel':(period === 12)}" @click="period = 12">Last 12 hours</div>
                    <div class="block-body-right-header-option" :class="{'block-body-right-header-option-sel':(period === 120)}" @click="period = 120">Last 5 days</div>
                </div>
                <button class="block-body-content-filter" @click="filterModal = true"><i class="block-body-content-filter-icon"></i> Filter</button>
                <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleServerAvailability');"></div>
            </div>
        </div>
        <div class="block-body-content" :class="{'block-body-content-close':!show}">
            <div class="block-body-content-options">
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 0)}" @click="tab = 0">All</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 1)}" @click="tab = 1">Start transfer time</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 2)}" @click="tab = 2">Connecting time</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 3)}" @click="tab = 3">Full response time</div>
<!--                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 4)}" @click="tab = 4">Banned out IPs</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 5)}" @click="tab = 5">Server offline</div>-->
            </div>
            <div class="block-body-content-detail" v-if="filter">
                <div class="block-body-content-detail-url">
                    <template v-if="filter.url">{{ filter.url }}</template>
                    <template v-else>-</template>
                </div>
                <div class="block-body-content-detail-date">
                    {{ from }} - {{ to }}
                </div>
            </div>
            <div class="block-body-graph">
                <client-only>
                    <LineChartGenerator :chart-data="all" :chart-options="chartOptions" :height="500" v-if="tab === 0"/>
                    <LineChartGenerator :chart-data="startTransferTimeData" :chart-options="chartOptions" :height="500" v-if="tab === 1"/>
                    <LineChartGenerator :chart-data="connectionTimeData" :chart-options="chartOptions" :height="500" v-if="tab === 2"/>
                    <LineChartGenerator :chart-data="fullResponseTimeData" :chart-options="chartOptions" :height="500" v-if="tab === 3"/>
                </client-only>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
import ModalDetail from "../../../modal/modalDetail.vue";
import ProjectServerAvailabilityMonitorFilter from "./projectServerAvailabilityMonitorFilter.vue";
import ProjectUnverifiedDetail from "../../projectUnverified/projectUnverifiedDetail.vue";
import { Line as LineChartGenerator } from 'vue-chartjs'
import { Chart,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement } from 'chart.js'
Chart.register(Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement);
export default defineComponent({
    name: "projectServerAvailabilityMonitor",
    components: {LineChartGenerator, ProjectUnverifiedDetail, ProjectServerAvailabilityMonitorFilter, ModalDetail},
    props: ['portalProject'],
    data() {
        return {
            filterModal: false,
            filter: null,
            period: 1,
            data: null,
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                maintainAspectRatio: false
            },
            tab: 0,
        }
    },
    watch: {
        filter() {
            this.getServerTesterLogData();
        },
        period() {
            this.getServerTesterLogData();
        }
    },
    computed: {
        show() {
            return this.$store.state.localStorage.serverAvailability;
        },
        all() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let startTransferTime   =   [];
            let connectTime         =   [];
            let list                =   [];
            if (this.data) {
                this.data.forEach(item => {
                    data.labels.push(item.dt);
                    startTransferTime.push(item.starttransfer_time);
                    connectTime.push(item.connect_time);
                    list.push(item.total);
                });
            }
            data.datasets.push({
                label: 'Start transfer time',
                borderColor: '#dc3545',
                backgroundColor: '#dc3545',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: startTransferTime
            });
            data.datasets.push({
                label: 'Connecting time',
                borderColor: '#0b76a6',
                backgroundColor: '#0b76a6',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: connectTime
            });
            data.datasets.push({
                label: 'Full response time',
                borderColor: '#7B68EE',
                backgroundColor: '#7B68EE',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: list
            });
            return data;
        },
        fullResponseTimeData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let list    =   [];
            if (this.data) {
                this.data.forEach(item => {
                    data.labels.push(item.dt);
                    list.push(item.total);
                });
            }
            data.datasets.push({
                label: 'Full response time',
                borderColor: '#7B68EE',
                backgroundColor: '#7B68EE',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: list
            });
            return data;
        },
        connectionTimeData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let connectTime         =   [];
            if (this.data) {
                this.data.forEach(item => {
                    data.labels.push(item.dt);
                    connectTime.push(item.connect_time);
                });
            }
            data.datasets.push({
                label: 'Connecting time',
                borderColor: '#0b76a6',
                backgroundColor: '#0b76a6',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: connectTime
            });
            return data;
        },
        startTransferTimeData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let startTransferTime   =   [];
            if (this.data) {
                this.data.forEach(item => {
                    data.labels.push(item.dt);
                    startTransferTime.push(item.starttransfer_time);
                });
            }
            data.datasets.push({
                label: 'Start transfer time',
                borderColor: '#dc3545',
                backgroundColor: '#dc3545',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: startTransferTime
            });
            return data;
        },
        from() {
            let from = '-';
            if (this.filter.from) {
                from = this.filter.from;
                from = from.getFullYear()+'-'+(('0' + (from.getMonth() + 1)).slice(-2))+'-'+('0'+from.getDate()).slice(-2)
            }
            return from;
        },
        to() {
            let to = '-';
            if (this.filter.to) {
                to = this.filter.to;
                to = to.getFullYear()+'-'+(('0' + (to.getMonth() + 1)).slice(-2))+'-'+('0'+to.getDate()).slice(-2)
            }
            return to;
        }
    },
    methods: {
        setFilter(value) {
            this.filter =   value;
        },
        async getServerTesterLogData() {
            let to      =   this.filter.to;
            let from    =   this.filter.from;
            this.data   =   await this.$store.dispatch('localStorage/serverTesterLog_getServerTesterLog', {
                period: this.period,
                type: this.portalProject.type,
                rescan: this.portalProject.rescan,
                jit: this.portalProject.jit,
                dtshedule: this.portalProject.dtshedule,
                project_id: this.portalProject.id,
                from: from.getFullYear()+'-'+(('0' + (from.getMonth() + 1)).slice(-2))+'-'+('0'+from.getDate()).slice(-2),
                to: to.getFullYear()+'-'+(('0' + (to.getMonth() + 1)).slice(-2))+'-'+('0'+to.getDate()).slice(-2),
                url: this.filter.url,
            });
        }
    }
})
</script>



<style>

</style>