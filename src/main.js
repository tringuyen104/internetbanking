import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import router from './router'
import { store } from './store'
import { helper } from './common/helper.js'
import { table } from './common/table.js'
import i18n from './i18n'
import ButtonFrom from './components/ButtonForm.vue'

i18n.locale = 'vn'
Vue.component('button-form', ButtonFrom)
Vue.use(helper)
Vue.use(table)
window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
