var callUrl = 'http://172.16.2.26:8080/'
export const urlApi = {
  data () {
    return {
      login: callUrl + 'authenticate'
    }
  }
}
