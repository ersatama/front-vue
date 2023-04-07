<template>
  <div class="block-body-content-table">
    <div class="block-body-content-table-header">
      <div class="block-body-content-table-tr">
        <div class="block-body-content-table-item block-body-content-table-item-sitemap-data">SITEMAP </div>
        <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">SITEMAP SIZE: Total/Part/Fuzzed</div>
        <div class="block-body-content-table-item block-body-content-table-item-sitemap-size">SITEMAP CLUSTERS: FULL/FUZZED</div>
        <div class="block-body-content-table-item block-body-content-table-item-sitemap">SITEMAP PARAMS: FULL/DONE</div>
        <div class="block-body-content-table-item block-body-content-table-item-field-option">
          <div class="block-body-content-table-item-configure" style="visibility: hidden;"></div>
        </div>
      </div>
    </div>
    <div class="block-body-content-table-body">
      <template v-if="links && links.sitemaps && Object.entries(links.sitemaps).length > 0">
        <div class="block-body-content-table-tr" v-for="(sitemap, key) in Object.entries(links.sitemaps)" :key="key">
          <div class="block-body-content-table-item block-body-content-table-item-sitemap-data">{{ sitemap[0] }} [{{ sitemap[1].sitename }}]</div>
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
      </template>
      <template v-else>
        <div class="block-body-content-table-body-empty">No data</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectSitemap",
  props: ['links']
}
</script>

<style scoped>

</style>