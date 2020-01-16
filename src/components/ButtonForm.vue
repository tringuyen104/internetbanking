<template>
  <div class="form-group">
    <button type="submit" class="btn btn-primary">{{ titleSubmit }}</button>
    <router-link  class="btn btn-light" :to="{name: 'home'}">{{ $t('cancel') }}</router-link>
  </div>
</template>
<script>
export default { props: { titleSubmit: { type: String, required: true } } }
</script>
