<template>
  <div class="modalbox-detail" :class="{'modalbox-detail-hide':!show}" @mousedown.stop>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: "modalDetail",
    props: ['show'],
    data() {
        return {

        }
    },
    created() {
        window.addEventListener('mousedown', this.hide);
    },
    destroyed() {
        window.addEventListener('mousedown', this.hide);
    },
    methods: {
        hide() {
            this.$emit('closeModal');
        }
    }
}
</script>

<style scoped>

</style>