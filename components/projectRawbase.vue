<template>
  <div>
      {{rawbases}}
  </div>
</template>

<script>
export default {
    name: "projectRawbase",
    props: ['portalProject'],
    data() {
        return {
            rawbases: null
        }
    },
    created() {
        this.getRawbase();
    },
    methods: {
        async getRawbase() {
            if (this.portalProject) {
                this.rawbases = await this.$store.dispatch('localStorage/portalProjectType_getRawbaseById', {
                    id: this.portalProject.id,
                    type: 'ALL',
                });
            }
        }
    }
}
</script>

<style lang="scss">

</style>