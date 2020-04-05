<template>
  <div>
    <div class="form-group has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        class="form-control"
        :placeholder="placeholder"
        v-model="search"
        :name="!name ? '' : name"
        v-validate="validate ? 'required' : ''"
      />
      <form-field-error v-if="validate" :validation-errors="errors" :field="name" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  props: {
    name: {
      type: String
    },
    validate: {
      type: Boolean
    },
    updateSearch: {
      type: String
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  watch: {
    search (val, oldVal) {
      this.$emit('searchValue', val)
    },
    updateSearch (val, oldVal) {
      this.$set(this, 'search', val)
    }
  }
}
</script>
<style lang="scss">
.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
</style>
