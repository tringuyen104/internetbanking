import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import './plugins/common'
import router from './router'
import { store } from './store'
import i18n from './i18n'
import ButtonFrom from './components/ButtonForm.vue'
import { sync } from 'vuex-router-sync'

sync(store, router)
i18n.locale = 'vn'
Vue.component('button-form', ButtonFrom)

window.app = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
