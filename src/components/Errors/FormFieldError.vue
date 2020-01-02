<template>
  <div class="validation-message" v-show="validationErrors.has(field)">
    <i class="fal fa-exclamation-triangle" focusable="false"></i>
    <span>{{ validationErrors.first(field) }}</span>
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
  }
}
</script>
