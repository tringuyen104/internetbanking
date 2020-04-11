export const table = {
  install (Vue, options) {
    Vue.prototype.$table = {
      fields: {
        debtReminder: [
          {
            key: 'userHolder',
            label: 'Người tạo',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'amount',
            label: 'Số tiền',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'createDate',
            label: 'Ngày tạo',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'action',
            label: '',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          }
        ],
        transaction: {
          recive: [
            {
              key: 'source',
              label: 'Tài khoản nhận tiền',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'amount',
              label: 'Số tiền',
              thClass: 'alert alert-info text-right',
              tdClass: 'alert alert-warning text-right'
            },
            {
              key: 'createdDate',
              label: 'Ngày nhận',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'content',
              label: 'Nội dung',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            }
          ],
          forward: [
            {
              key: 'source',
              label: 'Tài khoản trích tiền',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'amount',
              label: 'Số tiền',
              thClass: 'alert alert-info text-right',
              tdClass: 'alert alert-warning text-right'
            },
            {
              key: 'createdDate',
              label: 'Ngày chuyển',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'content',
              label: 'Nội dung',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            }
          ],
          payment: [
            {
              key: 'source',
              label: 'Tài khoản trích tiền',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'amount',
              label: 'Số tiền',
              thClass: 'alert alert-info text-right',
              tdClass: 'alert alert-warning text-right'
            },
            {
              key: 'createdDate',
              label: 'Ngày thanh toán',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'content',
              label: 'Nội dung',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            }
          ]
        },
        recipient: [
          {
            key: 'index',
            label: 'STT',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'accountId',
            label: 'Số tài khoản',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'nameSuggestion',
            label: 'Tên gợi nhớ',
            thClass: 'alert alert-info  text-left',
            tdClass: 'alert alert-warning  text-left'
          },
          {
            key: 'action',
            label: '',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          }
        ]
      }
    }
  }
}
