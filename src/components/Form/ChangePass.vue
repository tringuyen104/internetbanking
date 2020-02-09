<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('changePass') }}</h2>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('oldPass') }}</label>
          <input
            type="password"
            class="form-control"
            id="oldPassword"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('newPass') }}</label>
          <input
            type="password"
            class="form-control"
            id="newPass"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('confirmPass') }}</label>
          <input
            type="password"
            class="form-control"
            id="confirmPass"
          />
        </div>
        <div class="col-md-12 submitbtn">
        <div class="float-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
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
