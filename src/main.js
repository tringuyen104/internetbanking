import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import router from './router'
import { store } from './store'
import { restFullAPi } from './common/axios'
import { helper } from './common/helper'
import { table } from './common/table'
import { cookie } from './mixins/BrowserCookie'
import i18n from './i18n'
import ButtonFrom from './components/ButtonForm.vue'

i18n.locale = 'vn'
Vue.component('button-form', ButtonFrom)
Vue.use(cookie)
Vue.use(helper)
Vue.use(table)
Vue.use(restFullAPi)

window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
