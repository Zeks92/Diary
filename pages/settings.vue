<template lang="pug">
  div
    h1.mb-3 Settings
    v-form(v-model='isValid' ref='form')
      v-text-field(v-model='account.name' required :rules='[rules.required]' validate-on-blur prepend-icon='person' label='Name')
      v-text-field(v-model='account.email' required :rules='[rules.required, rules.email]' validate-on-blur prepend-icon='email' label='Email' type='email')
      v-text-field(v-model='newPassword' :rules='[rules.newPassword]' validate-on-blur prepend-icon='lock' label='New Password' type='password')
      v-text-field(v-model='newPasswordConfirm' :rules='[rules.newPasswordConfirm]' validate-on-blur prepend-icon='lock' label='Confirm New Password' type='password')
      .right.mb-4
        v-btn(@click='clickCancel') Cancel
        v-btn(@click='clickSave' :disabled='!isValid' color='primary') Save
</template>

<script>
  import { mapActions } from 'vuex'

  const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    data() {
      return {
        newPassword: null,
        newPasswordConfirm: null,
        rules: {
          required: (v) => !!v || 'Field is required',
          email: (v) => EMAIL_PATTERN.test(v) || 'Email must be valid',
          newPassword: (v) => !v || v.length >= 6 || 'Password must contain at least 6 characters',
          newPasswordConfirm: (v) => v == this.newPassword || 'Value must match new password value',
        },
        isValid: true,
      }
    },
    head: { title: 'Settings' },
    beforeCreate() {
      this.account = { ...this.$store.state.customer.account }
    },
    methods: {
      ...mapActions('customer', ['updateAccountSettings']),
      redirectHome() {
        this.$router.push('/')
      },
      clickSave() {
        if (!this.$refs.form.validate()) return
        const settings = { ...this.account }
        if (this.newPassword) settings.password = this.newPassword
        this.updateAccountSettings(settings)
        this.redirectHome()
      },
      clickCancel() {
        this.redirectHome()
      },
    },
  }
</script>
