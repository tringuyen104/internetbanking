<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('recharge') }}</h2>
    <div class="input-group">
      <input
        type="email"
        class="form-control"
        id="userinfo"
        placeholder="Nhập tên đăng nhập hoặc số tài khoản"
      />
      <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
    </div>
    <div class="form-group">
      <label for="inputAddress"></label>
      <input type="password" class="form-control" id="amountofmoney" :placeholder="$t('insertmoney')" />
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('realname') }}</label>
      <input type="text" class="form-control" id="realname" :placeholder="$t('examname')" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('email') }}</label>
      <input type="text" class="form-control" id="email" :placeholder="$t('exammail')" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('phone') }}</label>
      <input type="text" class="form-control" id="phone" :placeholder="$t('examphone')" readonly />
    </div>
    <div class="float-right">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
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
