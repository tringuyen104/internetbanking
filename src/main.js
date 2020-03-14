import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import './plugins/common'
import router from './router'
import store from './store'
import i18n from './i18n'
import FormFieldError from './components/Errors/FormFieldError'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const VueInputMask = require('vue-inputmask').default

// import { table } from './common/table'
// import { helper } from './common/helper'

// Vue.use(table)
// Vue.use(helper)
Vue.use(VueInputMask)
Vue.component('form-field-error', FormFieldError)
Vue.component('loading', Loading)
i18n.locale = 'vn'

window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
