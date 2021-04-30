<template>
  <div id="app">
    <v-app dark="dark">
      <v-main>
        <v-container fill-height="fill-height">
          <v-layout align-center="align-center" justify-center="justify-center">
            <v-flex class="login-form text-xs-center"> 
              <div class="display-1 mb-3">
                Easy Payment Service
              </div>
              <v-card light="light">
                <v-card-text>
                  <div class="subheading">
                    <div 
                      v-if="options.isLoggingIn"
                      v-text="'Log in to your customer portal'"
                      />
                  </div>
                  <v-form>
                    <v-text-field 
                      v-model="user.email" 
                      :rules="feildRule"
                      light="light"  
                      label="Email" 
                      type="email"
                      required
                    />
                    <v-text-field 
                      v-model="user.password" 
                      :rules="feildRule"
                      light="light"  
                      label="Password" 
                      type="password"
                      required
                    />
                    <v-btn 
                      v-text="'Sign in'"
                      :disabled="!isVaildFeild"
                      @click.prevent="handleSignIn()" 
                      block="block"   
                      type="submit"
                    />
                  </v-form>
                </v-card-text>
              </v-card>
              
              <div 
                v-if="options.isLoggingIn"
                class="login-options"
              >
                <div 
                  class="question"
                  v-text="'Don\'t have an account?'"
                />
                <v-btn 
                  class="signup-button" 
                  v-text="'Sign up'"
                  light="light" 
                  @click="$router.push('/signup')"
                />
              </div>
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
      <div 
        class="error-dialog"
      >
        <BaseDialog
          :is-dialog-open="options.isOpenError"
        >
          <template #content>
            <div
              v-text="errorMessage"
            />
          </template>
          <template #footer>
            <div
              @click="options.isOpenError = false"
            >
              확인
            </div>
          </template>
        </BaseDialog>

      </div>

      <v-footer app="app">
        <v-flex class="text-xs-center">© fintech project.</v-flex>
      </v-footer>
      
    </v-app>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions } from 'vuex'


export default {
  name: "LoginMain",
  components: {
    BaseDialog: () => import('../common/baseDialog'),
  },
  data: () => ({
      user: {
          email: '',
          password: '',
      },
      options: {
          isLoggingIn: true,
          isEmptyFeild: false,
          isOpenError: false,
          hasError: false,
      },  
      errorMessage: '',
  }),
  computed: {
    feildRule () {
      const errorMessage = 'This field is required'
      return [val => (val || '').length > 0 || errorMessage]
    },
    isVaildFeild(){
      return (this.user.email && this.user.password)
    }
    
  },
  methods: {
    ...mapActions([
    'handleSignin',
    'getUserData'
  ]),
    async handleSignIn () {
      if (!this.feildRule) {
        this.options.hasError = true
      }
      const payload = {
        password: this.user.password,
        email: this.user.email,
      };
      const result = await this.$store.dispatch("handleSignin", payload)
      if (result == 0 || result == 2) {
        this.errorMessage = "아이디와 비밀번호를 확인해주세요!"
        this.options.isOpenError = true
      } else if (result == 3 ) {
        this.errorMessage = "가입되지 않은 정보입니다."
        this.options.isOpenError = true
      } else {
        await this.$store.dispatch("getUserData")
        router.push("/payment")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-options {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1rem;
}

</style>
