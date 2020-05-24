import urlApi from '../url'
import { define } from '../../common/define'
// import { define } from '../../common/define'
export default {
  methods: {
    fetchAccountByAccountId (accountId, bankId) {
      var deferred = this.$Jquery.Deferred()
      if (!accountId) {
        deferred.resolve({
          err: 404,
          mess: 'Please input value'
        })
        return deferred
      }
      let url = urlApi.account.findByAccountIdAndBankId(accountId, bankId)
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
      url = urlApi.transaction.getHistory(startDate, endDate, page, size, search, type)
      this.$api.get(url).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },

    getCrossCheck (bankId, type, startDate, endDate, page, size) {
      let deferred = this.$Jquery.Deferred()
      let url = ''
      // if (!bankId || bankId === '') {
      //   deferred.reject('Please input data')
      //   return deferred
      // }
      if (!page) page = 0
      if (!size) size = 100
      startDate = this.$helper.formatTimeZone(this.$moment(startDate).format(define.formatTimeZoneLocal))
      endDate = this.$helper.formatTimeZone(this.$moment(endDate).format(define.formatTimeZoneLocal))
      startDate = encodeURIComponent(startDate)
      endDate = encodeURIComponent(endDate)
      url = urlApi.transaction.getCrossCheck(bankId, startDate, endDate, page, size, type)
      this.$api.get(url).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
