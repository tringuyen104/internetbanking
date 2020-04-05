export const define = {
  role: {
    ad: 'admin',
    employee: 'staff'
  },
  formatDate: 'MM/DD/YYYY',
  formatDateTime: 'MM/DD/YYYY hh:mm A',
  formatTimeZoneLocal: 'YYYY-MM-DDTHH:mm:ss.000Z',
  // [DEPOSIT- Nhan Tien, WITHDRAW - Rut Tien, TRANSFER - Chuyen Tien, PAYMENT - Thanh Toan No]
  method: {
    payment: 'PAYMENT',
    deposit: 'DEPOSIT',
    transfers: 'TRANSFER',
    withdraw: 'WITHDRAW'
  },
  feeType: {
    receiver: 'RECEIVER',
    sender: 'SENDER'
  },
  currency: {
    suffix: ' ₫',
    groupSeparator: ','
  }
}
