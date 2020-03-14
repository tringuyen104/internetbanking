import urlApi from '../url'
export default {
  methods: {
    fetchAccountByAccountId (value) {
      var deferred = this.$Jquery.Deferred()
      if (!value) {
        deferred.resolve({
          err: 404,
          mess: 'Please input value'
        })
        return deferred
      }
      let url = urlApi.account.findAccountByAccountId + value
      console.log(url)
      this.$api.get(url).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchAccountsByUserName (value) {
      var deferred = this.$Jquery.Deferred()
      if (!value) {
        deferred.resolve({
          err: 404,
          mess: 'Please input value'
        })
        return deferred
      }
      let url = urlApi.account.findAccountByUserName + value
      this.$api.get(url).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
