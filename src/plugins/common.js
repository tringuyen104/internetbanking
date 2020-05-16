import Vue from 'vue'
import { restFullAPi } from '../mixins/axios'
import { helper } from '../common/helper'
import { table } from '../common/table'
import { cookie } from '../mixins/BrowserCookie'
import axiosHanderResponse from '../mixins/axiosHanderResponse'

Vue.use(cookie)
Vue.use(helper)
Vue.use(table)
Vue.use(restFullAPi)
Vue.use(axiosHanderResponse)
Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$Jquery = require('jquery') // you'll have this.$jQuery anywhere in your vue project
  }
})
