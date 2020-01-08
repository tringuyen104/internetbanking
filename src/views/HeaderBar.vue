<template>
  <div class="nav-position border-bottom">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{name: 'home'}">TienMo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="col-sm-12 col-md-8 col-lg-5">
            <b-form-input size="sm" class="mr-sm-6 mr-md-8 mr-lg-5" placeholder="Search"></b-form-input>
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item-dropdown :text="$t('payment')" right>
              <b-dropdown-item :to="{name: 'cards'}">{{ $t('lstCard') }}</b-dropdown-item>
              <!-- <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item> -->
            </b-nav-item-dropdown>
            <b-nav-item :to="{name: 'login'}">{{ $t('signin') }}</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text&display=swap");
.logo-font {
  font-family: "Libre Barcode 39 Text", cursive;
  font-size: 1.5em;
}

.form-inline {
  margin: auto;
}

.border-bottom {
  border-bottom: 0.5em;
}
</style>
