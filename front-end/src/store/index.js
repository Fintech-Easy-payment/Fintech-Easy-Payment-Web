
import Vue from 'vue'
import Vuex from 'vuex'

import { dbApi } from '../api'
// import Cookies from 'js-cookie'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginToken: '',
    accessToken: '',
    refreshToken: '',
    userSeqNum: '',
    code: '',
  },
  getters: {},
  mutations: {
    SIGNUP(state, { loginToken }) {
      state.loginToken = loginToken
    },
    GETCODE(state, code) {
      state.code = code
    },
    GETTOKEN(state, payload) {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.userSeqNum = payload.user_seqnum
      console.log(state);
    },
  },
  actions: {
    // updateToken({ commit }, payload) {
    //   commit('GETTOKEN', payload)
    //   Cookies.set('certification-access-token', payload.access_token)
    //   Cookies.set('certification-refresh-token', payload.refresh_token)
    //   Cookies.set('certification-user-seq-num', payload.user_seqnum)
    // },
    async handleSignup({ state }, payload) {
      const {
        name,
        password,
        email,
        phone
      } = payload
      // const accessToken = Cookies.get('certification-access-token')
      // const refreshToken = Cookies.get('certification-refresh-token')
      // const userSeqNum = Cookies.get('certification-user-seq-num')

      console.log(name,password,email,phone);
      const result = await dbApi.signup(payload).then((data) => {
        return data.data
      })
      return result
    },

    async handleSignin(_, payload) {
      const {
        password,
        email,
      } = payload
      
      console.log(password, email)
      // const result = await dbApi.test().then((data) => {
      //   return data.data
      // })
      const result = await dbApi.signin(payload).then(({ data }) => {
        console.log(data);
        return data
      })
      return result
    },

    // async postToken({ state, dispatch }, ) {
    //   // this.$router.push('/authResult')
    //   console.log(state.code)

    //   const params = new URLSearchParams()

    //   params.append('code', state.code)
    //   params.append('client_id', "89358db6-c434-40fe-9ae2-a2254dc1506a")
    //   params.append('client_secret', "4ada8450-c969-4af7-b622-c605f341f7d6")
    //   params.append('redirect_uri', "https://finextend.he0rokuapp.com/authResult")
    //   params.append('grant_type', "authorization_code")

    //   const result = await tokenApi.testCertification(params)
    //     .then(({ data }) => {
    //       dispatch("updateToken", data)
    //       return data
    //     })

    //   console.log(result)
    // },

    async getUserData() {
      const result = await dbApi.accountData().then((data) => {
        console.log(data);
        return data
      })
      return result
    },
    async postPaymentData(payload) {
      const result = await dbApi.withdrawData(payload).then((data) => {
        return data
      })
      return result
    },
  },
})
