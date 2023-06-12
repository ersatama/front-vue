<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectOsint",
  props: ['portalProject'],
  data() {
    return {
      data: null,
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectOsint;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getProjectOsint();
  },
  methods: {
    async getProjectOsint() {
      this.data = await this.$store.dispatch('localStorage/portalProject_getOsintById', this.portalProject.id);
    }
  }
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">OSINT</div>
      <div class="block-body-right-desc">Project links</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectOsint');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table">
        <div class="block-body-content-table-header" v-if="data">
          <div class="block-body-content-table-tr" v-for="(url, key) in data.google_dorks" :key="key">
            <div class="block-body-content-table-item" style="color: rgb(40, 167, 69); display: flex; flex-direction: column; align-items: start; gap: 10px;">
              <div>{{ key }}</div>
              <div style="color: rgb(40, 167, 69); display: flex; align-items: start">
                <a target="_blank" :href="'https://www.google.ru/search?q=site%3A'+key">Google</a> &nbsp;
                <a target="_blank" :href="'https://www.bing.com/search?q=site%3A'+key">Bing</a> &nbsp;
                <a target="_blank" :href="'https://www.yandex.com/search/?text=site%3A'+key">Yandex</a> &nbsp;
                <a target="_blank" :href="'https://web.archive.org/web/*/'+key">Archive.org</a>&nbsp;
                <a target="_blank" :href="'http://oldrobot.org/?url='+key+'/robots.txt'">OldRobot</a> &nbsp;
                <a target="_blank" :href="'https://github.com/search?utf8=%E2%9C%93&q='+key+'&type='">Github</a><br />
              </div>
              <div style="color: #28a745; display: flex; gap: 10px;">
                <a target="_blank" v-for="(name,value) in url" :href="'https://www.google.ru/search?'+name">{{value}}</a>
              </div>
            </div>
          </div>
        </div>
        <project-no-data v-else></project-no-data>
      </div>
    </div>
  </div>
</template>

<style>

</style>