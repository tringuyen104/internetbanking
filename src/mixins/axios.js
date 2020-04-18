let axios = require('axios')
var querystring = require('querystring')

export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      token: 'Bearer ',
      config: {
        'Authorization': ''
      },
      // configHeader: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      // },
      get (url) {
        return axios.get(url, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
      },

      getNoneHeader (url) {
        return axios.get(url)
      },

      post (url, data) {
        console.log(3333)
        return axios.post(url, data, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
      },

      put (url, data) {
        return axios.put(url, data, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
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
        return axios.delete(url, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
      }
    }
  }
}
