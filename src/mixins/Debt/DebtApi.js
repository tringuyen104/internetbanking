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
    },
    fetchPlaylistDebt () {
      var deferred = this.$Jquery.Deferred()

      this.$api.get(urlApi.debt.playlistDebt).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchUnpayDebt () {
      var deferred = this.$Jquery.Deferred()

      this.$api.get(urlApi.debt.unpay).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    paymentDebt (id) {
      var deferred = this.$Jquery.Deferred()

      this.$api.put(urlApi.debt.payment(id)).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    deleteDebt (id) {
      var deferred = this.$Jquery.Deferred()

      this.$api.delete(urlApi.debt.delete(id)).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
