import urlApi from '../url'
export default {
  methods: {
    userLogin (user) {
      var deferred = this.$Jquery.Deferred()
      if (!user) { deferred.resolve('Check username and password') }

      this.$api.postNoneToken(urlApi.login).then(reponse => {
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

      this.$api.getNoneToken(url).then(reponse => {
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
