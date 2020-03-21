var callUrl = 'http://backoffice-env.uweekdg2rb.us-east-2.elasticbeanstalk.com:8080/'
// var callUrl = 'http://localhost:8080/'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  login: callUrl + 'authenticate',
  recharge: callUrl + 'accounts/recharge',
  account: {
    findAccountByAccountId: callUrl + 'accounts/account/',
    findAccountByUserName: callUrl + 'accounts/accounts/',
    deposit: callUrl + 'accounts/deposit'
  },
  transaction: {
    getHistory (startDate, endDate, page, size, accountId, type) {
      return callUrl + `transactions/account?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}&sort=date,desc&accountId=${accountId}&type=${type}`
    }
  },
  user: {
    create: callUrl + 'users/create'
  }
}
