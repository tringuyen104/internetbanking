<template>
  <div class="col-lg-6" id="transfersForm">
    <OTP/>
    <form @submit.prevent="transfers">
      <div class="form-group">
        <label for="account">{{ $t("accountDestination") }}</label>
        <select class="form-control" id="account">
          <option>Account 1</option>
          <option>Account 2</option>
          <option>Account 3</option>
          <option>Account 4</option>
          <option>Account 5</option>
        </select>
      </div>
      <div class="form-group">
        <label for="recipientAccount">{{ $t("recipientAccount") }}</label>
        <input type="number" class="form-control" id="recipientAccount" />
      </div>
      <div class="form-group" v-if="!isInside">
        <label for="bank">{{ $t("bank") }}</label>
        <select class="form-control" id="bank">
          <option>Account 1</option>
          <option>Account 2</option>
          <option>Account 3</option>
          <option>Account 4</option>
          <option>Account 5</option>
        </select>
      </div>
      <div class="form-group">
        <label for="accountName">{{ $t("name") }}</label>
        <input type="text" class="form-control" id="accountName" disabled />
      </div>
      <div class="form-group">
        <label for="amount">{{ $t("amount") }}</label>
        <input type="text" class="form-control" id="amount" />
      </div>
      <div class="form-group">
        <label for="context">{{ $t("content") }}</label>
        <textarea class="form-control" id="context" rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="payments">{{ $t("payments") }}</label>
        <select class="form-control" id="payments">
          <option>Người nhận trả phí</option>
          <option>Người gửi trả</option>
        </select>
      </div>
      <!-- <div class="form-group">
        <button type="submit" class="btn btn-primary">{{ $t('transfers') }}</button>
        <button type="button" class="btn btn-light" :to="{name: 'home'}">{{ $t('cancel') }}</button>
      </div> -->
      <button-form :titleSubmit="$t('transfers')"></button-form>
    </form>
  </div>
</template>
<script>
import OTP from '../Popup/OTP.vue'
export default {
  components: {
    OTP: OTP
  },
  props: {
    isInside: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    transfers () {
      console.log('Run')
      this.$emit('showModal')
      this.$bvModal.show('modal-otp')
    }
  }
}
</script>
<style lang="scss" scoped>
#transfersForm {
  margin: auto;
  border: solid;
  border-radius: 10px;
  padding: 15px 30px 0px;
}

label {
  display: flex;
}
</style>
