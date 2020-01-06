<template>
  <div class="validation-message" v-show="validationErrors.has(field)">
    <i class="fas fa-exclamation" focusable="false"></i>&nbsp;
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
