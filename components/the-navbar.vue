<template lang="pug">
  v-toolbar(dark color='primary')
    v-toolbar-title.mr-4 #[v-icon.mb-1 book] Diary
    v-toolbar-items.hidden-sm-and-down
      v-btn(to='/' flat) Events
      v-btn(to='/shoppings' flat) Shopping
      v-btn(to='/news' flat) News
    v-spacer
    v-toolbar-items
      v-menu(offset-y)
        v-btn(flat slot='activator')
          v-avatar(size='36')
            img(src='img/avatar.jpg' alt='Display Picture')
          v-icon.ml-2 keyboard_arrow_down
        v-list
          .hidden-md-and-up
            v-list-tile(to='/')
              v-list-tile-title Events
            v-list-tile(to='/shoppings')
              v-list-tile-title Shoppings
            v-list-tile(to='/news')
              v-list-tile-title News
            v-divider
          v-list-tile(to='/settings')
            v-icon.mr-3 settings
            v-list-tile-title Settings
          v-list-tile(@click='clickLogout')
            v-icon.mr-3 exit_to_app
            v-list-tile-title Logout
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions('customer', ['logoutAccount']),
      clickLogout() {
        this.logoutAccount()
        this.$router.push('/login')
      },
    },
  }
</script>

<style lang='sass' scoped>
  /deep/ .toolbar__content
    margin: 0 auto
    @media only screen and (min-width: 960px)
      max-width: 900px
    @media only screen and (min-width: 1264px)
      max-width: 1185px
    @media only screen and (min-width: 1904px)
      max-width: 1785px

  /deep/ .toolbar__title
    @media only screen and (max-width: 599px)
      font-size: 18px
</style>
