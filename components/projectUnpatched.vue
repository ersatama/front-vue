<template>
  <div>
    {{ unpatched }}
  </div>
</template>

<script>
export default {
  name: "projectUnpatched",
  props: ['portalProject'],
  data() {
    return {
      unpatched: null
    }
  },
  created() {
    this.getUnpatched();
  },
  methods: {
    async getUnpatched() {
      if (this.portalProject) {
        this.unpatched = await this.$store.dispatch('localStorage/portalProjectType_getUnpatchedById', this.portalProject.id);
      }
    },
  }
}
</script>

<style scoped>

</style>