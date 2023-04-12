<template>
  <div class="block-body-content-table-item-hover">
    <div class="block-body-content-table-item-hover-content">
      <div v-for="(service,key) in Object.entries(services)" :key="key">
        <div class="block-body-content-table-item-hover-content-title">{{ service[0] }}</div>
        <div class="block-body-content-table-item-hover-content-body">
          <div class="block-body-content-table-item-hover-content-body-item" v-for="(item, itemKey) in Object.entries(service[1])" :key="itemKey">
            <div class="block-body-content-table-item-hover-content-body-item-key">{{ item[0] }}</div>
            <div class="block-body-content-table-item-hover-content-body-item-value">{{ item[1] }}</div>
          </div>
        </div>
      </div>
      <div class="block-body-content-table-item-hover-content-angle"></div>
    </div>
    <div class="block-body-content-table-item-hover-title">{{ Object.keys(services).length }} service</div>
  </div>
</template>

<script>
export default {
  name: "projectScanJobsServices",
  props: ['services']
}
</script>

<style lang="scss">

</style>