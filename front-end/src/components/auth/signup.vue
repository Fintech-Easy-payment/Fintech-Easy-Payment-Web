<template>
  <div>
    <v-app dark="dark">
      <v-main>
        <v-container fill-height="fill-height">
          <v-layout align-center="align-center" justify-center="justify-center">
            <v-form>
                <div 
                  v-text="'Crate a new account'"
                />
                <v-text-field 
                  v-model="user.name" 
                  :rules="feildRule"
                  light="light" 
                  label="Name"
                  required
                />
                <v-text-field 
                  v-model="user.phone" 
                  :rules="feildRule"
                  light="light" 
                  label="Phone"
                  required
                />
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
                  v-text="'Sign up'"
                  class="signup-button"
                  :disabled="!isVaildSignup"
                  block="block" 
                  type="submit" 
                  @click.prevent="handleSignUp()"
                />
                <div 
                class="login-options"
              >
                <div 
                  class="question"
                  v-text="'Do have an account?'"
                />
                <v-btn 
                  v-text="'Sign in'"
                  light="light" 
                  @click="$router.push('/')"
                />
              </div>
              </v-form>
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
            <div>
              이미 가입된 정보입니다.
            </div>
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
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    components: {
      BaseDialog: () => import('../common/baseDialog'),
    },
    data: () => ({
        user: {
            email: '',
            password: '',
            name: '',
            phone: '',
        },
        options: {
            isEmptyFeild: false,
            isOpenError: false,
            hasError: false,
            hasCertificated: false,
        },  
    }),
    computed: {
      feildRule () {
        const errorMessage = 'This field is required'
        return [val => (val || '').length > 0 || errorMessage]
      },
      isVaildFeild(){
        return (this.user.name && this.user.email && this.user.password && this.user.phone)
      },
      isVaildSignup(){
        return this.isVaildFeild
      }
    },
    methods: {
      ...mapActions([
      'handleSignup',
    ]),
      async handleSignUp () {
        if (!this.isVaildFeild) {
          this.options.hasError = true
        }
        //user 정보 보내기
        const payload = {
          name: this.user.name,
          password: this.user.password,
          email: this.user.email,
          phone: this.user.phone,
        }
        const result = await this.$store.dispatch("handleSignup", payload)
        if (result == 0) {
          this.options.isOpenError = true
        } else {
          this.$router.push('/certification')
        }
      },

      handleCertificate() {
        // this.$router.push('/authResult')
        const apiKey = "89358db6-c434-40fe-9ae2-a2254dc1506a"
        //#자기 키로 변경
        const tmpWindow = window.open("about:blank");
        tmpWindow.location = "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id="+apiKey+"&redirect_uri=https://finextend.herokuapp.com/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0"

        this.options.hasCertificated = true
    },

}
</script>

<style lang="scss" scoped>
.signup-button {
  margin-bottom: 1rem;
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1rem;
}

</style>
