export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'immuniweb',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicons/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-touch-icon.png' },
      {
        rel: 'preconnect', href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true
      },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
      }
    ]
  },



  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/custom.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/repository.js', mode: 'client', ssr: false },
    { src: '~/plugins/auth.js', mode: 'client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      '@nuxtjs/dotenv'
  ],
  loading: {
    color: '#0b76a6',
    height: '2px'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
     'nuxt-vuex-localstorage',
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader']
      }
    ]
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.js'
      }
    ]
  },
  axios: {
    proxy: false,
    baseURL: process.env.BASE_URL
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
