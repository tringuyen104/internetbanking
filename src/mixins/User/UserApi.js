import urlApi from '../url'
export default {
  methods: {
    login (user) {
      var deferred = this.$Jquery.Deferred()
      if (!user) { deferred.resolve('Check username and password') }

      this.$api.postWithFromData(urlApi.login, user).then(reponse => {
        console.log(reponse)
        deferred.resolve(reponse)
      }, error => {
        console.log(error)
        deferred.reject(error)
      })
      return deferred
    },
    test (url) {
      var deferred = this.$Jquery.Deferred()
      // if (!user) { deferred.resolve('Check username and password') }

      this.$api.getNoneHeader(url).then(reponse => {
        console.log(reponse)
        deferred.resolve(reponse)
      }, error => {
        console.log(error)
        deferred.reject(error)
      })
      return deferred
    }
  }
}
