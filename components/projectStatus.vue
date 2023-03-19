<template>
  <div class="page-info">
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-warning"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Critical Alerts</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-danger">8</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-database"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Neuron Projects</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-danger">0</div>
            <div class="page-info-item-count-success">10</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-locked"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Not Approved</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">0</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-info"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">On-Demand</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">0</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-refresh"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Continuous</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">0</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-mobile"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">MobileSuite</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">0</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-info-items">
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-file"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Reports to deliver</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">2</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-pause"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Paused</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">2</div>
          </div>
        </div>
      </div>
      <div class="page-info-item d-flex align-items-center">
        <div class="page-info-item-icon page-info-item-icon-network"></div>
        <div class="page-info-item-header">
          <div class="page-info-item-title text-muted">Support tickets</div>
          <div class="page-info-item-count">
            <div class="page-info-item-count-success">2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectStatus"
}
</script>

<style scoped>

</style>