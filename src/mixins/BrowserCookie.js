export const cookie = {
  methods: {
    addItemToCookie: (key, value) => {
      if (!key || !value) { return }
      document.cookie = key + '=' + value
    },
    getItemFromCookie: (key) => {
      if (!key) return
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    }
  }
}
