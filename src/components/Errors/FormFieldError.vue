<template>
  <div class="validation-message" v-show="validationErrors.has(field)">
    <i class="fas fa-exclamation" focusable="false"></i>&nbsp;
    <span>{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  props: {
    field: {
      required: true,
      type: String
    },
    validationErrors: {
      required: true,
      type: Object
    }
  },
  computed: {
    errorMessage () {
      if (this.validationErrors.has(this.field)) {
        let error = this.validationErrors.first(this.field)
        let filedTranslation = this.$t(this.field)
        return error.replace(this.field, filedTranslation)
      }
      return null
    }
  }
}
</script>
