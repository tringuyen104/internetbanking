var callUrl = 'http://backoffice-env.uweekdg2rb.us-east-2.elasticbeanstalk.com:8080/'
// var callUrl = 'http://localhost:8080/'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  login: callUrl + 'authenticate',
  recharge: callUrl + 'accounts/recharge',
  account: {
    findAccountByAccountId: callUrl + 'accounts/account/',
    findByAccountIdAndBankId (accountId, bankId) {
      return `${callUrl}accounts?accountId=${accountId}&bankId=${!bankId ? '' : bankId}`
    },
    findAccountByUserName: callUrl + 'accounts/accounts/',
    deposit: callUrl + 'accounts/deposit'
  },
  transaction: {
    getHistory (startDate, endDate, page, size, accountId, type) {
      return callUrl + `transactions/account?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}&sort=date,desc&accountId=${accountId}&type=${type}`
    },

    getCrossCheck (startDate, endDate, page, size, type) {
      return callUrl + `transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}&sort=date&type=${type}`
    }
  },
  user: {
    createUser: callUrl + 'users/create',
    createEmployee: callUrl + 'users/employee/create',
    changePassword: callUrl + 'users/password',
    recoverPasswordByEmail: callUrl + 'users/recover/',
    getUserInfo: callUrl + 'users/employee/',
    editEmployeeInfor: callUrl + 'users/employee/',
    removeEmployee: callUrl + 'users/'
  },
  bank: {
    associated: callUrl + 'banks'
  }
}
