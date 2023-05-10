<template>
  <div class="page-info">
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-warning"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Critical Alerts</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
            <div class="page-info-item-count" v-else-if="data.alerts">
                <div class="page-info-item-count-danger">{{ data.alerts }}</div>
            </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-database"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Neuron Projects</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.neuron">
            <div class="page-info-item-count-danger" v-if="data.neuron.report">{{ data.neuron.report }}</div>
            <div class="page-info-item-count-success" v-if="data.neuron.active">{{ data.neuron.active }}</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-locked"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Not Approved</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.notApproved">
            <div class="page-info-item-count-danger">{{ data.notApproved }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-info"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">On-Demand</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.demand">
            <div class="page-info-item-count-success">{{ data.demand }}</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-refresh"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Continuous</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.continuous">
            <div class="page-info-item-count-success">{{data.continuous}}</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-mobile"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">MobileSuite</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.mobile">
            <div class="page-info-item-count-success">{{ data.mobile }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-file"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Reports to deliver</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.reports">
            <div class="page-info-item-count-success">{{ data.reports }}</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-pause"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Paused</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.paused">
            <div class="page-info-item-count-success">{{ data.paused }}</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-network"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Support tickets</div>
            <div class="block-loading-item-field page-info-item-loading" v-if="!data"></div>
          <div class="page-info-item-count" v-else-if="data.tickets">
            <div class="page-info-item-count-success">{{data.tickets}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectStatus",
    computed: {
        data() {
            return this.$store.state.localStorage.statuses;
        }
    },

}
</script>

<style>

</style>