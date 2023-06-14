<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "qAList",
  props: ['project'],
  created() {
    this.getProjectQAList();
  },
  methods: {
    async getProjectQAList() {
      let data = await this.$store.dispatch('localStorage/portalProject_getQATree', {
        id: this.project.id,
        type: 'tree'
      });
    }
  }
})
</script>

<template>
  <div class="modalbox-slot">
    <div class="modalbox-slot-header">
      <div class="modalbox-slot-header-title">QA Stat {{ project.id }}</div>
    </div>
    <div class="modalbox-slot-body">
      <div class="modalbox-slot-body-table">
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-head modalbox-slot-body-table-tr-triple">
          <div class="modalbox-slot-body-table-td">Get</div>
          <div class="modalbox-slot-body-table-td">Post</div>
          <div class="modalbox-slot-body-table-td">Cookie</div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-link">
          <div class="modalbox-slot-body-table-td">
            https://artbeta.pwc.nl/_Incapsula_Resource
          </div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-triple">
          <div class="modalbox-slot-body-table-td">
            <div>CWUDNSAI</div>
            <div>xinfo</div>
            <div>incident_id</div>
            <div>edet</div>
            <div>cinfo</div>
            <div>rpinfo</div>
            <div>mth</div>
          </div>
          <div class="modalbox-slot-body-table-td"></div>
          <div class="modalbox-slot-body-table-td"></div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-link">
          <div class="modalbox-slot-body-table-td">
            https://artbeta.pwc.nl/
          </div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-triple">
          <div class="modalbox-slot-body-table-td"></div>
          <div class="modalbox-slot-body-table-td">
            <div>__EVENTARGUMENT</div>
            <div>__EVENTTARGET</div>
            <div>__EVENTVALIDATION</div>
            <div>__VIEWSTATE</div>
            <div>__VIEWSTATEGENERATOR</div>
            <div>ctl00$ctl15</div>
            <div>ctl00%24ctl15</div>
          </div>
          <div class="modalbox-slot-body-table-td"></div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-link">
          <div class="modalbox-slot-body-table-td">
            https://artbeta.pwc.nl/Account/Login
          </div>
        </div>
        <div class="modalbox-slot-body-table-tr modalbox-slot-body-table-tr-triple">
          <div class="modalbox-slot-body-table-td">ReturnUrl</div>
          <div class="modalbox-slot-body-table-td">
            <div>__EVENTARGUMENT</div>
            <div>__EVENTTARGET</div>
            <div>__EVENTVALIDATION</div>
            <div>__VIEWSTATE</div>
            <div>__VIEWSTATEGENERATOR</div>
            ctl00$MainContent$Password
            ctl00$MainContent$Username
            ctl00$MainContent$ctl04
            ctl00$MainContent$ctl05
            ctl00$MainContent$ctl06
            ctl00$ctl15
          </div>
          <div class="modalbox-slot-body-table-td"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>