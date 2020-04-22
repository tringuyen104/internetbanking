import { define } from '../common/define'
import moment from 'moment'
export const helper = {
  install (Vue, options) {
    Vue.prototype.$helper = {
      timeout: null,
      typeTransaction: {
        recive: 'recive',
        transfers: 'transfers',
        payment: 'payment'
      },
      sortAsc (data, field) {
        let obj = Object.assign([], data)
        if (!obj || !Array.isArray(obj)) { return }
        return obj.sort((a, b) => { return a[field] > b[field] })
      },
      handlerError (error) {
        if (!error || !error.code) return

        switch (error.code) {
          case 404:
            alert('Khong tim thay trang')
            break
        }
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
      callOneTimes (callBack, time, params) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(params ? callBack(params) : callBack(), time)
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
      }
    }
  }
}
