<template>
  <div class="page-filter bg-white">
    <div class="page-filter-title d-flex align-items-center">
      Filters <div class="page-filter-reset"></div>
    </div>
    <div class="page-filter-options">
      <div class="page-filter-item">
        <div class="page-filter-item-title text-muted">Project type:</div>
        <div class="page-filter-item-input">
          <select>
            <option>All</option>
            <option>On-Demand</option>
            <option>Mobile</option>
            <option>Continuous</option>
            <option>Neuron</option>
          </select>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Project status:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Project ID:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="page-filter-item">
        <div class="page-filter-item-title text-muted">Test project:</div>
        <div class="page-filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Host:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Target URL:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="page-filter-item">
        <div class="page-filter-item-title text-muted">Project approved:</div>
        <div class="page-filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Report date:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Schedule date:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Scheduled:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="before date">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted invisible">Scheduled:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="after date">
          </div>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Continuous paid:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="before date">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted invisible">Continuous paid:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="after date">
          </div>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Continuous from:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="date before">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted invisible">Continuous from:</div>
          <div class="page-filter-item-input">
            <input type="text" placeholder="date after">
          </div>
        </div>
      </div>
      <div class="page-filter-item">
        <div class="page-filter-item-title text-muted">Auditor:</div>
        <div class="page-filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="page-filter-item-double">
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Client Name:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="page-filter-item">
          <div class="page-filter-item-title text-muted">Company:</div>
          <div class="page-filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <button class="page-filter-item-btn btn btn-primary text-white">Поиск</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardFilter",

}
</script>

<style scoped>

</style>