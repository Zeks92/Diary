<template lang="pug">
  div
    .right
      v-text-field(v-model='search' append-icon='search' label='Search...' single-line hide-details)
    h1.mb-3 Shopping
    v-data-table(:headers='headers' :items='shoppings' :search='search' :rows-per-page-items='rowsPerPagesItems' :pagination.sync='pagination')
      template(slot='items' slot-scope='props')
        tr(:class='`${getShoppingColor(props.item)}--text`')
          td {{ props.item.id }}
          td {{ props.item.name }}
          td {{ props.item.price.toFixed(2) }}
          td {{ $_date_format(props.item.issueDate) }}
          td {{ $_date_format(props.item.dueDate) }}
          td {{ getShoppingStatus(props.item) }}
          td
            v-btn(@click='clickMakePayment(props.item)' :color='getShoppingColor(props.item)' flat :disabled='props.item.isPaid') Make Payment
    the-make-payment-dialog(v-bind.sync='dialogData')
</template>

<script>
  import { mapState } from 'vuex'
  import theMakePaymentDialog from '~/components/the-make-payment-dialog.vue'
  import date from '~/assets/js/mixins/date.js'

  const today = new Date()

  export default {
    components: { theMakePaymentDialog },
    mixins: [date],
    data: () => ({
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name'},
        { text: 'Price (€)', value: 'price' },
        { text: 'Issue Date', value: 'issueDate' },
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Status', value: 'isPaid' },
        { value: 'id', sortable: false },
      ],
      rowsPerPagesItems:[
        10,
        25,
        { 'text': 'All', 'value': -1 }
      ],
      pagination: { descending: true },
      dialogData: {
        display: false,
        shopping: {},
      },
    }),
    computed: mapState('customer', ['shoppings']),
    head: { title: 'Shopping' },
    methods: {
      getShoppingStatus(shopping) {
        if (shopping.isPaid) return 'Paid'
        else if (new Date(shopping.dueDate) <= today) return 'Overdue'
        return 'Not yet paid'
      },
      getShoppingColor(shopping) {
        const status = this.getShoppingStatus(shopping)
        switch (status) {
          case 'Not yet paid': return 'primary'
          case 'Overdue': return 'error'
        }
        return null
      },
      clickMakePayment(shopping) {
        this.dialogData = {
          display: true,
          shopping,
        }
      },
    },
  }
</script>
