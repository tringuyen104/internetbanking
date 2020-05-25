let axios = require('axios')
var querystring = require('querystring')

export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      token: 'Bearer ',
      config: {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      },
      getConfig: {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'
        }
      },
      get (url) {
        return axios.get(url, this.getConfig)
      },

      getNoneHeader (url) {
        return axios.get(url)
      },

      post (url, data) {
        return axios.post(url, data, this.config)
      },

      put (url, data) {
        return axios.put(url, data, this.config)
      },

      postNoneHeader (url, data) {
        return axios.post(url, data, {
          headers: this.config
        })
      },

      postWithFromData (url, data) {
        return axios.post(url, querystring.stringify(data))
      },

      postNoneBody (url) {
        return axios.post(url)
      },

      delete (url) {
        return axios.delete(url, this.config)
      }
    }
  }
}
