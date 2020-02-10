module.exports = {
  head: {
    titleTemplate: '%s | Diary',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ],
  },
  css: [
    'vuetify/dist/vuetify.min.css',
  ],
  plugins: [
    '~/plugins/vuetify',
  ],
}
