<script>
import {defineComponent} from 'vue'
import QATreeItem from "@/components/modal/qATreeItem.vue";

export default defineComponent({
  name: "qATree",
  components: {QATreeItem},
  props: ['project'],
  data() {
    return {
      data: null,
    }
  },
  computed: {
    parsedData() {
      let data = null;
      if (this.data) {
        data = Object.entries(this.data)
      }
      return data;
    }
  },
  created() {
    this.getProjectQATree();
  },
  methods: {
    async getProjectQATree() {
      let data = await this.$store.dispatch('localStorage/portalProject_getQATree', {
        id: this.project.id,
        type: 'tree'
      });
      this.data = {'title':{'POST': {'__EVENTARGUMENT':null,'__EVENTARGUMENT0':null,'__EVENTARGUMENT1':null}, 'Account':{'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Bundles': {'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Error':{'Login': null, 'old.aspx': null, 'db.aspx': null}},'title1':{'POST': {'__EVENTARGUMENT':null,'__EVENTARGUMENT0':null,'__EVENTARGUMENT1':null}, 'Account':{'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Bundles': {'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Error':{'Login': null, 'old.aspx': null, 'db.aspx': null}},'title2':{'POST': {'__EVENTARGUMENT':null,'__EVENTARGUMENT0':null,'__EVENTARGUMENT1':null}, 'Account':{'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Bundles': {'Login': null, 'old.aspx': null, 'db.aspx': null}, 'Error':{'Login': null, 'old.aspx': null, 'db.aspx': null}}};

    }
  }
})
</script>

<template>
  <div class="modalbox-slot">
    <div class="modalbox-slot-header">
      <div class="modalbox-slot-header-title">QA Stat {{ project.id }}</div>
    </div>
    <div class="modalbox-slot-body">
      <div class="modalbox-slot-body-info">
        <div class="modalbox-slot-body-info-item">Nobody</div>
        <div class="modalbox-slot-body-info-item">Auditor</div>
        <div class="modalbox-slot-body-info-item">Scanner</div>
        <div class="modalbox-slot-body-info-item">Both</div>
        <div class="modalbox-slot-body-info-item modalbox-slot-body-info-item-sel">All</div>
      </div>
      <q-a-tree-item :data="value" v-for="(value, key) in parsedData" :key="key"></q-a-tree-item>
    </div>
  </div>
</template>

<style>

</style>