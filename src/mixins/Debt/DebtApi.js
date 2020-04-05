import urlApi from '../url'
export default {
  methods: {
    createDebtReminder (data) {
      var deferred = this.$Jquery.Deferred()
      if (!data) { deferred.resolve('Check username and password') }

      this.$api.post(urlApi.debt.create, data).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
