
import Vue from 'vue'
import Vuex from 'vuex'

import { dbApi } from '../api'
// import Cookies from 'js-cookie'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    accessToken: '',
    refreshToken: '',
    userSeqNum: '',
  },
  getters: {},
  mutations: {
    SIGNUP(state, { accessToken }) {
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
      // console.log(name, password, email, phone)
      //   phone,
      // } = payload

      // const {
      //   access_token,
      //   refresh_token,
      //   user_seq_num,
      // } = token

      dbApi.login(payload)
        .then(({ data }) => commit("SIGNUP", data))
      console.log(name, password, email, phone)
    },
    async getToken() {
      dbApi.getToken((req, res) => {
        var authCode = req.query.code;
        console.log(authCode, res)
        // var option = {
        //   method : "POST",
        //   url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        //   header : {
        //       'Content-Type' : 'application/x-www-form-urlencoded'
        //   },
        //   form: {
        //     code: authCode,
        //     client_id: "89358db6-c434-40fe-9ae2-a2254dc1506a",
        //     client_secret: "4ada8450-c969-4af7-b622-c605f341f7d6",
        //     redirect_uri: "http://localhost:3000/authResult",
        //     grant_type: "authorization_code",
        //   }
        // }
        // request(option, function(err, response, body){
        //     if(err){
        //       console.error(err);
        //       throw err;
        //     }
        //     else {
        //       var accessRequestResult = JSON.parse(body);
        //       console.log(accessRequestResult);
        //       console.log(response)
        //       res.render('resultChild', { data: accessRequestResult });
        //     }
        // })
      })
    }
  },
})
