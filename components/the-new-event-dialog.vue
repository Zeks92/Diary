<template lang="pug">
  v-dialog(v-model='display' max-width='500px' persistent)
    v-form(v-model='isValid' ref='form')
      v-card
        v-card-title.primary.white--text.headline New Event
        v-card-text
          v-layout(wrap)
            v-flex(xs12)
              v-select(required :rules='[rules.required]' :items='places' item-value='id' item-text='address' v-model='newEvent.placeId' label='Place Address' prepend-icon='business')
            v-flex(xs12)
              v-menu(ref='startDatePickerMenu' :close-on-content-click='false' offset-y full-width max-width='290px')
                v-text-field(slot='activator' v-model='newEvent.startDate' required :rules='[rules.required]' label='Start date' prepend-icon='event' readonly)
                v-date-picker(v-model='newEvent.startDate' @input='$refs.startDatePickerMenu.save()' no-title :min='todayDate' first-day-of-week='1')
            v-flex(xs12)
              v-menu(ref='endDatePickerMenu' :close-on-content-click='false' offset-y full-width max-width='290px')
                v-text-field(slot='activator' v-model='newEvent.endDate' required :rules='[rules.required]' label='End date' prepend-icon='event' readonly)
                v-date-picker(v-model='newEvent.endDate' @input='$refs.endDatePickerMenu.save()' no-title :min='todayDate' first-day-of-week='1')
            v-flex(xs6)
              v-menu(ref='startTimePickerMenu' :close-on-content-click='false' offset-y full-width max-width='290px')
                v-text-field(slot='activator' v-model='newEvent.startTime' required :rules='[rules.required]' label='Start Time' prepend-icon='access_time' readonly)
                v-time-picker(v-model='newEvent.startTime' @change='$refs.startTimePickerMenu.save()' format='24hr' no-title min='9:00' max='17:00')
            v-flex.pl-3(xs6)
              v-menu(ref='endTimePickerMenu' :close-on-content-click='false' offset-y full-width max-width='290px')
                v-text-field(slot='activator' v-model='newEvent.endTime' required :rules='[rules.required]' label='End Time' readonly)
                v-time-picker(v-model='newEvent.endTime' @change='$refs.endTimePickerMenu.save()' format='24hr' no-title :min='newEvent.startTime' max='18:00')
            v-flex(xs9)
              v-slider(v-model='newEvent.people' required label='People ' :min='1')
            v-flex(xs3)
              v-text-field(v-model='newEvent.people' required :rules='[rules.required]' type='number')
        v-card-actions
          v-spacer
          v-btn(@click='clickCancel') Cancel
          v-btn(@click='clickSave' :disabled='!isValid' color='primary') Save
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  const defaultNewEvent = {
    people: 1,
  }

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)

  export default {
    props: {
      display: {
        type: Boolean,
        default: true,
      },
      newEvent: {
        type: Object,
        default: () => defaultNewEvent,
      },
    },
    data: () => ({
      todayDate: tomorrowDate.toISOString().slice(0, 10),
      rules: {
        required: (v) => !!v || v === 0 || 'Field is required',
      },
      isValid: true,
    }),
    computed: mapState('centre', ['places']),
    mounted() {
      this.resetNewEvent()
    },
    methods: {
      ...mapActions('customer', ['commitNewEvent']),
      clickSave() {
        if (!this.$refs.form.validate()) return
        this.commitNewEvent(this.newEvent)
        this.$emit('update:display', false)
        this.resetNewEvent()
      },
      clickCancel() {
        this.$emit('update:display', false)
        this.resetNewEvent()
        this.$refs.form.reset()
      },
      resetNewEvent() {
        const newEvent = Object.assign({}, defaultNewEvent)
        this.$emit('update:newEvent', newEvent)
      },
    },
  }
</script>
