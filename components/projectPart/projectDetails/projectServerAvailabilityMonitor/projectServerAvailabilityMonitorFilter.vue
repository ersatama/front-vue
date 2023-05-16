<script>
import {defineComponent} from 'vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Datepicker from 'vuejs-datepicker'
export default defineComponent({
    name: "projectServerAvailabilityMonitorFilter",
    props: ['filter','portalProject'],
    components: { vueCustomScrollbar, Datepicker },
    data() {
        return {
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            },
            urls: [],
            availability: ['Auto', 'Unavailable', 'Available'],
            selectUrl: 0,
            from: new Date(),
            to: new Date()
        }
    },
    computed: {
        selected() {
            let url =   '';
            if (this.urls && Object.entries(this.urls)[this.selectUrl] !== undefined) {
                url =   Object.entries(this.urls)[this.selectUrl][1].url;
            }
            return url;
        }
    },
    created() {
        let date    =   new Date();
        date.setDate(date.getDate() - 1);
        this.from   =   date;
        if (this.portalProject) {
            this.getProjectStatus();
        }
    },
    methods: {
        async getProjectStatus() {
            this.urls   =   await this.$store.dispatch('localStorage/portalProp_getProjectStatusesByProjectId', this.portalProject.id);
            this.setFilterValues();
        },
        setFilterValues() {
            this.$emit('setFilter', {
                from: this.from,
                to: this.to,
                url: this.selected
            });
            this.$emit('closeModal');
        }
    }
})
</script>

<template>
    <div class="modalbox-detail-content">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Server availability monitor
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    filter
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn modalbox-detail-content-header-btn-close" @click="$emit('closeModal');"></div>
            </div>
        </div>
        <vue-custom-scrollbar class="modalbox-detail-content-scroll"  :settings="settings">
            <div class="modalbox-detail-content-body">
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">URL</div>
                    <div class="modalbox-detail-content-item-value">
                        <select v-model="selectUrl">
                            <template v-for="(url,key) in Object.entries(urls)" v-if="url[1].url !== '*' && url[1].url !== ''">
                                <option :key="key" :value="key" :selected="key === selectUrl">
                                    <template v-if="url[1].status === 'BAN'">
                                        {{url[1].url}} - OFFLINE (ban)
                                    </template>
                                    <template v-if="url[1].status === 'FAIL'">
                                        {{url[1].url}} - OFFLINE
                                    </template>
                                    <template v-else>
                                        {{url[1].url}}
                                    </template>
                                </option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">From</div>
                    <div class="modalbox-detail-content-item-value">
                        <datepicker v-model="from" :input-class="'modalbox-detail-content-item-value-input'" :clear-button="true" :placeholder="'date'"></datepicker>
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">To</div>
                    <div class="modalbox-detail-content-item-value">
                        <datepicker v-model="to" :input-class="'modalbox-detail-content-item-value-input'" :clear-button="true" :placeholder="'date'"></datepicker>
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <button @click="setFilterValues">Set filter</button>
                </div>
                <div class="modalbox-detail-content-item-line"></div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Website Availability</div>
                    <div class="modalbox-detail-content-item-value">
                        <select>
                            <option v-for="(value,key) in availability" :key="key">{{ value }}</option>
                        </select>
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <button>Save</button>
                </div>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<style>

</style>