<script>
import {defineComponent} from 'vue'
import ProjectItem from "@/components/dashboard/projectItem.vue";
import My_tasksLoading from "@/components/modal/my_tasksLoading.vue";
import My_projectsFilter from "@/components/my_projects/my_projectsFilter.vue";

export default defineComponent({
    name: "index",
    components: {My_tasksLoading, My_projectsFilter, ProjectItem},
    layout: 'admin',
    data() {
        return {
            loadingStatus: false,
            portalProjects: null,
            filter: null
        }
    },
    watch: {
        filter() {
            this.getPortalProjects();
        }
    },
    created() {
        if (this.user && this.user.auditor) {
            let date   =   new Date();
            this.filter  =   {
                scanby: this.user.auditor.user,
                scan: date.getFullYear()+'-'+(('0' + (date.getMonth() + 1)).slice(-2))+'-'+('0'+date.getDate()).slice(-2)
            };
        }
    },
    computed: {
      mode() {
        return this.$store.state.localStorage.mode;
      },
        user() {
            return this.$store.state.localStorage.user;
        },
    },
    methods: {
        changeFilter(value) {
            this.filter =   value;
        },
        async getPortalProjects() {
            this.loadingStatus = false;
            let portalProjects = await this.$store.dispatch('localStorage/portalProject_getByFilter', this.filter);
            if (portalProjects.data) {
                this.portalProjects =   portalProjects.data;
            }
            this.loadingStatus = true;
        }
    }
})
</script>

<template>
    <div>
        <div class="d-flex page" v-if="portalProjects">
            <div class="page-left">
                <div class="page-left-header" :class="{'page-left-header-dark':mode}">
                    <div class="page-left-header-title text-muted">
                        Projects found: <span class="page-left-header-title-success">{{portalProjects.length}}</span>
                    </div>
                </div>
                <div class="page-left-list" v-if="loadingStatus">
                    <project-item v-for="(portalProject, key) in portalProjects" :key="key" :portalProject="portalProject"></project-item>
                </div>
                <div class="block-dashboard-loading-left-items" :class="{'block-dashboard-loading-left-items-dark':mode}" style="margin-top: 20px;" v-else>
                    <div class="block-dashboard-loading-left-item">
                        <div class="block-dashboard-loading-left-item-header">
                            <div class="block-dashboard-loading-left-item-header-left">
                                <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                            </div>
                            <div class="block-dashboard-loading-left-item-header-right">
                                <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-dashboard-loading-left-item">
                        <div class="block-dashboard-loading-left-item-header">
                            <div class="block-dashboard-loading-left-item-header-left">
                                <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                            </div>
                            <div class="block-dashboard-loading-left-item-header-right">
                                <div class="block-loading-item-field" :class="{'block-loading-item-field-dark':mode}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <my_projects-filter :filter="filter" @changeFilter="changeFilter"></my_projects-filter>
        </div>
        <my_tasks-loading v-else></my_tasks-loading>
    </div>
</template>

<style >

</style>