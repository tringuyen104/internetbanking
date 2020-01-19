export const helper = {
  install (Vue, options) {
    Vue.prototype.$helper = {
      sortAsc (data, field) {
        let obj = Object.assign([], data)
        if (!obj || !Array.isArray(obj)) { return }
        return obj.sort((a, b) => { return a[field] > b[field] })
      }
    }
  }
}
