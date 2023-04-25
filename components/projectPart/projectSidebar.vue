<template>
    <div class="block-body-left">
        <NuxtLink :to="'/dashboard/' + portalProject.id">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 0)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-detail"></div> <span>Details</span> <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=reports'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 1)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-analysis"></div>
                Raw reports
                <div class="block-body-left-item-count-double" v-if="links && links.neuron_raw_reports">
                    <div class="block-body-left-item-count-double-first" v-if="links.neuron_raw_reports.newReports && links.neuron_raw_reports.newReports > 0">{{ links.neuron_raw_reports.newReports }}</div>
                    <div class="block-body-left-item-count-double-last" v-if="links.neuron_raw_reports.newReports && links.neuron_raw_reports.allReports > 0">{{ links.neuron_raw_reports.allReports }}</div>
                </div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=alerts'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 2)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-warning"></div> Alerts <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=scan_jobs'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 3)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-bag"></div>
                Scan Jobs
                <div class="block-body-left-item-count" v-if="links && links.scanjobs && links.scanjobs > 0">{{ links.scanjobs }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=sitemaps'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 4)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-website"></div>
                Site maps
                <div class="block-body-left-item-count" v-if="links && links.sitemaps && Object.entries(links.sitemaps).length > 0">{{ Object.entries(links.sitemaps).length }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=unpatched'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 5)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-unpatched"></div>
                Unpatched
                <div class="block-body-left-item-count" v-if="links && links.unpatched">{{ links.unpatched }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=tasks'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 6)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-tasks"></div>
                Tasks
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=rawbase'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 7)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-rawbase"></div>
                All rawbase
                <div class="block-body-left-item-count" v-if="links && links.rawbase && links.rawbase > 0">{{ links.rawbase }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=blacklist'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 8)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-blacklist"></div>
                Blacklist
                <div class="block-body-left-item-count" v-if="links && links.blacklist">{{ links.blacklist }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=patch_verification'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 9)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-patch"></div>
                Patch verification
                <div class="block-body-left-item-count" v-if="links && links.patch_verification">{{ links.patch_verification }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=archived'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 10)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-archive"></div>
                Archived
                <div class="block-body-left-item-count" v-if="links && links.archived">{{ links.archived }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
        <NuxtLink :to="'/dashboard/' + portalProject.id + '?tab=patched'">
            <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 11)}">
                <div class="block-body-left-item-icon block-body-left-item-icon-patched"></div>
                Patched
                <div class="block-body-left-item-count" v-if="links && links.patched">{{ links.patched }}</div>
                <div class="block-body-left-item-icon-arr"></div>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    name: "projectSidebar",
    props: ['portalProject', 'tab', 'links']
}
</script>

<style scoped>

</style>