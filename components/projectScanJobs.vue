<template>
  <div>{{ portalProject }}</div>
</template>

<script>
export default {
  name: "projectScanJobs",
  props: ['portalProject'],
  created() {
    this.getScanjobs();
  },
  methods: {
    async getScanjobs() {
      let scanjobs = await this.$store.dispatch('localStorage/portalProjectType_getScanjobsById', this.portalProject.id);
      console.log(scanjobs);
    }
  }
}
</script>

<style lang="scss">

</style>