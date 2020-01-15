<template lang="pug">
  v-app
    the-navbar
    v-content
      v-container
        nuxt
    the-footer
</template>

<script>
  import TheNavbar from '~/components/the-navbar.vue'
  import TheFooter from '~/components/the-footer.vue'

  export default {
    components: { TheNavbar, TheFooter },
    middleware: 'authenticated',
  }
</script>
