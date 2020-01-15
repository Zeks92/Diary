<template lang="pug">
  v-card
      v-form(v-model='isValid' ref='form' @submit.prevent='submitForm')
        v-alert.mb-3(:value='error' type='error') Invalid email or password. Please try again.
        v-text-field(v-model='account.email' :rules='[rules.required]' prepend-icon='email' label='Email' type='email')
        v-text-field(v-model='account.password' :rules='[rules.required]' prepend-icon='lock' label='Password' type='password')
        v-checkbox(v-model='account.shouldStayLoggedIn' label='Stay logged in?' hide-details)
        v-btn(color='primary' :disabled='!isValid' block type='submit') Sign In
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data: () => ({
      account: {},
      error: false,
      rules: {
        required: (v) => !!v || 'Field is required',
      },
      isValid: true,
    }),
    head: { title: 'Login' },
    layout: 'public',
    created() {
      this.account = { ...this.$store.state.customer.account }
    },
    methods: {
      ...mapActions('customer', ['loginAccount']),
      submitForm() {
        if (!this.$refs.form.validate()) return
        try {
          this.loginAccount(this.account)
          this.$router.push('/')
        } catch (e) {
          this.error = true
        }
      },
    },
  }
</script>
