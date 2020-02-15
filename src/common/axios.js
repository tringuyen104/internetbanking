let axios = require('axios')

export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      token: 'Bearer ',
      config: {
        'Authentication': this.token
      },
      get (url) {
        return axios.get(url, {
          headers: this.config
        })
      },
      getNoneToken (url) {
        return axios.get(url)
      },
      post (url, data) {
        return axios.post(url, data, {
          headers: this.config
        })
      },
      postNoneToken (url, data) {
        return axios.post(url, data)
      }
    }
  }
}
