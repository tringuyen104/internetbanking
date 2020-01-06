import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './validation/vee-validate'
import './config/library-css'
import router from './router'
import store from './store'
import i18n from './i18n'

i18n.locale = 'vn'

window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
