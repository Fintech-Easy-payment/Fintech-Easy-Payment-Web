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
                    <div 
                      v-else
                      v-text="'Crate a new account'"
                    />
                  </div>
                  <v-form>
                    <v-text-field 
                      v-if="!options.isLoggingIn" 
                      v-model="user.name" 
                      light="light" 
                      label="Name"
                    />
                    <v-text-field 
                      v-if="!options.isLoggingIn" 
                      v-model="user.phone" 
                      light="light" 
                      label="Phone"
                    />
                    <v-text-field 
                      v-model="user.email" 
                      light="light"  
                      label="Email" 
                      type="email"
                    />
                    <v-text-field 
                      v-model="user.password" 
                      light="light"  
                      label="Password" 
                      type="password"
                    />
                    <v-btn 
                      v-if="options.isLoggingIn" 
                      v-text="'Sign in'"
                      @click.prevent="handleSignIn()" 
                      block="block"   
                      type="submit"
                    />
                    <v-btn 
                      v-else 
                      v-text="'Sign up'"
                      block="block" 
                      type="submit" 
                      @click.prevent="handleSignUp()"
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
                  @click="options.isLoggingIn = false"
                />
              </div>
              <div 
                v-else
                class="login-options"
              >
                <div 
                  class="question"
                  v-text="'Do have an account?'"
                />
                <v-btn 
                  class="signup-button" 
                  v-text="'Sign in'"
                  light="light" 
                  @click="options.isLoggingIn = true"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>

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
    data: () => ({
        user: {
            email: '',
            password: '',
            name: '',
            phone: '',
        },
        options: {
            isLoggingIn: true,
            shouldStayLoggedIn: true,
        },
  
    }),
    methods: {
      ...mapActions([
      'handleSignup',
    ]),
      async handleSignUp () {
        //user 정보 보내기
        const payload = {
          name: this.user.name,
          password: this.user.password,
          email: this.user.email,
          phonenumber: this.user.phone,
        }
        this.$store
          .dispatch("handleSignup", payload)
        this.options.isLoggingIn = true
      },
      async handleSignIn () {
        router.push("/payment")
        
        // // user 정보 보내기
        // const payload = {
        //   name: this.user.name,
        //   password: this.user.password,
        //   email: this.user.email,
        //   phonenumber: this.user.phone,
        // };
        // try {
        //   const result = await this.handleLogin(payload)
        //   console.log(result)
        // } catch(error){
        //   console.log(error)
        // }

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
