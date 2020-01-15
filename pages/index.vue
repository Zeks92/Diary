<template lang="pug">
  div
    v-btn.right(@click.native.stop='clickNewEvent' color='primary') #[v-icon.mr-1 add] New Event
    h1.mb-3 Events
    v-data-iterator(:items='sortedEvents')
      v-card.mb-3(slot='item' slot-scope='props')
        .place-image.pa-3
          img(:src='`img/places/${getEventPlace(props.item).id}.jpg`' width='130')
        .pa-3
          .headline {{ getEventPlace(props.item).address }}
          .grey--text {{ formatEventDateAndTimes(props.item) }}
          .mb-2 People: {{ props.item.people }} 
          v-btn.ml-0(@click='clickGoAgain(props.item)' color='primary') Go Again
    the-new-event-dialog(v-bind.sync='dialogData')
</template>

<script>
  import theNewEventDialog from '~/components/the-new-event-dialog.vue'
  import date from '~/assets/js/mixins/date.js'

  import { mapState } from 'vuex'

  export default {
    components: { theNewEventDialog },
    mixins: [date],
    data: () => ({
      dialogData: {
        display: false,
        newEvent: {},
      },
    }),
    computed: {
      ...mapState('centre', ['places']),
      ...mapState('customer', ['events']),
      sortedEvents() {
        return this.events.slice().sort(this.$_date_sortDescendingly)
      },
    },
    head: { title: 'Events' },
    methods: {
      openNewEventDialog() {
        this.dialogData.display = true
      },
      clickNewEvent() {
        this.openNewEventDialog()
      },
      getEventPlace(event) {
        return this.places[event.placeId]
      },
      formatEventDateAndTimes(event) {
        return `${this.$_date_format(event.startDate)} ${event.startTime} - ${this.$_date_format(event.endDate)} ${event.endTime}`
      },
      clickGoAgain({ id, date, ...newEvent }) {
        this.dialogData.newEvent = newEvent
        this.openNewEventDialog()
      },
    },
  }
</script>

<style lang='sass' scoped>
  /deep/ .card
    display: flex
    align-items: center
    @media only screen and (max-width: 490px)
      display: block
      text-align: center

  img
    display: block
    margin: auto

</style>
