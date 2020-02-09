<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('createuser') }}</h2>
    <InsertUserInfo />
  </form>
</template>
<script>
import InsertUserInfo from './../Form/InsertUserInfo.vue'
export default { components: { InsertUserInfo } }
</script>
<style lang="scss">
.padding-nav {
  padding-left: 25%;
  padding-right: 25%;
}
.form-label {
  text-align: left;
}
.form-title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
