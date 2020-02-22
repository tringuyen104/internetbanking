let axios = require('axios')
var querystring = require('querystring')

export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      token: 'Bearer ',
      config: {
        'Authentication': this.token
      },
      // configHeader: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      // },
      get (url) {
        return axios.get(url, {
          headers: this.config
        })
      },
      getNoneHeader (url) {
        return axios.get(url)
      },
      post (url, data, headers) {
        if (!headers) { return this.postNoneHeader(url, data) } else { return this.postWithHeader(url, data, headers) }
      },
      postNoneHeader (url, data) {
        return axios.post(url, data, {
          headers: this.config
        })
      },
      postWithHeader (url, data, headers) {
        return axios.post(url, data, {
          headers: headers
        })
      },
      postWithFromData (url, data) {
        return axios.post(url, querystring.stringify(data))
      }
    }
  }
}
