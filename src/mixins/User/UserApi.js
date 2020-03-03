import urlApi from '../url'
export default {
  methods: {
    login (user) {
      var deferred = this.$Jquery.Deferred()
      if (!user) {
        deferred.resolve('Check username and password')
        return deferred
      }

      this.$api.postWithFromData(urlApi.login, user).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    createUser (user) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.createUser, user).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    recharge (recharge) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.recharge, recharge).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
