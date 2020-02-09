import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './plugins/library-css'
import './plugins/common'
import router from './router'
import store from './store'
import i18n from './i18n'
import { table } from './common/table'
import { helper } from './common/helper'

Vue.use(table)
Vue.use(helper)

i18n.locale = 'vn'

window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
