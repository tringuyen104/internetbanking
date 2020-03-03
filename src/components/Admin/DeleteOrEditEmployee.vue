<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('deltoreditemployee') }}</h2>
    <div class="form-row">
      <div class="input-group mb-3">
        <input type="email" class="form-control" id="userName" placeholder="Tên đăng nhập" />
        <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
      </div>
    </div>
    <BaseUserInfo/>
    <div class="float-right handle-btn">
      <button type="submit" class="btn btn-primary">{{ $t('cancel') }}</button>
      <button type="submit" class="btn btn-primary">{{ $t('delete') }}</button>
      <button type="submit" class="btn btn-primary">{{ $t('edit') }}</button>
    </div>
  </form>
</template>
<script>
import BaseUserInfo from './../Form/BaseUserInfo'
export default { components: { BaseUserInfo } }
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
.handle-btn {
  button {
    margin-left: 5px;
  }
}
</style>
