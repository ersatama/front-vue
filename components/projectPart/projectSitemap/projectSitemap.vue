<template>
    <div class="block-body-right" >
        <modal-detail :show="showDetail" @closeModal="showDetail = false">
            <project-sitemap-detail :data="data" v-if="data" @closeModal="showDetail = false"></project-sitemap-detail>
        </modal-detail>
        <div class="block-body-right-header">
            <div class="block-body-right-title">Sitemaps</div>
            <div class="block-body-right-desc">Project sitemaps</div>
        </div>
        <div class="block-body-content">
            <div class="block-body-content-table">
                <template v-if="links && links.sitemaps && Object.entries(links.sitemaps).length > 0">
                    <div class="block-body-content-table-header">
                        <div class="block-body-content-table-tr">
                            <div class="block-body-content-table-item block-body-content-table-item-comment">SITEMAP </div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">SITEMAP SIZE: Total/Part/Fuzzed</div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">SITEMAP CLUSTERS: FULL/FUZZED</div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap">SITEMAP PARAMS: FULL/DONE</div>
                            <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-body-content-table-body">

                        <div class="block-body-content-table-tr" v-for="(sitemap, key) in Object.entries(links.sitemaps)" :key="key" @click.stop="showDetailInfo(sitemap)" @mousedown.stop>
                            <div class="block-body-content-table-item block-body-content-table-item-comment">{{ sitemap[0] }} [{{ sitemap[1].sitename }}]</div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">{{ sitemap[1].total }} / {{ sitemap[1].part }} / {{ sitemap[1].fuzzed }}</div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">{{ sitemap[1].clusterFuzzed.clusters }} / {{ sitemap[1].clusterFuzzed.fuzzedClusters }}</div>
                            <div class="block-body-content-table-item block-body-content-table-item-sitemap">0 / 0</div>
                            <div class="block-body-content-table-item block-body-content-table-item-field-option">
                                <div class="block-body-content-table-item-option">
                                    <div class="block-body-content-table-item-option-select">
                                        <div class="block-body-content-table-item-option-select-angle"></div>
                                        <div class="block-body-content-table-item-option-select-list">
                                            <div class="block-body-content-table-item-option-select-item">Add urls</div>
                                            <div class="block-body-content-table-item-option-select-item">Graphic map</div>
                                            <div class="block-body-content-table-item-option-select-item">Table view</div>
                                            <div class="block-body-content-table-item-option-select-item">Export</div>
                                        </div>
                                    </div>
                                    <div class="block-body-content-table-item-option-dots"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </template>
                <project-no-data v-else></project-no-data>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectNoData from "../projectNoData.vue";
import ModalDetail from "../../modal/modalDetail.vue";
import ProjectSitemapDetail from "./projectSitemapDetail.vue";
import ProjectRawbaseDetail from "../projectRawbase/projectRawbaseDetail.vue";

export default {
    name: "projectSitemap",
    components: {ProjectRawbaseDetail, ProjectSitemapDetail, ModalDetail, ProjectNoData},
    props: ['links'],
    data() {
        return {
            data: null,
            showDetail: false
        }
    },
    methods: {
        showDetailInfo(data) {
            this.data       =   data;
            this.showDetail =   true;
        },
    }
}
</script>

<style>

</style>