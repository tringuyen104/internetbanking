import { store } from '../store/index'
import router from '../router/index'
import bcrypt from 'bcryptjs'
export const loginHanlder = {
  signInUser (res) {
    let currentUser = this.hashUser(res.data.userInfo)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('login', this.hashLogin())
    localStorage.setItem('user', currentUser)
    store.commit('updateLogin', true)
    store.commit('updateUser', currentUser)
    router.replace({ name: 'home' })
  },
  signOutUser () {
    window.localStorage.clear()
    store.commit('updateLogin', false)
    store.commit('updateUser', '')
    router.replace({ name: 'home' })
  },
  updateToken (res) {
    localStorage.setItem('token', res.data.token)
  },
  hashLogin () {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync('isLogin', salt)
    return hash
  },
  hashUser (data) {
    let jsonData = data.username // JSON.stringify(data)
    let hash = btoa(jsonData)
    return hash
  }
}
