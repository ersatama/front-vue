<template>
  <div v-if="menu === 2">
      <div class="sidebar-menu">
          <div class="sidebar-menu-list">
              <NuxtLink to="/dashboard" class="sidebar-menu-item sidebar-menu-item-projects">
                  <div class="sidebar-menu-item-count" v-if="countDashboard > 0">{{ countDashboard }}</div>
              </NuxtLink>
              <NuxtLink to="/tickets" class="sidebar-menu-item sidebar-menu-item-tickets"></NuxtLink>
              <NuxtLink to="/content" class="sidebar-menu-item sidebar-menu-item-editor"></NuxtLink>
              <NuxtLink to="/system" class="sidebar-menu-item sidebar-menu-item-system"></NuxtLink>
              <NuxtLink to="/neuron" class="sidebar-menu-item sidebar-menu-item-neuron"></NuxtLink>
              <NuxtLink to="/discovery" class="sidebar-menu-item sidebar-menu-item-discovery"></NuxtLink>
          </div>
          <div class="sidebar-menu-split"></div>
          <div class="sidebar-menu-list">
              <div class="sidebar-menu-item sidebar-menu-item-home"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
    computed: {
        menu() {
            return this.$store.state.localStorage.menu;
        },
        user() {
            return this.$store.state.localStorage.user;
        },
        statuses() {
            return this.$store.state.localStorage.statuses;
        },
        countDashboard() {
            let count = 0;
            if (this.statuses) {
                count += this.statuses.alerts;
                count += this.statuses.neuron.report;
                count += this.statuses.notApproved;
                count += this.statuses.tickets;
            }
            return count;
        }
    },
    created() {
        this.getStatuses();
    },
    methods: {
        async getStatuses() {
            if (this.user && this.user.auditor) {
                await this.$store.dispatch('localStorage/portalProject_getAlertsByAuditorUser', this.user.auditor.user);
            }
        }
    }
}
</script>

<style lang="scss">

</style>