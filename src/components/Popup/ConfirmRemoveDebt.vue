<template>
  <b-modal
    ref="modalConfirm"
    hide-footer
    :title="$t('confirm')"
    :id="idPopup"
  >
    <div class="d-block text-center">
      <b-form>
        <div class="confirm-content">
          <label class="form-label flex"> {{ $t("content") }}</label>
          <b-textarea
            id="content"
            name="content"
            v-model="context"
            v-validate="'required'"
          ></b-textarea>
        </div>
        <form-field-error :validation-errors="errors" :field="'content'" />
      </b-form>
    </div>
    <div class="d-flex">
      <b-button
        class="mt-3 col-md-6"
        variant="primary"
        block
        @click="comfirm"
        >{{ $t("debtReminderCancel") }}</b-button
      >
      <b-button class="mt-3 col-md-6" variant="light" block @click="hide">{{
        $t("cancel")
      }}</b-button>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    idPopup: {
      type: String,
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
          this.$emit('remove', this)
          this.hide()
        }
      })
    },
    hide () {
      this.$bvModal.hide(this.idPopup)
    }
  },
  created () {
    this.context = ''
  }
}
</script>
