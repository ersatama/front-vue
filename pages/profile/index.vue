<template>
  <div class="block">
      <notifications position="bottom right" classes="my-custom-class"/>
    <div class="block-title">My profile</div>
    <div class="block-body">
      <div class="block-body-left">
        <NuxtLink to="/profile">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 0)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-profile"></div> <span>Profile</span> <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink to="/profile?tab=settings">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 1)}">
            <div class="block-body-left-item-icon block-body-left-item-icon-settings"></div> Settings <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink to="/profile?tab=notifications">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 2)}" @click="tab = 2">
            <div class="block-body-left-item-icon block-body-left-item-icon-notification"></div> Notifications <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
        <NuxtLink to="/profile?tab=security">
          <div class="block-body-left-item" :class="{'block-body-left-item-active':(tab === 3)}" @click="tab = 3">
            <div class="block-body-left-item-icon block-body-left-item-icon-locked"></div> Security <div class="block-body-left-item-icon-arr"></div>
          </div>
        </NuxtLink>
      </div>
      <div class="block-body-right">
        <template v-if="tab === 0">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Profile</div>
            <div class="block-body-right-desc">Edit your profile</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Alias</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="alias" readonly>
                    <div class="block-body-content-form-item-content-locked"></div>
                </div>
              </div>
                <div class="block-body-content-form-item">
                    <div class="block-body-content-form-item-title">Email</div>
                    <div class="block-body-content-form-item-content">
                        <input type="text" readonly v-model="email">
                        <div class="block-body-content-form-item-content-locked"></div>
                    </div>
                </div>
                <div class="block-body-content-form-item">
                    <div class="block-body-content-form-item-title">Phone</div>
                    <div class="block-body-content-form-item-content">
                        <input type="text" readonly v-model="phone">
                        <div class="block-body-content-form-item-content-locked"></div>
                    </div>
                </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Name</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Surname</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="surname">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Last name</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="last_name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <button class="block-body-content-form-item-button ajax-loading" :class="{'ajax-loading-hide':profileAjax}" @click="saveProfile">
                    <span>Save</span>
                    <div class="lds-dual-ring"></div>
                </button>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
        <template v-else-if="tab === 1">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Settings</div>
            <div class="block-body-right-desc">Customize your interface</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Language</div>
                <div class="block-body-content-form-item-content">
                  <select>
                    <option>English</option>
                  </select>
                </div>
              </div>
              <div class="block-body-content-form-switcher">
                <div class="block-body-content-form-switcher-title">Night mode</div>
                <div class="block-body-content-form-switcher-status" :class="{'block-body-content-form-switcher-status-active':mode}" @click="mode = !mode"><div class="block-body-content-form-switcher-status-in"></div></div>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
        <template v-else-if="tab === 2">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Notifications</div>
            <div class="block-body-right-desc">History of alerts, notifications, logs</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">

            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
        <template v-else-if="tab === 3">
          <div class="block-body-right-header">
            <div class="block-body-right-title">Security</div>
            <div class="block-body-right-desc">Manage access to your account</div>
          </div>
          <div class="block-body-content">
            <div class="block-body-content-form">
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Current password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="alias">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">New password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="name">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <div class="block-body-content-form-item-title">Repeat new password</div>
                <div class="block-body-content-form-item-content">
                  <input type="text" v-model="surname">
                </div>
              </div>
              <div class="block-body-content-form-item">
                <button class="block-body-content-form-item-button">Save</button>
              </div>
            </div>
            <extra-profile-content></extra-profile-content>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ExtraProfileContent from "../../components/profile/extraProfileContent.vue";

export default {
  components: {ExtraProfileContent},
  layout: 'admin',
  name: "index",
  data() {
    return {
      name: '',
      surname: '',
      last_name: '',
      mode: false,
        profileAjax: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
      alias() {
          let alias = '';
          if (this.user && this.user.auditor.user) {
            alias = this.user.auditor.user;
          }
          return alias;
      },
      email() {
          let email = '';
          if (this.user && this.user.auditor.email) {
              email = this.user.auditor.email;
          }
          return email;
      },
      phone() {
          let phone = '';
          if (this.user && this.user.auditor.phone) {
              phone = this.user.auditor.phone;
          }
          return phone;
      },
    tab() {
      let tab = 0;
      if (this.$route.query.tab) {
        let query  = this.$route.query.tab;
        if (query === 'settings') {
          tab = 1;
        } else if (query === 'notifications') {
          tab = 2;
        } else if (query === 'security') {
          tab = 3;
        }
      }
      return tab;
    }
  },
  mounted() {
    this.setValues();
  },
  methods: {
    setValues() {
      if (this.user) {
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.last_name = this.user.last_name;
      }
    },
      async saveProfile() {
          if (this.user) {
              this.profileAjax = true;
              let status = await this.$store.dispatch('localStorage/user_updateById', {
                  id: this.user.id,
                  name: this.name,
                  surname: this.surname,
                  last_name: this.last_name
              });
              if (status) {
                  this.setValues();

              }
              this.$notify({ type: 'success', text: 'The operation completed' })
              this.profileAjax = false;
          }
      },
  }
}
</script>

<style lang="scss">

</style>