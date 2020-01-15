<template lang="pug">
  v-footer
    v-flex(class='text-xs-center') Developed by Zeks  <br> January, © {{ year }}. 
</template>

<script>
  export default {
    data: () => ({
      year: new Date().getFullYear(),
    }),
  }
</script>
