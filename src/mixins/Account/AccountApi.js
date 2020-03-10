import urlApi from '../url'
export default {
  methods: {
    findAccountByAccountId (value) {
      var deferred = this.$Jquery.Deferred()
      if (!value) {
        deferred.resolve({
          err: 404,
          mess: 'Please input value'
        })
        return deferred
      }
      let url = urlApi.account.findAccount + value
      console.log(url)
      this.$api.get(url).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
