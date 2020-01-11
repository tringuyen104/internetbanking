<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('createemployee') }}</h2>
    <div class="form-row">
      <div class="form-group col-md-10">
        <label for="inputEmail4">{{ $t('userName') }}</label>
        <input type="email" class="form-control" id="userName" placeholder="Tên đăng nhập" />
        <div class="float-right">
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
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
