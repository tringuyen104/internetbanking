<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('recharge') }}</h2>
    <div class="input-group">
      <input
        type="email"
        class="form-control"
        id="InsertUserInfo"
        :placeholder="$t('insertnameoraccnumber')"
      />
      <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
    </div>
    <div class="form-group">
      <label for="inputAddress"></label>
      <input type="password" class="form-control" id="amountofmoney" :placeholder="$t('insertmoney')" />
    </div>
    <DisplayUserInfo></DisplayUserInfo>
    <div class="float-right">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
<script>
import DisplayUserInfo from './../Form/DisplayUserInfo.vue'
export default { components: { DisplayUserInfo } }
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
