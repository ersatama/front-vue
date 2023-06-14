<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectDDOSSustainability",
  props: ['portalProject'],
  data() {
    return {
      ddos1: false,
      ddos2: false,
      ddos3: false,
      ddos4: false,
      ddos5: false,
      ddos6: false,
      ddos7: false,
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectDDOSSustainability;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getDDOSSustainability();
  },
  methods: {
    async getDDOSSustainability() {
      let data = await this.$store.dispatch('localStorage/portalProp_getDDOSSustainability', {
        project_id: this.portalProject.id,
        user: this.user.auditor.user,
      });
      this.ddos1  = data.ddos1;
      this.ddos2  = data.ddos2;
      this.ddos3  = data.ddos3;
      this.ddos4  = data.ddos4;
      this.ddos5  = data.ddos5;
      this.ddos6  = data.ddos6;
      this.ddos7  = data.ddos7;
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">DDoS Sustainability</div>
      <div class="block-body-right-desc">Project DDoS Sustainability</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectDDOSSustainability');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-checkbox" @click="ddos1 = !ddos1">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos1}"></div>
        Your web application is accessible via its real IP address.
      </div>
      <div class="block-body-content-checkbox" @click="ddos2 = !ddos2">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos2}"></div>
        Your web application is located behind a cloud or a load balancing instance, however its real IP address can be disclosed. A remote attacker can circumvent the protection by directly attacking your server.
      </div>
      <div class="block-body-content-checkbox" @click="ddos3 = !ddos3">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos3}"></div>
        Your web application load speed is quite slow, a simple HTML page is loading longer than 1 second.
      </div>
      <div class="block-body-content-checkbox" @click="ddos4 = !ddos4">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos4}"></div>
        Your web application accessibility was significantly (x2) longer during moderate security testing. It indicates exhaustibility of server’s resources or network capacity.
      </div>
      <div class="block-body-content-checkbox" @click="ddos5 = !ddos5">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos5}"></div>
        Your web application went offline during moderate security testing on several occasions. This indicates rapid exhaustibility of server’s resources or network capacity.
      </div>
      <div class="block-body-content-checkbox" @click="ddos6 = !ddos6">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos6}"></div>
        Your web application contains resource-consuming scripts that overload and exhaust server’s resources when misused by an attacker.
      </div>
      <div class="block-body-content-checkbox" @click="ddos7 = !ddos7">
        <div class="block-body-content-table-item-checkbox-input" :class="{'block-body-content-table-item-checkbox-input-checked':ddos7}"></div>
        Your Web Application Firewall allows bots to crawl your web application for data scraping and other attacks.
      </div>
      <div class="block-body-content-area">
        <div class="block-body-content-area-buttons">
          <button class="block-body-content-area-button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>