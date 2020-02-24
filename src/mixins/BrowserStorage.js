export default {
  methods: {
    setItemInLocalStorage (key, value) {
      this.setItemInStorage(window.localStorage, key, value)
    },
    setItemInSessionStorage (key, value) {
      this.setItemInStorage(window.sessionStorage, key, value)
    },
    getItemInLocalStorage (key, value) {
      this.getItemFromStorage(window.localStorage, key, value)
    },
    getItemInSessionStorage (key, value) {
      this.getItemFromStorage(window.sessionStorage, key, value)
    },
    removeItemInLocalStorage (key) {
      this.removeItemFromStorage(window.localStorage, key)
    },
    removeItemInSessionStorage (key) {
      this.removeItemFromStorage(window.sessionStorage, key)
    },
    checkExistItemInLocalStorage (key) {
      this.checkExistItemInStorage(window.localStorage, key)
    },
    checkExistItemInSessionStorage (key) {
      this.checkExistItemInStorage(window.sessionStorage, key)
    },
    getItemFromStorage (storage, key, defaultValue) {
      if (!storage) {
        return
      }

      try {
        return storage.getItem(key) || defaultValue
      } catch (_exception) {
        return defaultValue
      }
    },
    removeItemFromStorage (storage, key) {
      if (!storage) {
        return
      }

      try {
        storage.removeItem(key)
      } catch (_exception) { }
    },
    setItemInStorage (storage, key, value) {
      if (!storage) {
        return
      }

      try {
        storage.setItem(key, value)
      } catch (_exception) { }
    },
    checkExistItemInStorage (storage, key) {
      if (!storage) {
        return
      }

      try {
        return !!storage.getItem(key)
      } catch (_exception) {
        return false
      }
    }
  }
}
