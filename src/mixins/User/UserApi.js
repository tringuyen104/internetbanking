import urlApi from 'urlApi'
export default {
  mixins: [urlApi],
  methods: {
    login (user) {
      var deferred = Promise.defer()
      if (!user) { deferred.resolve('Check username and password') }

      this.$axios.postNoneToken(this.login).then(reponse => {
        console.log(reponse)
      }, error => {
        console.log(error)
      })
    }
  }
}
