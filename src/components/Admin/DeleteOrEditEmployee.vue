<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('deltoreditemployee') }}</h2>
    <div class="form-row">
      <div class="input-group mb-3">
        <input type="email" class="form-control" id="userName" placeholder="Tên đăng nhập" />
        <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('realname') }}</label>
      <input type="text" class="form-control" id="realname" placeholder="Nguyễn Văn A" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('email') }}</label>
      <input type="text" class="form-control" id="email" placeholder="a@gmail.com" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('phone') }}</label>
      <input type="text" class="form-control" id="phone" placeholder="0388008800" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('address') }}</label>
      <input
        type="text"
        class="form-control"
        id="address"
        placeholder="123 Nguyễn Văn Cừ, Q.5, Tp.HCM"
        readonly
      />
    </div>
    <div class="float-right handle-btn">
      <button type="submit" class="btn btn-primary">{{ $t('cancel') }}</button>
      <button type="submit" class="btn btn-primary">{{ $t('delete') }}</button>
      <button type="submit" class="btn btn-primary">{{ $t('edit') }}</button>
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
.handle-btn {
  button {
    margin-left: 5px;
  }
}
</style>
