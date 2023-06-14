<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "projectAdditionalApplicationUrls",
    props: ['portalProject'],
    computed: {
      mode() {
        return this.$store.state.localStorage.mode;
      },
        show() {
            return this.$store.state.localStorage.additionalApplicationUrls;
        },
        urls() {
            let urls    =   [];
            if (this.portalProject) {
                urls    =   this.portalProject.addurls.match(/\bhttps?:\/\/\S+/gi);
            }
            return urls;
        }
    },
})
</script>

<template>
    <div class="block-body-right" :class="{'block-body-right-dark':mode}">
        <div class="block-body-right-header">
            <div class="block-body-right-title">Additional Application URLs</div>
            <div class="block-body-right-desc">Visible to Client</div>
            <div class="block-body-right-header-buttons">
                <button class="block-body-content-filter">
                    <i class="block-body-content-filter-icon block-body-content-filter-icon-edit"></i> Edit
                </button>
                <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleAdditionalApplicationUrls');"></div>
            </div>
        </div>
        <div class="block-body-content" :class="{'block-body-content-close':!show}">
            <div class="block-body-content-table">
                <div class="block-body-content-table-header" v-if="urls && urls.length > 0">
                    <div class="block-body-content-table-tr" v-for="(url, key) in urls" :key="key">
                        <div class="block-body-content-table-item" style="color: rgb(40, 167, 69);">{{ url }}</div>
                    </div>
                </div>
                <project-no-data v-else></project-no-data>
            </div>
        </div>
    </div>
</template>

<style>

</style>