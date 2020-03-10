import urlApi from '../url'
export default {
  methods: {
    login (user) {
      var deferred = this.$Jquery.Deferred()
      if (!user) { deferred.resolve('Check username and password') }

      this.$api.postWithFromData(urlApi.login, user).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    getListCard () {
      var deferred = this.$Jquery.Deferred()
      this.$api.config.Authentication = this.$api.token
      // if (!user) { deferred.resolve('Check username and password') }
      this.$api.get(urlApi.listCard).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
