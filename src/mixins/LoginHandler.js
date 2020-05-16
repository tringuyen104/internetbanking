import store from '../store/index.js'
import router from '../router/index'
import bcrypt from 'bcryptjs'
export const loginHanlder = {
  signInUser (res) {
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('currentUser', this.hashLogin())
    localStorage.setItem('r', res.data.rl)
    localStorage.setItem('user', res.data.userInfo.username)
    store.commit('updateLogin', true)
    store.commit('updateUsername', res.data.userInfo.username)
    store.commit('updateR', res.data.rl)
    router.replace({ name: 'home' })
  },
  signOutUser () {
    localStorage.clear()
    location.reload(true)
    store.commit('updateLogin', false)
    store.commit('updateR', '')
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
    let jsonData = JSON.stringify(data)
    let hash = btoa(jsonData)
    return hash
  }
}
