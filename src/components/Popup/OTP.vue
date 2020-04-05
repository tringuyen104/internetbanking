<template>
  <div>
    <b-modal ref="modal-otp" hide-footer :title="$t('inputOTP')" :id="idPopup">
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
      this.$validator
        .validateAll()
        .then(valid => {
          if (valid) {
            this.$emit('submitOtp', this.OTP)
            this.OTP = ''
            this.$refs['modal-otp'].hide()
          }
        })
        .catch(errors => {})
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['modal-otp'].toggle('#toggle-btn')
      this.OTP = ''
    }
  }
}
</script>
