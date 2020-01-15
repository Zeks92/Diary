<template lang="pug">
  div
    .right
      v-text-field(v-model='search' append-icon='search' label='Search...' single-line hide-details)
    h1.mb-3 News
    v-data-iterator(:items='sortedNews' :search='search')
      v-card.mb-3(slot='item' slot-scope='props')
        v-card-text.pb-1
          .headline {{ props.item.title }}
          .grey--text.mb-3 {{ $_date_format(props.item.date) }}
          div(v-html='props.item.content')
</template>

<script>
  import { mapState } from 'vuex'
  import date from '~/assets/js/mixins/date.js'

  export default {
    mixins: [date],
    data: () => ({
      search: '',
    }),
    computed: {
      ...mapState('centre', ['news']),
      sortedNews() {
        return this.news.slice().sort(this.$_date_sortDescendingly)
      },
    },
    head: { title: 'News' },
  }
</script>
