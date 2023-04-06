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
            <select>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Service</div>
          <div class="modalbox-slot-body-form-item-option">
            <select>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Status</div>
          <div class="modalbox-slot-body-form-item-option">
            <select>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Has draft</div>
          <div class="modalbox-slot-body-form-item-option">
            <select>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div class="modalbox-slot-body-form-item">
          <div class="modalbox-slot-body-form-item-title">Full search</div>
          <div class="modalbox-slot-body-form-item-option">
            <input type="text">
          </div>
        </div>
      </div>
    </div>
    <div class="modalbox-slot-body-footer">
      <button>Apply filter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "rawReportFilter"
}
</script>

<style lang="scss">

</style>