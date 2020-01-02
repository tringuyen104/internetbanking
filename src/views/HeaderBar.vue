<template>
  <div class="padding-nav nav-position">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">TienMo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="col-sm-12 col-md-8 col-lg-5">
            <b-form-input size="sm" class="mr-sm-6 mr-md-8 mr-lg-5" placeholder="Search"></b-form-input>
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item href="#">{{ $t('payment') }}</b-nav-item>
            <b-nav-item to="login">{{ $t('signin') }}</b-nav-item>
          </b-navbar-nav>

          <!-- <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style lang="scss">
.form-inline {
  margin: auto;
}
</style>
