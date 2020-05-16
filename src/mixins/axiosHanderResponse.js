import axios from 'axios'
import urlApi from './url'
import { loginHanlder } from '../mixins/LoginHandler'
export default () => {
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    let token = localStorage.getItem('token')
    if (error.response.status === 401 && token) {
      // Do something with response error
      console.log('unauthorized, logging out ...')
      axios.get(urlApi.refeshToken,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            loginHanlder.updateToken(res)
            location.reload()
            return Promise.resolve(res)
          }
          // loginHanlder.signOutUser()
          return Promise.reject(error)
        // eslint-disable-next-line handle-callback-err
        }, err => {
          loginHanlder.signOutUser()
          return Promise.reject(error)
        })
    }
    return Promise.reject(error)
  })
}
