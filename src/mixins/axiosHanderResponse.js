import axios from 'axios'
import urlApi from './url'
import { loginHanlder } from '../mixins/LoginHandler'
export default () => {
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status === 401) {
      // Do something with response error
      console.log('unauthorized, logging out ...')
      axios.get(urlApi.refeshToken,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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
