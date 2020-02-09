<template>
  <div class="nav-position border-bottom">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{name: 'home'}">TienMo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="true == false">
            <HeaderEmployee></HeaderEmployee>
          </div>
          <div v-else>
            <HeaderAdmin></HeaderAdmin>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import HeaderEmployee from '../components/Employee/HeaderEmployee.vue'
import HeaderAdmin from '../components/Admin/HeaderAdmin.vue'
// const isAdmin = false
export default {
  components: {
    HeaderEmployee,
    HeaderAdmin
  }
}
</script>
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
