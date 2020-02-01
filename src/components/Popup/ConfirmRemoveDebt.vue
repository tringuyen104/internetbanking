<template>
  <b-modal
    ref="modalConfirm"
    hide-footer
    :title="$t('confirm')"
    id="modal-confirm"
  >
    <div class="d-block text-center">
      <b-form>
        <label class="form-label"> {{ $t("content") }}</label>
        <b-textarea
          id="content"
          name="content"
          v-model="context"
          v-validate="'required'"
        ></b-textarea>
        <form-field-errors :validation-errors="errors" :field="'content'" />
      </b-form>
    </div>
    <div class="d-flex">
      <b-button
        class="mt-3 col-md-6"
        variant="primary"
        block
        @click="comfirm"
        >{{ $t("confirm") }}</b-button
      >
      <b-button class="mt-3 col-md-6" variant="light" block @click="cancel">{{
        $t("cancel")
      }}</b-button>
    </div>
  </b-modal>
</template>
<script>
import FormFieldErrors from '../Errors/FormFieldError.vue'
export default {
  components: {
    FormFieldErrors
  },
  props: {
    // context: {
    //   type: String,
    //   required: true
    // },
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      context: ''
    }
  },
  methods: {
    comfirm () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let data = [
            {
              isActive: true,
              age: 40,
              id: 1,
              creator: 'Dickerson',
              money: '12.000.000',
              created: new Date()
            }
          ]

          this.$store.commit('updateLstDebtData', data)
          this.$refs['modalConfirm'].hide()
        } else {
          console.log('none')
        }
      }).catch(errors => {
        console.log('errors')
      })
    },
    cancel () {
      this.$bvModal.hide('modal-confirm')
      this.context = ''
    }
  },
  created () {
    this.context = ''
  }
}
</script>
