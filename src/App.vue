<template>
  <div id="app">
    <router-view name="headerbar"></router-view>
    <!-- <main class="padding-nav col-sm-9">
    </main> -->
    <main id="mainContent">
       <router-view />
    </main>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "src/scss/color.scss";
@import "src/scss/style.scss";
@import "src/scss/form.scss";
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#mainContent {
  padding: 30px;
  a {
    font-weight: bold;
    // color: $blue;

    &.router-link-exact-active {
      color: $green;
    }
  }

}

// .nav-position {
//   // position: absolute;
//   width: 100%;
//   z-index: 100;
// }

// @media (max-width: 576px) {
//   .padding-nav {
//     padding-left: 0px;
//     padding-right: 0px;
//   }

//   .element {
//     padding: 10px !important;
//   }
// }
// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) {
//   .padding-nav {
//     padding-left: 0px;
//     padding-right: 0px;
//   }
// }

// Medium devices (tablets, 768px and up)
//@media (min-width: 768px) {  }
</style>
