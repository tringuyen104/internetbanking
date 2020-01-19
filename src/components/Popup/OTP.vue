<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('inputOTP')" :id="idPopup">
      <div class="d-block text-center">
        <b-form-input
          id="OTP"
          name="OTP"
          v-model="OTP"
          v-validate="'required'"
        ></b-form-input>
        <form-field-errors :validation-errors="errors" :field="'OTP'" />
      </div>
      <div class="d-flex">
        <b-button
          class="mt-3 col-md-6"
          variant="primary"
          block
          @click="comfirm"
          >{{ $t("confirm") }}</b-button
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
import FormFieldErrors from '../Errors/FormFieldError.vue'
export default {
  props: {
    transfersData: {
      type: Object,
      required: true
    },
    idPopup: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      OTP: ''
    }
  },
  components: {
    FormFieldErrors
  },
  methods: {
    comfirm () {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        console.log(this.errors.any())
        if (this.transfersData.unPay) {
          let data = Object.assign([], this.$store.state.debtReminder.unPayData)
          data.pop()
          // var data = [{
          //   isActive: true,
          //   age: 38,
          //   creator: 'Jami',
          //   created: new Date(),
          //   money: '12,224,444.00'
          // }]
          this.$store.commit('updateUnpayData', data)
        }
      } else {
        console.log('None error')
        // this.$refs['my-modal'].hide()
      }
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  }
}
</script>
