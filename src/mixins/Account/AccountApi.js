import urlApi from '../url'
// import { define } from '../../common/define'
export default {
  methods: {
    fetchAccountByAccountId (value, bankId) {
      var deferred = this.$Jquery.Deferred()
      if (!value) {
        deferred.resolve({
          err: 404,
          mess: 'Please input value'
        })
        return deferred
      }
      let url = urlApi.account.urlFindByAccountIdAndBankId(value, bankId)
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
      let url = urlApi.account.urlFindByUserName + value
      this.$api.get(url).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    getHistoryTransaction (search, type, startDate, endDate, page, size) {
      let deferred = this.$Jquery.Deferred()
      let url = ''
      if (!search || search === '') {
        deferred.reject('Please input data')
        return deferred
      }
      if (!page) page = 0
      if (!size) size = 100
      startDate = this.$helper.formatTimeZone(startDate)
      endDate = this.$helper.formatTimeZone(endDate)
      startDate = encodeURIComponent(startDate)
      endDate = encodeURIComponent(endDate)
      url = urlApi.transaction.history(startDate, endDate, page, size, search, type)
      console.log(url)
      this.$api.get(url).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
