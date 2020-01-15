import Vue from 'vue'
import events from '~/assets/json/events.json'
import shoppings from '~/assets/json/shoppings.json'

export const state = () => ({
  account: {
    email: 'email@gmail.com',
    password: 'password',
    name: 'your name',
    shouldStayLoggedIn: true,
  },
  auth: false,
  events,
  shoppings,
})

export const getters = {
  getMaxEventId: ({ evnts }) => Math.max(...events.map(b => b.id)),
}

export const mutations = {
  UPDATE_AUTH(state, value) {
    state.auth = value
  },
  UPDATE_ACCOUNT(state, newAccount) {
    Vue.set(state, 'account', newAccount)
  },
  ADD_EVENT({ events }, event) {
    events.push(event)
  },
  UPDATE_SHOPPING({ shoppings }, { index, shopping }) {
    Vue.set(shoppings, index, shopping)
  },
}

export const actions = {
  loginAccount({ state, commit }, account) {
    const isEmailInvalid = state.account.email !== account.email
    const isPasswordInvalid = state.account.password !== account.password
    if (isEmailInvalid || isPasswordInvalid) {
      throw 'Invalid user credentials'
    }
    commit('UPDATE_AUTH', true)
  },
  logoutAccount({ commit }) {
    commit('UPDATE_AUTH', false)
  },
  updateAccountSettings({ commit }, settings) {
    const newAccount = Object.assign({}, state.account, settings)
    commit('UPDATE_ACCOUNT', newAccount)
  },
  commitNewEvent({ commit, getters }, event) {
    event.id = getters.getMaxEventId + 1
    commit('ADD_EVENT', event)
  },
  makeShoppingPaid({ state, commit }, id) {
    const index = state.shoppings.findIndex(i => i.id === id)
    const shopping = { ...state.shoppings[index] }
    shopping.isPaid = true
    commit('UPDATE_SHOPPING', { index, shopping })
  },
}
