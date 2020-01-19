export const helper = {
  install (Vue, options) {
    Vue.prototype.$helper = {
      sortAsc (data, field) {
        if (!data) { return }
        return data.sort((a, b) => { return a[field] > b[field] })
      }
    }
  }
}
