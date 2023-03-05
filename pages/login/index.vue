<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group shadow-sm rounded overflow-hidden">
          <div class="card p-4 border-0">
            <div class="card-body">
              <h1>{{ $t('Login') }}</h1>
              <p class="text-muted">{{ $t('Sign In to your account') }}</p>
              <div class="input-group mb-3">
                <input class="form-control" type="text" :placeholder="$t('Email')">
              </div>
              <div class="input-group mb-4">
                <input class="form-control" type="password" :placeholder="$t('Password')">
              </div>
              <div class="row d-flex align-items-center">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button">{{ $t('Login') }}</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link text-decoration-none px-0 forgot" type="button">{{ $t('Forgot password?') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none border-0">
            <div class="card-body text-center">
              <div>
                <h2>Immuniweb</h2>
                <p>{{ $t('Application Security Testing, Protection and Compliance For Over 1,000 Customers AI Fintech') }}</p>
                <a href="https://www.immuniweb.com/" target="_blank">
                  <button class="btn btn-primary active mt-3" type="button">immuniweb.com</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 d-flex align-items-center justify-content-center lang">
          <div v-for="(lang,key) in $i18n.locales" :key="key" class="lang-item" :class="{'text-muted':(lang.code !== $i18n.locale),'text-primary':(lang.code === $i18n.locale)}" @click="setLanguage(lang.code)">{{ lang.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',

  name: "index",
  head() {
    return {
      title: this.$t('Login'),
      bodyAttrs: {
        class: 'd-flex flex-row justify-content-center align-items-center bg-light'
      }
    }
  },
  methods: {
    setLanguage(code) {
      //this.$i18n.setLocaleCookie(code);
      this.$i18n.setLocale(code);
    }
  }
}
</script>

<style >
  body {
    min-height: 100vh;
  }
  .lang {
    gap: 15px;
  }
  .lang-item {
    cursor: pointer;
    font-size: 14px;
  }
  .forgot {
    font-size: 14px;
  }
</style>