<template>
  <b-modal ref="modalConfirm" hide-footer :title="$t('transactionConfirm')" :id="idPopup">
    <div class="d-block text-center content-confirm-payment">
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("transfersFor") }}</strong>
        </label>
        <label
          class="form-label flex"
        ><i class="far fa-user fa-lg"></i>{{item.fullName}}</label>
      </div>
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("money") }}</strong>
        </label>
        <label class="form-label flex"><i class="fas fa-money-bill fa-lg"></i>{{$helper.formatCurrency(item.amount)}}</label>
      </div>
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("transactionFee") }}</strong>
        </label>
        <label class="form-label flex"><i class="fas fa-shipping-fast fa-lg"></i>{{$helper.formatCurrency(item.fee)}}</label>
      </div>
      <div class="confirm-content">
        <label class="form-label flex">
          <strong>{{ $t("content") }}</strong>
        </label>
        <label class="form-label flex"><i class="fas fa-sticky-note fa-lg"></i>{{item.content}}</label>
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
<style lang="scss">
.content-confirm-payment {
  i {
    margin-top: 3px;
    margin-right: 10px;
    color: #797d81;
  }
}
</style>
