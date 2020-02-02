<template>
  <div>
    <b-table :id="idTable" :items="items" :fields="fields" striped responsive="sm" :perPage="perPage" :current-page="currentPage">
      <template v-slot:cell(created)="data">
        <span>{{ $moment(data.item.created).format("MM/DD/YYYY") }}</span>
      </template>
    </b-table>
     <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :aria-controls="idTable"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      fields: [],
      perPage: 10,
      currentPage: 1,
      idTable: 'transaction-table'
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  }
}
</script>
