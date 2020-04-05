var callUrl = 'http://backoffice-env.uweekdg2rb.us-east-2.elasticbeanstalk.com:8080/'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  login: callUrl + 'authenticate',
  listCard: callUrl + 'accounts/user',
  debt: {
    create: callUrl + 'debt/create'
  },
  account: {
    urlFindByAccountId: callUrl + 'accounts/account/',
    urlFindByUserName: callUrl + '/accounts/username/',
    deposit: callUrl + 'accounts/deposit',
    userListSaved: callUrl + 'receivers',
    urlFindByBankId (bankId, accountId) { return `${callUrl}accounts/bank/${bankId}/${accountId}` }
  },
  transaction: {
    history (startDate, endDate, page, size, accountId, type) {
      return `${callUrl}transactions/account?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}&sort=date,desc&accountId=${accountId}&type=${type}`
    },
    transfers: callUrl + 'transactions/request',
    confirmation: callUrl + 'transactions/confirmation' // confirmation
  },
  bank: {
    associated: callUrl + 'banks'
  }
}
