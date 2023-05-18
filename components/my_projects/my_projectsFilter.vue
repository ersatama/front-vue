<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "my_projectsFilter",
    props: ['filter'],
    data() {
        return {
            auditors: null,
            scanby: ''
        }
    },
    created() {
        if (this.user && this.user.auditor) {
            this.scanby  =   this.user.auditor.user;
        }
        this.getAuditors();
    },
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        },
        sortedAuditors() {
            let auditors    =   [];
            if (this.auditors) {
                this.auditors.forEach(auditor => {
                    if (auditor.user) {
                        auditors.push(auditor.user);
                    }
                });
            }
            return auditors.sort();
        }
    },
    methods: {
        async getAuditors() {
            let auditors = await this.$store.dispatch('localStorage/auditor_get');
            if (auditors.data) {
                this.auditors   =   auditors.data;
            }
        },
        searchPortalProjects() {
            let date   =   new Date();
            this.$emit('changeFilter', {
                scanby: this.scanby,
                scan: date.getFullYear()+'-'+(('0' + (date.getMonth() + 1)).slice(-2))+'-'+('0'+date.getDate()).slice(-2)
            });
        }
    }
})
</script>

<template>
    <div class="filter bg-white">
        <div class="filter-title d-flex align-items-center">
            Filter
        </div>
        <div class="filter-options">
            <div class="filter-item">
                <div class="filter-item-title text-muted">Auditor:</div>
                <div class="filter-item-input">
                    <select v-model="scanby">
                        <option v-for="(auditor,key) in sortedAuditors" :key="key">{{auditor}}</option>
                    </select>
                </div>
            </div>
            <button class="filter-item-btn btn btn-primary text-white" @click="searchPortalProjects">Search</button>
        </div>
    </div>
</template>

<style>

</style>