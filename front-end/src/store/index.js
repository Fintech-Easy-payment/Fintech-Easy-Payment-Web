
import Vue from 'vue'
import Vuex from 'vuex'

import { dbApi } from '../api'
// import Cookies from 'js-cookie'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    accessToken: null,
  },
  getters: {},
  mutations: {
    LOGIN(state, { accessToken }) {
      state.accessToken = accessToken
    },
  },
  actions: {
    async handleSignup({ commit }, payload) {
      const {
        name,
        password,
        email,
        phone
      } = payload

      dbApi.signup(payload)
        .then(({ data }) => commit("LOGIN", data))
      console.log(name, password, email, phone)
    }
  },
})
