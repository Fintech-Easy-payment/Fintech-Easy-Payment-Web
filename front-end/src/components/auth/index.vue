<template>
<div id="app">
  <v-app dark="dark">
    <v-content>
      <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center"> 
            <div class="display-1 mb-3">
              <!-- <v-icon class="mr-2" large="large">work</v-icon>  -->
              MyWorkspace
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template 
                    v-if="options.isLoggingIn"
                    v-text="'Log in to your customer portal'"
                    />
                  <template 
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
                  <v-checkbox 
                    v-if="options.isLoggingIn" 
                    v-model="options.shouldStayLoggedIn" 
                    light="light" 
                    label="Stay logged in?" 
                    hide-details="hide-details"
                  />
                  <v-btn 
                    v-if="options.isLoggingIn" 
                    v-text="'Sign in'"
                    @click.prevent="" 
                    block="block"   
                    type="submit"
                  />
                  <v-btn 
                    v-else 
                    v-text="'Sign up'"
                    block="block" 
                    type="submit" 
                    @click.prevent="options.isLoggingIn = true"
                  />
                </v-form>
              </v-card-text>
            </v-card>
            
            <div v-if="options.isLoggingIn">
              <div 
                class="question-sign-in"
                v-text="'Don\'t have an account?'"
              />
              <v-btn 
                class="signup-button" 
                v-text="'Sign up'"
                light="light" 
                @click="options.isLoggingIn = false"
              />
            </div>
            <div v-else>
              <div 
                class="question-sign-in"
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
    </v-content>

    <v-footer app="app">
      <v-flex class="text-xs-center">© fintech project.</v-flex>
    </v-footer>
    
  </v-app>
</div>
  
</template>

<script>
export default {
    data: () => ({
        user: {
            // email: 'admin@example.com',
            // password: 'admin',
            // name: 'John Doe',
        },
        options: {
            isLoggingIn: true,
            shouldStayLoggedIn: true,
        },
  
    }),

}
</script>

<style>
.signup-button {
    margin-top: 1rem;
}
</style>