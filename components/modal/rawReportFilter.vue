<template>
  <div class="modalbox-slot">
    <div class="modalbox-slot-header">
      <div class="modalbox-slot-header-title">Filter</div>
      <div class="modalbox-slot-header-desc">Raw reports</div>
    </div>
    <div class="modalbox-slot-body">
      <div class="modalbox-slot-body-form">
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Neuron Target(for report)</div>
          <div class="modalbox-slot-body-form-item-option">
            <select v-model="target">
              <option v-for="(target,key) in targets" :key="key" :value="target.key">{{ target.value }}</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Service</div>
          <div class="modalbox-slot-body-form-item-option">
            <select v-model="service">
              <option v-for="(service,key) in services" :value="service" :key="key">{{ service }}</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Status</div>
          <div class="modalbox-slot-body-form-item-option">
            <select v-model="status">
              <option v-for="(status, key) in statuses" :key="key" :value="status.key">{{ status.value }}</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Has draft</div>
          <div class="modalbox-slot-body-form-item-option">
            <select v-model="draft">
              <option v-for="(draft, key) in drafts" :key="key" :value="draft.key">{{ draft.value }}</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Full search</div>
          <div class="modalbox-slot-body-form-item-option">
            <input type="text" v-model="search">
          </div>
        </div>
      </div>
    </div>
    <div class="modalbox-slot-body-footer">
      <button @click="applyFilter">Apply filter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "rawReportFilter",
  props: ['project'],
  data() {
    return {
      target: 'all',
      targets: [{
        key: 'all',
        value: 'All'
      }],

      service: 'All',
      services: ['All','zscan2','zscan3'],

      status: 'ALL',
      statuses: [
        {
          key: 'ALL',
          value: 'All'
        },
        {
          key: 'ALL_WITHOUT_OLD',
          value: 'ALL WITHOUT OLD'
        },
        {
          key: 'NEW',
          value: 'NEW'
        },
        {
          key: 'DONE',
          value: 'DONE'
        },
        {
          key: 'FP',
          value: 'FP'
        },
        {
          key: 'OLD',
          value: 'OLD'
        },
      ],

      draft: 'ALL',
      drafts: [
        {
          key: 'ALL',
          value: 'All'
        },
        {
          key: 'YES',
          value: 'Yes'
        },
        {
          key: 'NO',
          value: 'No'
        },
      ],

      search: ''
    }
  },
  created() {
    this.getTargets();
    this.applyFilter();
  },
  methods: {
    async getTargets() {
      let scanNeuronJobs = await this.$store.dispatch('localStorage/scanNeuronJob_getByProjectId', this.project.id);
      scanNeuronJobs.data.forEach(scanNeuronJob => {
        let val = scanNeuronJob.target_url;
        if (scanNeuronJob.finished) {
          val += ' (FINISHED)';
        }
        this.targets.push({
          key: scanNeuronJob.id,
          value: val
        });
      });
    },
    applyFilter() {
      let data  = {
        target: this.target,
        service: this.service,
        status: this.status,
        draft: this.draft,
        search: this.search.trim()
      };
      this.$emit('setFilter', data);
      this.$emit('closeModal');
    }
  }
}
</script>

<style lang="scss">

</style>