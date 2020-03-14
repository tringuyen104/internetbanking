var callUrl = 'http://backoffice-env.uweekdg2rb.us-east-2.elasticbeanstalk.com:8080/'
// var callUrl = 'http://localhost:8080/'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  login: callUrl + 'authenticate',
  listCard: callUrl + 'accounts/user',
  createUser: callUrl + 'users/create',
  recharge: callUrl + 'accounts/recharge',
  account: {
    findAccountByAccountId: callUrl + 'accounts/account/',
    findAccountByUserName: callUrl + 'accounts/accounts/',
    deposit: callUrl + 'accounts/deposit'
  },
  historyTransaction: {
    recive: callUrl + '',
    transfers: callUrl + '',
    payment: callUrl + ''
  }
}
