import Vue from 'vue'
import { store } from './store'
import VueSocketIO from 'vue-socket.io'
import url from '.././mixins/url'

Vue.use(new VueSocketIO({
  debug: true,
  connection: url.basicUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: url.socketUrl } // Optional options
}))
