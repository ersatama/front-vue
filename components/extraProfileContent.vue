<template>
  <div class="extra-content">
    <div class="extra-content-title">FAQ</div>
    <div class="extra-content-desc">If you have any questions or concerns contact support@immuniweb.com</div>
    <div class="extra-content-bordered">
      <div class="extra-content-item">
        <div class="extra-content-item-icon extra-content-item-icon-profile"></div>
        <div class="extra-content-item-detail">
          <div class="extra-content-item-detail-title">Profile</div>
          <div class="extra-content-item-detail-desc">Change your personal information or customize your interface</div>
        </div>
      </div>
      <div class="extra-content-item">
        <div class="extra-content-item-icon extra-content-item-icon-dashboard"></div>
        <div class="extra-content-item-detail">
          <div class="extra-content-item-detail-title">Dashboard</div>
          <div class="extra-content-item-detail-desc">List of projects and alerts</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "extraProfileContent"
}
</script>

<style lang="scss">
  .extra-content {
    display: flex;
    flex-direction: column;
    padding: 25px;
    flex-grow: 1;
    &-title {
      font-size: 16px;
      font-weight: bold;
    }
    &-desc {
      color: #7d7f81;
      font-size: 12px;
    }
    &-bordered {
      margin-top: 25px;
      border: 1px solid #eaedf1;
      border-radius: 5px;
      background: #f9f9f9;
    }
    &-item {
      padding: 15px;
      border-bottom: 1px solid #eaedf1;
      display: flex;
      gap: 10px;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      &-icon {
        width: 24px;
        height: 24px;
        background: no-repeat center;
        &-profile {
          background-image: url(/images/icons/profile.png);
        }
        &-dashboard {
          background-image: url(/images/icons/dashboard.png);
        }
      }
      &-detail {
        &-title {
          font-size: 14px;
          font-weight: bold;
          color: #0b76a6;
        }
        &-desc {
          font-size: 12px;
        }
      }
    }
  }
</style>