let axios = require('axios')
let jQuery = require('jquery')
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
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      },
      get (url) {
        return axios.get(url, this.getConfig)
        // let deferred = jQuery.Deferred()
        // jQuery.ajax({
        //   url: url,
        //   type: 'GET',
        //   // dataType: 'json',
        //   headers: this.config.headers,
        //   // contentType: 'application/json; charset=utf-8',
        //   success: (response) => {
        //     let result = { data: response }
        //     deferred.resolve(result)
        //   },
        //   error: (error) => {
        //     deferred.reject(error)
        //   }
        // })
        // return deferred
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
