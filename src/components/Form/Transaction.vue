<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(created)="data">
        <span>{{ $moment(data.item.created).format("MM/DD/YYYY") }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      fields: []
    }
  }
}
</script>
