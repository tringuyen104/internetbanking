import urlApi from '../url'
export default {
  methods: {
    fetchBankAssociated () {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.bank.associated).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
