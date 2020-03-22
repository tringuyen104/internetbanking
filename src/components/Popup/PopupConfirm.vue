<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('confirmTransfersMoney')" :id="id">
      <div class="d-block">
        <div>
          <label class="label-info">
            {{ $t("accountId") }} </label
          ><br />
          <i class="far fa-user fa-lg">
          </i>
            &emsp;<span>{{ accountInfo.accountId }}</span>
        </div>
        <div class="margin-top-20">
          <label class="label-info">
            {{ $t("amountofmoney") }} </label
          ><br />
          <i class="fas fa-money-bill fa-lg"></i>
          &emsp;<span>{{ accountInfo.amount }}</span>
        </div>
      </div>
      <div class="d-flex margin-top-20">
        <b-button
          class="mt-3 col-md-6"
          variant="primary"
          block
          @click="confirm"
          >{{ $t("transfersMoney") }}</b-button
        >
        <b-button
          class="mt-3 col-md-6"
          variant="light"
          block
          @click="toggleModal"
          >{{ $t("cancel") }}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Function,
      required: true
    },
    accountInfo: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleModal () {
      this.$refs['my-modal'].hide()
    },
    confirm () {
      this.event()
      this.$refs['my-modal'].hide()
    }
  }
}
</script>
<style lang="scss">
.label-info {
  font-size: large;
}
</style>
