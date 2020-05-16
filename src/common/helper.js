import { define } from '../common/define'
import moment from 'moment'
export const helper = {
  install (Vue, options) {
    Vue.prototype.$helper = {
      sortAsc (data, field) {
        let obj = Object.assign([], data)
        if (!obj || !Array.isArray(obj)) { return }
        return obj.sort((a, b) => { return a[field] > b[field] })
      },
      createDate () {
        return moment(new Date()).utc()
      },
      toast: {
        success: (refer, message, title) => {
          refer.$bvToast.toast(message, {
            // title: title,
            toaster: 'b-toaster-top-center',
            solid: true,
            variant: 'success',
            // appendToast: append,
            noCloseButton: true
          })
        },
        error: (refer, message, title) => {
          refer.$bvToast.toast(message, {
            // title: title,
            toaster: 'b-toaster-top-center',
            solid: true,
            variant: 'danger',
            // appendToast: append,
            noCloseButton: true
          })
        },
        warning: (refer, message, title) => {
          refer.$bvToast.toast(message, {
            // title: title,
            toaster: 'b-toaster-top-center',
            solid: true,
            variant: 'warning',
            // appendToast: append,
            noCloseButton: true
          })
        }
      },
      notification: {
        error (refer, error) {
          refer.$helper.toast.error(refer, error.response.data.message)
        }
      },
      callOneTimes (callBack, time, params) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          if (!params) { callBack() } else { callBack(params) }
        }, time)
      },
      formatTimeZone (dateTime) {
        let arrData = dateTime.split(':')
        let last = arrData[3]
        arrData.length = 3
        let newTime = arrData.join(':')
        return newTime + last
      },
      formatDatetime (dateTime) {
        if (!dateTime) { return '' }
        return moment(dateTime).format(define.formatDateTime)
      },
      formatCurrency (currency) {
        if (!currency) { return '' }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currency)
      },
      parseCurrency (currency) {
        if (!currency) { return 0 }
        return parseInt(
          currency
            .split(define.currency.groupSeparator)
            .join('')
            .replace(define.currency.suffix, '')
            .replace(',', '')
        )
      },
      checkAmount (value) {
        if (!value || value === '' || value === '0.00 ₫') { return false }
        return true
      }
    }
  }
}
