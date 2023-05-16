<script>
import {defineComponent} from 'vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Datepicker from 'vuejs-datepicker'
export default defineComponent({
    name: "projectStatisticsMonitorFilter",
    props: ['filter','portalProject'],
    components: { vueCustomScrollbar, Datepicker },
    data() {
        return {
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            },
            from: new Date(),
            to: new Date()
        }
    },
    created() {
        let date    =   new Date();
        date.setDate(date.getDate() - 1);
        this.from   =   date;
        this.setFilterValues();
    },
    methods: {
        setFilterValues() {
            this.$emit('setFilter', {
                from: this.from,
                to: this.to,
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
                    Project statistics monitor
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
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<style>

</style>