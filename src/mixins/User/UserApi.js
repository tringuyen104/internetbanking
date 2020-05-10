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
    },
    fetchAccountTransactionsList () {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.account.userListSaved).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
        console.log(error)
      })
      return deferred
    },
    createRequestTransaction (data) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.transaction.transfers, data).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    confirmRequestTransaction (data) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.transaction.confirmation, data).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    addRecipient (obj) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.recipient.create, obj).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    updateRecipient (id, obj) {
      var deferred = this.$Jquery.Deferred()
      this.$api.put(urlApi.recipient.update(id), obj).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    deleteRecipient (id) {
      var deferred = this.$Jquery.Deferred()
      this.$api.delete(urlApi.recipient.delete(id)).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    recoverPasswordByEmail (data, email) {
      var deferred = this.$Jquery.Deferred()
      var url = urlApi.user.recoverPasswordByEmail + email
      this.$api.postWithFromData(url, data).then(res => {
        deferred.resolve(res)
      }, err => {
        deferred.reject(err)
      })

      return deferred
    },
    changePassword (data) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.user.changePassword, data).then(res => {
        deferred.resolve(res)
      }, err => {
        deferred.reject(err)
      })

      return deferred
    }
  }
}
