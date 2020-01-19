export const table = {
  install (Vue, options) {
    Vue.prototype.$table = {
      fields: {
        debtReminder: [
          {
            key: 'creator',
            label: 'Người tạo',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'money',
            label: 'Số tiền',
            thClass: 'alert alert-info',
            tdClass: 'alert alert-warning'
          },
          {
            key: 'created',
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
          reciver: [
            {
              key: 'creator',
              label: 'Người chuyển',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'money',
              label: 'Số tiền',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'created',
              label: 'Ngày chuyển',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            }
          ],
          forward: [
            {
              key: 'creator',
              label: 'Người nhận',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'money',
              label: 'Số tiền',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            },
            {
              key: 'created',
              label: 'Ngày chuyển',
              thClass: 'alert alert-info',
              tdClass: 'alert alert-warning'
            }
          ]
        }
      }
    }
  }
}
