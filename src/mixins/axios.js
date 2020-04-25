import urlApi from '../url'
let axios = require('axios')
let querystring = require('querystring')
export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      token: 'Bearer ',
      config: {
        'Authorization': ''
      },
      refeshToken () {
        this.get(urlApi.refeshToken).then(res => {
          console.log(res.data)
        // eslint-disable-next-line handle-callback-err
        }, err => {
          window.location = '/'
        })
      },
      get (url) {
        return axios.get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
      },
      getNoneHeader (url) {
        return axios.get(url)
      },
      post (url, data) {
        return axios.post(url, data, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
      },
      postWithFromData (url, data) {
        return axios.post(url, querystring.stringify(data))
      },
      delete (url) {
        return axios.delete(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
      },
      deleteWithModel (url, obj) {
        return axios.delete(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          data: obj
        })
      },
      put (url, data) {
        return axios.put(url, data, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
      }
    }
  }
}
