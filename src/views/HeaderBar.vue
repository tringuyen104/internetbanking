<template>
  <div class="nav-position border-bottom">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{ name: 'home' }">TienMo</b-navbar-brand>
      <b-navbar><b-button type="button" @click.prevent="change">Change {{  ( !staff ? 'Employee' : 'Admin' )  }}</b-button>
      </b-navbar>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="staff">
            <HeaderEmployee></HeaderEmployee>
          </div>
          <div v-else>
            <HeaderAdmin></HeaderAdmin>
          </div>

          <b-nav-item :to="{ name: 'changePass' }">{{
            $t("changePass")
          }}</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">{{ $t("signin") }}</b-nav-item>
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
  },
  data () {
    return {
      role: '',
      staff: false
    }
  },
  methods: {
    change () {
      this.$set(this, 'staff', !this.staff)
    }
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
