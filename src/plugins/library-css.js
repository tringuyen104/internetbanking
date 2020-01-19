import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'))
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
