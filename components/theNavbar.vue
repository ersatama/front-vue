<template>
  <nav class="navbar navbar-expand-lg navbar-light nav-main">
      <modal-box v-if="user" :modal="modal" @closeModal="modal = false">
        <the-navbar-detail @closeModal="modal = false"></the-navbar-detail>
      </modal-box>
      <div class="nav-div">
          <div class="nav-head" :class="{'nav-head-dark':mode}">
              <div class="nav-head-out" :class="{'nav-head-out-dark':mode}">
                  <div class="nav-head-in">
                      <div class="nav-alerts" :class="{'nav-alerts-dark':mode}">
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Critical Alerts</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-failure">{{ data.alerts }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">On-Demand</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.demand }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Reports to deliver</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.reports }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Neuron Projects</div>
                              <div class="nav-alerts-item-count" v-if="data && data.neuron">
                                  <div class="nav-alerts-item-count-success">{{ data.neuron.active }}</div>
                                  <div class="nav-alerts-item-count-failure">{{ data.neuron.report }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Continuous</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.continuous }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Paused</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.paused }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Not Approved</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-failure">{{ data.notApproved }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">MobileSuite</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.mobile }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                          <div class="nav-alerts-item">
                              <div class="nav-alerts-item-title">Support tickets</div>
                              <div class="nav-alerts-item-count" v-if="data">
                                  <div class="nav-alerts-item-count-success">{{ data.tickets }}</div>
                              </div>
                              <div class="nav-alerts-item-loading block-loading-item-field" v-else></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="nav-head-in">
                  <div class="nav d-flex align-items-center" :style="{gap: (menu===1?'5px':'20px')}">
                      <template v-if="menu === 1">
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/dashboard'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'Dashboard')}">Projects</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/tickets'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'Support tickets')}">Support tickets</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/content'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'Content editor')}">Content editor</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/system'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'System configuration')}">System configuration</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/neuron'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'Neuron')}">Neuron</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/discovery'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'Discovery')}">Discovery</NuxtLink>
                          </div>
                          <div class="nav-dropdown-item">
                              <NuxtLink :to="'/my_tasks'" class="nav-dropdown-item-title" :class="{'nav-dropdown-item-title-sel':(title === 'My tasks')}">My tasks</NuxtLink>
                          </div>
                      </template>
                      <template v-else>
                          <div :class="'nav-icon '+className"></div>
                          <div class="nav-title">{{ title }}</div>
                      </template>
                      <div class="nav-right">
                          <navbar-search></navbar-search>
                          <div class="nav-options" @click="modal = true" :class="{'nav-options-dark':mode}">
                              <div class="nav-options-notification" :class="{'nav-options-notification-dark':mode}">
                                  <div class="nav-options-notification-icon"></div>
                              </div>
                              <div class="nav-options-detail">
                                  <div class="nav-options-detail-title">{{ user.name }} {{ user.surname }}</div>
                                  <div class="nav-options-detail-desc" v-if="user.auditor && user.auditor.user">{{ user.auditor.user }}</div>
                              </div>
                              <div class="nav-profile bg-primary text-white d-flex align-items-center justify-content-center" v-if="user">
                                  <div>{{ getNameLetter(user) }}</div>
                              </div>
                              <div class="nav-options-menu">
                                  <div class="nav-options-menu-item"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </nav>
</template>

<script>
import NavbarSearch from "./navbarSearch.vue";
import ModalBox from "./modal/modalBox.vue";
import TheNavbarDetail from "./theNavbar/theNavbarDetail.vue";

export default {
  name: "theNavbar",
    components: {TheNavbarDetail, ModalBox, NavbarSearch},
    props: ['className', 'title'],
    data() {
      return {
          modal: false
      }
    },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
      data() {
          return this.$store.state.localStorage.statuses;
      },
      menu() {
          return this.$store.state.localStorage.menu;
      },
    user() {
      return this.$store.state.localStorage.user;
    },
    sidebar() {
      return this.$store.state.localStorage.sidebar;
    },
  },
  methods: {
    getNameLetter(user) {
      let letters = '';
      if (user.name) {
        letters += user.name[0];
      }
      if (user.surname) {
        letters += user.surname[0];
      }
      return letters;
    }
  },
}
</script>

<style lang="scss">

</style>