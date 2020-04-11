<template>
  <b-modal ref="modalConfirm" hide-footer :title="$t('confirmPayment')" :id="idPopup">
    <div class="d-block text-center">
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("mortgagee") }}</strong>
        </label>
        <label
          class="form-label flex"
          v-if="item.userHolder"
        >{{`${item.userHolder.firstName} ${item.userHolder.lastName}`}}</label>
      </div>
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("money") }}</strong>
        </label>
        <label class="form-label flex">{{$helper.formatCurrency(item.amount)}}</label>
      </div>
    </div>
    <div class="d-flex">
      <b-button
        class="mt-3 col-md-6"
        variant="primary"
        block
        @click="comfirm"
      >{{ $t("payment") }}</b-button>
      <b-button class="mt-3 col-md-6" variant="light" block @click="hide">
        {{
        $t("cancel")
        }}
      </b-button>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    idPopup: {
      type: String,
      required: true
    }
  },
  methods: {
    comfirm () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$emit('payment', this.item.id)
          this.hide()
        }
      })
    },
    hide () {
      this.$bvModal.hide(this.idPopup)
    }
  }
}
</script>
