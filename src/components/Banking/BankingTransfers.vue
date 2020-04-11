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
    }

  }
}
</script>
