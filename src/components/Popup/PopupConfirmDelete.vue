<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('delete')" :id="id">
      <div class="d-block">
        <h3 class="red-color">{{ $t('doYouWantToDeleteAccount') }}</h3>
      </div>
      <div class="d-flex margin-top-20">
        <b-button
          class="mt-3 col-md-6"
          variant="primary"
          block
          @click="confirm"
          >{{ $t("confirm") }}</b-button
        >
        <b-button
          class="mt-3 col-md-6"
          variant="light"
          block
          @click="toggleModal"
          >{{ $t("cancel") }}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleModal () {
      this.$refs['my-modal'].hide()
    },
    confirm () {
      this.$emit('remove')
      this.$refs['my-modal'].hide()
    }
  }
}
</script>
<style lang="scss">
.label-info {
  font-size: large;
}
</style>
