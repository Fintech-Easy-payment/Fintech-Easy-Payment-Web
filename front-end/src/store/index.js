
import Vue from 'vue'
import Vuex from 'vuex'

import { dbApi } from '../api'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginToken: '',
    accessToken: '',
    refreshToken: '',
    userSeqNum: '',
    code: '',
    userData: {
      accountList: [],
      productName: '',
      productPrice: '',
      productId: '',
    }
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
    },
    GETUSERDATA(state, payload) {
      state.userData.accountList = payload.account_list
      state.userData.productName = payload.product_name
      state.userData.productPrice = payload.product_price
      state.userData.productId = payload.product_id
    },
  },
  actions: {

    async handleSignup(_, payload) {
      const {
        name,
        password,
        email,
        phone
      } = payload

      console.log(name,password,email,phone);
      const result = await dbApi.signup(payload).then(({ data }) => {

        if (data !== 0) {
          sessionStorage.setItem('temporary-token', data)
        }
        return data
      })
      return result
    },

    async handleSignin(_, payload) {
      const {
        password,
        email,
      } = payload
      
      console.log(password, email)
      const result = await dbApi.signin(payload).then(({ data }) => {
        console.log(data);
        if (data !== 2 && data !== 3) {
          sessionStorage.setItem('temporary-token', data)
        }
        return data
      })
      return result
    },

    async getUserData({commit}) {
      const result = await dbApi.accountData().then(({data}) => {
        console.log(data);
        commit('GETUSERDATA',data)
        return data
      })
      return result
    },
    async postPaymentData({ state }, payload) {
      
      const data = {
        fin_use_num: payload,
        price: state.userData.productPrice,
        product_id: state.userData.productId,
        product_name: state.userData.productName
      }
      const result = await dbApi.withdrawData(data).then((req) => {
        return req.data
      })
      return result
    },
  },
})
