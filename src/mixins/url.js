var callUrl = 'http://backoffice-env.uweekdg2rb.us-east-2.elasticbeanstalk.com:8080/'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  refeshToken: callUrl + 'refesh',
  login: callUrl + 'authenticate',
  listCard: callUrl + 'accounts/user',
  debt: {
    create: callUrl + 'debt/create',
    unpay: callUrl + 'debt/debtor',
    playlistDebt: callUrl + 'debt/holderanddebtor/0',
    payment (id) {
      return `${callUrl}debt/pay/${id}`
    },
    delete (id) {
      return `${callUrl}debt/cancel/${id}`
    }
  },
  account: {
    urlFindByAccountId: callUrl + 'accounts/account/',
    urlFindByUserName: callUrl + '/accounts/username/',
    deposit: callUrl + 'accounts/deposit',
    userListSaved: callUrl + 'receivers',
    urlFindByAccountIdAndBankId (accountId, bankId) { return `${callUrl}accounts?accountId=${accountId}&bankId=${!bankId ? '' : bankId}` }
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
  },
  recipient: {
    create: callUrl + 'receivers/create',
    delete (id) { return `${callUrl}receivers/${id}` },
    update (id) { return `${callUrl}receivers/update/${id}` }
  }
}
