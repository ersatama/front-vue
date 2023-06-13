<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "qATreeItem",
  props: ['data'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    parsedData() {
      let data = null;
      if (this.data && this.data[1]) {
        data = Object.entries(this.data[1])
      }
      return data;
    }
  }
})
</script>

<template>
  <div class="modalbox-slot-body-folder" v-if="data">
    <div class="modalbox-slot-body-folder-details" @click="show = !show">
      <div class="modalbox-slot-body-folder-details-arr" :class="{'modalbox-slot-body-folder-details-arr-open':show}"></div>
      <div class="modalbox-slot-body-folder-details-icon"></div>
      <div class="modalbox-slot-body-folder-details-title">{{ data[0] }}</div>
    </div>
    <div class="modalbox-slot-body-folder-list" :class="{'modalbox-slot-body-folder-list-hide':!show}" v-if="parsedData">
      <q-a-tree-item :data="value" v-for="(value, key) in parsedData" :key="key"></q-a-tree-item>
    </div>
  </div>
</template>

<style>

</style>