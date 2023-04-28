<template>
  <div class="modalbox" v-show="modal">
    <div class="modalbox-content">
      <div class="modalbox-content-close" @click="$emit('closeModal')"></div>
      <div class="modalbox-content-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "modalBox",
    props: ['modal'],
}
</script>

<style lang="scss">

</style>