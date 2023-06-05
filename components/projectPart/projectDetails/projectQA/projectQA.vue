<script>
import {defineComponent} from 'vue'
import ProjectPartLoading from "@/components/modal/projectPartLoading.vue";

export default defineComponent({
  name: "projectQA",
  components: {ProjectPartLoading},
  props: ['portalProject'],
  data() {
    return {
      domain: '',
      data: null,
    }
  },
  computed: {
    show() {
      return this.$store.state.localStorage.projectQA;
    },
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  created() {
    this.getQA();
  },
  methods: {
    async getQA() {
      if (this.portalProject) {
        this.data = await this.$store.dispatch('localStorage/portalProject_getQA', {
          id: this.portalProject.id,
          jit: this.portalProject.jit,
          user: this.user.auditor.user,
          domain: this.domain
        });
      }
    }
  }
})
</script>

<template>
  <div class="block-body-right">
    <div class="block-body-right-header">
      <div class="block-body-right-title">QA</div>
      <div class="block-body-right-desc">Project QA</div>
      <div class="block-body-right-header-buttons">
        <button class="block-body-content-add">
          QA PARAM list
        </button>
        <button class="block-body-content-add">
          QA PARAM list (tree)
        </button>
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectQA');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-table" v-if="data">
        <div class="block-body-content-table-header">
          <div class="block-body-content-table-tr">
            <div class="block-body-content-table-item block-body-content-table-item-list">Type / Checked by</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">Total Params</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">Auditors</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">Scanner</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">Auditor and Scanner</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">Not checked</div>
          </div>
          <div class="block-body-content-table-tr" style="background: transparent; color: rgb(125, 127, 129);">
            <div class="block-body-content-table-item block-body-content-table-item-list">Full</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.full.F }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.full.A }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.full.S }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.full.B }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.full.N }}</div>
          </div>
          <div class="block-body-content-table-tr" style="background: transparent; color: rgb(125, 127, 129);">
            <div class="block-body-content-table-item block-body-content-table-item-list">Uniq</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.uniq.F }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.uniq.A }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.uniq.S }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.uniq.B }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.uniq.N }}</div>
          </div>
          <div class="block-body-content-table-tr" style="background: transparent; color: rgb(125, 127, 129);">
            <div class="block-body-content-table-item block-body-content-table-item-list">Cookies</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.cook.F }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.cook.A }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.cook.S }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.cook.B }}</div>
            <div class="block-body-content-table-item block-body-content-table-item-list">{{ data.cook.N }}</div>
          </div>
        </div>
      </div>
      <project-part-loading v-else></project-part-loading>
    </div>
  </div>
</template>

<style scoped>

</style>