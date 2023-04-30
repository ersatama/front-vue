<template>
    <div class="modalbox-detail-content" v-if="data">
        <div class="modalbox-detail-content-header">
            <div class="modalbox-detail-content-header-detail">
                <div class="modalbox-detail-content-header-detail-title">
                    Sitemap
                </div>
                <div class="modalbox-detail-content-header-detail-desc">
                    #{{ data[0] }}
                </div>
            </div>
            <div class="modalbox-detail-content-header-btns">
                <div class="modalbox-detail-content-header-btn">
                    <div class="modalbox-detail-content-header-btn-dots"></div>
                    <div class="modalbox-detail-content-header-btn-select">
                        <div class="modalbox-detail-content-header-btn-select-angle"></div>
                        <div class="block-body-content-table-item-option-select-list">
                            <div class="block-body-content-table-item-option-select-item">Add urls</div>
                            <div class="block-body-content-table-item-option-select-item">Graphic map</div>
                            <div class="block-body-content-table-item-option-select-item">Table view</div>
                            <div class="block-body-content-table-item-option-select-item">Export</div>
                        </div>
                    </div>
                </div>
                <div class="modalbox-detail-content-header-btn modalbox-detail-content-header-btn-close" @click="$emit('closeModal');"></div>
            </div>
        </div>
        <vue-custom-scrollbar class="modalbox-detail-content-scroll"  :settings="settings">
            <div class="modalbox-detail-content-body">
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Sitemap</div>
                    <div class="modalbox-detail-content-item-value">
                        {{ data[0] }}
                    </div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">URL ID</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].urlId">
                        {{ data[1].urlId }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Total</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].total">
                        {{ data[1].total }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Part</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].part">
                        {{ data[1].part }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Fuzzed</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].fuzzed">
                        {{ data[1].fuzzed }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Need</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].need">
                        {{ data[1].need }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Sitename</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].sitename" v-html="findUrl(data[1].sitename)"></div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Table</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].table">
                        {{ data[1].table }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Clusters</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].clusterFuzzed && data[1].clusterFuzzed.clusters">
                        {{ data[1].clusterFuzzed.clusters }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
                <div class="modalbox-detail-content-item">
                    <div class="modalbox-detail-content-item-title">Fuzzed clusters</div>
                    <div class="modalbox-detail-content-item-value" v-if="data[1].clusterFuzzed && data[1].clusterFuzzed.fuzzedClusters">
                        {{ data[1].clusterFuzzed.fuzzedClusters }}
                    </div>
                    <div class="modalbox-detail-content-item-value" v-else>-</div>
                </div>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
    name: "projectSitemapDetail",
    props: ['data'],
    components: { vueCustomScrollbar },
    data() {
        return {
            list: [],
            showFullLinks: false,
            showFullDetails: false,
            detailSize: 300,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        }
    },
    methods: {
        findUrl(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.toString().replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },
    }
}
</script>

<style>

</style>