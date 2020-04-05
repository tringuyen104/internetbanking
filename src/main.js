import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import './plugins/common'
import { store } from './store'
import { sync } from 'vuex-router-sync'
import router from './router'
import i18n from './i18n'
import ButtonFrom from './components/ButtonForm.vue'
import SearchInput from './components/Form/SearchInput.vue'
import FormFieldError from './components/Errors/FormFieldError'
import Loading from 'vue-loading-overlay'
import vSelect from 'vue-select'

import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue-select/dist/vue-select.css'

const VueInputMask = require('vue-inputmask').default

sync(store, router)
i18n.locale = 'vn'
Vue.component('button-form', ButtonFrom)
Vue.component('search-input', SearchInput)
Vue.component('v-select', vSelect)
Vue.use(VueInputMask)
Vue.component('form-field-error', FormFieldError)
Vue.component('loading', Loading)

window.app = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
