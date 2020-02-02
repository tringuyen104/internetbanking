import Vue from 'vue'
import { restFullAPi } from '../common/axios'
import { helper } from '../common/helper'
import { table } from '../common/table'
import { cookie } from '../mixins/BrowserCookie'

Vue.use(cookie)
Vue.use(helper)
Vue.use(table)
Vue.use(restFullAPi)
