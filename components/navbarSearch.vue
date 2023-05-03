<template>
    <div class="nav-search" @mousedown.stop>
        <div class="nav-search-input">
            <div class="nav-search-input-icon"></div>
            <input type="text" placeholder="Search project" @focus.stop="show = true;" v-model="search" @keyup="startSearch()">
            <div class="nav-search-input-cancel" v-if="search !== ''" @click="search = ''"></div>
        </div>
        <div class="nav-search-result" :class="{'nav-search-result-show':show}">
            <div class="nav-search-result-angle"></div>
            <div class="nav-search-result-list">
                <div class="nav-search-result-list-item">
                    <template v-if="!ajax">
                        <template v-if="projects.length > 0 && search !== ''">
                            <div class="nav-search-result-list-item-title">Projects</div>
                            <div class="nav-search-result-list-item-collection">
                                <NuxtLink class="nav-search-result-list-item-resource" :to="'/dashboard/'+project.id" v-for="(project, key) in projects" :key="key" @click.native="show = false">
                                    <div class="nav-search-result-list-item-resource-icon">
                                        <div>{{ project.status }}</div>
                                    </div>
                                    <div class="nav-search-result-list-item-resource-detail">
                                        <div class="nav-search-result-list-item-resource-detail-title">#{{ project.id }} <span class="nav-search-result-list-item-resource-detail-title-auditor">{{ project.scanby }}</span></div>
                                        <div class="nav-search-result-list-item-resource-detail-url">{{ project.url }}</div>
                                        <div class="nav-search-result-list-item-resource-detail-desc">
                                            <template v-if="project.portalProjectType">
                                                <template v-if="project.portalProjectType.title">{{project.portalProjectType.title}}</template>
                                                <template v-if="project.portalProjectType.name"> {{project.portalProjectType.name}}</template>
                                                <template v-if="project.rescan > 0"> Patch Verification</template>
                                            </template>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </template>
                        <div class="nav-search-result-list-item-empty" v-else-if="search.trim() !== ''">Empty result</div>
                        <div class="nav-search-result-list-item-empty" v-else>Start typing anything</div>
                    </template>
                    <div class="nav-search-result-list-item-empty" v-else>
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div> <span>wait...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbarSearch",
    data() {
        return {
            projects: [],
            show: false,
            search: '',
            ajax: false,
            timer: null,
            count: 1
        }
    },
    created() {
        window.addEventListener('mousedown', this.hide);
    },
    destroyed() {
        window.addEventListener('mousedown', this.hide);
    },
    computed: {
        user() {
            return this.$store.state.localStorage.user;
        }
    },
    methods: {
        hide() {
            this.show   =   false;
        },
        startSearch() {
            clearTimeout(this.timer);
            if (this.search.trim() !== '') {
                this.timer  =   setTimeout(this.getProjects, 850);
            } else {
                this.list   =   [];
            }
        },
        async getProjects() {
            if (this.user) {
                this.ajax = true;
                let list = await this.$store.dispatch('localStorage/portalProject_search', {
                    search: this.search,
                    auditor_id: this.user.auditor_id,
                    user: this.user.auditor.user
                });
                if (list.data && this.search.trim() !== '') {
                    this.projects   =   list.data;
                } else {
                    this.projects   =   [];
                }
                this.ajax = false;
            }
        }
    }
}
</script>

<style>

</style>