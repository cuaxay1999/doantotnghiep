import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import i18n from '@/plugins/i18n'
import '@/plugins/chart'

import '@/styles/index.scss' // Global css

import App from '@/App.vue'
import router from '@/routers'
import store from '@/stores'

// import injectFormValidates from '@/mixins/inject-form-validate'

import '@/permission'

import '@/components' // global components

import '@/plugins/bus'

import '@/icons' // icon

import request from '@/utils/request'
Vue.prototype.$axios = request

import Message from '@/utils/message'
Vue.prototype.$vmess = Message

// base url
Vue.prototype.$cloudinaryUrl = process.env.VUE_APP_CLOUDINARY_URL
Vue.prototype.$imgPreset = process.env.VUE_APP_CLOUDINARY_PRESET

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

import injectFormValidates from '@/mixins/validation'
Vue.mixin(injectFormValidates)
import 'windi.css'

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
