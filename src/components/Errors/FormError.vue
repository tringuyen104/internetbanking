<template>
  <div class="validation-message" v-if="condition">
    <i class="fas fa-exclamation" focusable="false"></i>&nbsp;
    <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    condition: {
      type: Boolean,
      required: true
    }
  }
}
</script>
