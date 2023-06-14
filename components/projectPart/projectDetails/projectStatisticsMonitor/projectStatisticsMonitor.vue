<script>
import {defineComponent} from 'vue'
import { Bar, Line as LineChartGenerator } from 'vue-chartjs'
import { Chart,
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    LinearScale,
    CategoryScale,
    PointElement } from 'chart.js'
Chart.register(Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    LinearScale,
    CategoryScale,
    PointElement);
export default defineComponent({
    name: "projectStatisticsMonitor",
    props: ['portalProject'],
    components: {Bar, LineChartGenerator},
    data() {
        return {
            filterModal: false,
            tab: 0,
            filter: null,
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
        }
    },
    computed: {
      mode() {
        return this.$store.state.localStorage.mode;
      },
        show() {
            return this.$store.state.localStorage.projectStatistics;
        },
        requests() {
            let list    =   [];
            if (this.data) {
                list =   this.data.RequestCnt;
            }
            return {
                label: 'HTTP Requests',
                backgroundColor: '#dc3545',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                radius: 0,
                data: list
            };
        },
        received() {
            let received    =   [];
            if (this.data) {
                received =   this.data.Download;
            }
            return {
                type: 'line',
                label: 'Received',
                borderColor: '#0b76a6',
                backgroundColor: '#0b76a6',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                data: received
            };
        },
        logins() {
            let logins  =   [];
            if (this.data) {
                logins =   this.data.LoginCnt;
            }
            return {
                type: 'line',
                label: 'logins',
                borderColor: '#7B68EE',
                backgroundColor: '#7B68EE',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                data: logins
            };
        },
        fail() {
            let loginFailCounts =   [];
            if (this.data) {
                loginFailCounts =   this.data.LoginFailCnt;
            }
            return {
                type: 'line',
                label: 'Login fails',
                borderColor: '#0b76a6',
                backgroundColor: '#0b76a6',
                fill: true,
                tension: 0.25,
                borderWidth: 1,
                data: loginFailCounts
            };
        },
        allData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            if (this.data && this.data.dts) {
                data.labels     =   this.data.dts;
            }
            data.datasets.push(this.fail);
            data.datasets.push(this.logins);
            data.datasets.push(this.received);
            data.datasets.push(this.requests);
            return data;
        },
        requestCntData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let list    =   [];
            if (this.data && this.data.dts) {
                data.labels     =   this.data.dts;
            }
            if (this.data && this.data.RequestCnt) {
                list    =   this.data.RequestCnt;
            }
            data.datasets.push(this.requests);
            return data;
        },
        loginFailsData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            if (this.data && this.data.dts) {
                data.labels     =   this.data.dts;
            }
            data.datasets.push(this.fail);
            return data;
        },
        loginsData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            let list    =   [];
            if (this.data && this.data.dts) {
                data.labels     =   this.data.dts;
            }
            if (this.data && this.data.LoginCnt) {
                list    =   this.data.LoginCnt;
            }
            data.datasets.push(this.logins);
            return data;
        },
        downloadsData() {
            let data    =   {
                labels: [],
                datasets: []
            };
            if (this.data && this.data.dts) {
                data.labels     =   this.data.dts;
            }
            data.datasets.push(this.received);
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
    watch: {
        filter() {
            this.getScanStatsData();
        },
    },
    methods: {
        setFilter(value) {
            this.filter =   value;
        },
        async getScanStatsData() {
            let to = this.filter.to;
            let from = this.filter.from;
            this.data = await this.$store.dispatch('localStorage/scanStat_getScanStat', {
                project_id: 1052709,//this.portalProject.id,
                from: from.getFullYear() + '-' + (('0' + (from.getMonth() + 1)).slice(-2)) + '-' + ('0' + from.getDate()).slice(-2),
                to: to.getFullYear() + '-' + (('0' + (to.getMonth() + 1)).slice(-2)) + '-' + ('0' + to.getDate()).slice(-2),
            });
        }
    }
})
</script>

<template>
    <div class="block-body-right"  :class="{'block-body-right-dark':mode}">
        <modal-detail :show="filterModal" @closeModal="filterModal = false">
            <project-statistics-monitor-filter :filter="filter" @setFilter="setFilter" :portal-project="portalProject" @closeModal="filterModal = false"></project-statistics-monitor-filter>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Project statistics monitor</div>
            <div class="block-body-right-desc">Project statistics</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-filter" @click="filterModal = true"><i class="block-body-content-filter-icon"></i> Filter</button>
                <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectStatistics');"></div>
            </div>
        </div>
        <div class="block-body-content" :class="{'block-body-content-close':!show}">
            <div class="block-body-content-options">
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 0)}" @click="tab = 0">All</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 1)}" @click="tab = 1">HTTP Requests</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 2)}" @click="tab = 2">Received</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 3)}" @click="tab = 3">Logins</div>
                <div class="block-body-content-options-item" :class="{'block-body-content-options-item-sel':(tab === 4)}" @click="tab = 4">Login fails</div>
            </div>
            <div class="block-body-content-detail" v-if="filter">
                <div class="block-body-content-detail-date">
                    {{ from }} - {{ to }}
                </div>
            </div>
            <div class="block-body-graph">
                <client-only>
                    <Bar :chart-data="allData" :chart-options="chartOptions" :height="350" v-if="tab === 0"></Bar>
                    <Bar :chart-data="requestCntData" :chart-options="chartOptions" :height="350" v-if="tab === 1"></Bar>
                    <LineChartGenerator :chart-data="downloadsData" :chart-options="chartOptions" :height="350" v-if="tab === 2"/>
                    <LineChartGenerator :chart-data="loginsData" :chart-options="chartOptions" :height="350" v-if="tab === 3"/>
                    <LineChartGenerator :chart-data="loginFailsData" :chart-options="chartOptions" :height="350" v-if="tab === 4"/>
                </client-only>
            </div>
        </div>
    </div>
</template>

<style >

</style>