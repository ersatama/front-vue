<template>
  <div class="filter bg-white">
    <div class="filter-title d-flex align-items-center">
      Filters <div class="filter-reset"></div>
    </div>
    <div class="filter-options">
      <div class="filter-item">
        <div class="filter-item-title text-muted">Project type:</div>
        <div class="filter-item-input">
          <select>
            <option>All</option>
            <option>On-Demand</option>
            <option>Mobile</option>
            <option>Continuous</option>
            <option>Neuron</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Project status:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Project ID:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Test project:</div>
        <div class="filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Host:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Target URL:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Project approved:</div>
        <div class="filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Report date:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Schedule date:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Scheduled:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="before date">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Scheduled:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="after date">
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous paid:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="before date">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous paid:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="after date">
          </div>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Continuous from:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="date before">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted invisible">Continuous from:</div>
          <div class="filter-item-input">
            <input type="text" placeholder="date after">
          </div>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-item-title text-muted">Auditor:</div>
        <div class="filter-item-input">
          <select>
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div class="filter-item-double">
        <div class="filter-item">
          <div class="filter-item-title text-muted">Client Name:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title text-muted">Company:</div>
          <div class="filter-item-input">
            <input type="text">
          </div>
        </div>
      </div>
      <button class="filter-item-btn btn btn-primary text-white">Поиск</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardFilter",

}
</script>

<style lang="scss">
.filter {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  padding: 25px;
  border-radius: 10px;
  height: fit-content;
  &-reset {
    background: url(/images/icons/undo.png) no-repeat center;
    width: 24px;
    height: 24px;
    margin-left: auto;
  }
  &-title {
    font-size: 16px;
    font-weight: bold;
  }
  &-options {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
  }
  &-item {
    width: 100%;
    &-btn {
      font-size: 14px;
      font-weight: bold;
      height: 40px;
      margin: 10px 0 0 0;
      border-radius: 5px;
    }
    &-double {
      display: flex;
      gap: 15px;
    }
    position: relative;
    &-title {
      font-size: 12px;
      font-weight: bold;
      pointer-events: none;
      margin-bottom: 5px;
    }
    &-input {
      border-radius: 5px;
      height: 36px;
      width: 100%;
      overflow: hidden;
      background: #F1F4F8;
      & > input, & > select {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        padding: 0 10px 0 10px;
        font-size: 12px;
        outline: none;
      }
    }
  }
}
</style>