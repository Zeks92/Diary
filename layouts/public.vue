<template lang="pug">
  v-app
    v-content
      v-container(fill-height)
        v-layout(align-center justify-center)
          v-flex(sm8)
            .display-1.text-xs-center.mb-3.primary--text
              v-icon.mr-2.mb-1(color='primary' large) book
              | Diary
            nuxt
    the-footer
</template>

<script>
  import TheFooter from '~/components/the-footer.vue'

  export default {
    components: { TheFooter },
    middleware: 'notAuthenticated',
  }
</script>
