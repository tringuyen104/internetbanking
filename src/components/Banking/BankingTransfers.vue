<script>
import Transfer from '../Form/Transfer.vue'
export default {
  extends: Transfer,
  data () {
    return {
      idPopup: 'transfers-inside'
    }
  },
  methods: {
    transfers () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let obj = this.parseData()
          this.createRequestTransaction(obj).then(
            res => {
              this.$set(this, 'confirmationId', res.data.id)
              this.$bvModal.show(this.idOTPopup)
            }, err => {
              this.$helper.notification.error(this, err)
            }
          )
        }
      })
    },
    submitOtp (otpCode) {
      let obj = this.parseDataConfirm(otpCode)
      this.confirmRequestTransaction(obj).then(res => {
        this.$helper.toast.success(this, this.$t('transfersSuccess'))
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$helper.notification.error(this, err)
      })
    }

  }
}
</script>
