<template>
  <form class="col-lg-8 col-md-12 col-sm-12 form-label margin-auto">
    <h2 class="form-title">{{ $t('createuser') }}</h2>
    <InsertUserInfo />
  </form>
</template>
<script>
import InsertUserInfo from './../Form/InsertUserInfo.vue'
export default { components: { InsertUserInfo } }
</script>
<style lang="scss">
.form-label {
  text-align: left;
}
.form-title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
