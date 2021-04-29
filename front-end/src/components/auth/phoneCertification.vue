<template>
  <div class="container">
      <v-btn 
        v-text="'Certificate'"
        class="signup-button"
        block="block" 
        @click="handleCertificate()"
      />
      <div class="verficaton-container">
        <v-btn 
        v-text="'인증이 완료되었다면 클릭해주세요'"
        class="signup-button"
        @click="goToPayment()"
      />
      </div>
      <BaseDialog
          :is-dialog-open="!isOpenDialog"
        >
          <template #content>
            <div>
              휴대폰 인증을 완료해주세요!!
            </div>
          </template>
          <template #footer>
            <div
              @click="isOpenDialog = true"
            >
              확인
            </div>
          </template>
        </BaseDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "certification",
  components: {
      BaseDialog: () => import('../common/baseDialog'),
  },
  data: () => ({
    isOpenDialog : false,
    code : ''

  }),
  computed: {
    ...mapState([
      'stateCode',
    ]),
  },
  methods: {
    ...mapActions([
    'postAuthCode',
    ]),
    handleCertificate() {
      console.log(this.stateCode);
      const apiKey = "89358db6-c434-40fe-9ae2-a2254dc1506a"
      //#자기 키로 변경
      const tmpWindow = window.open("about:blank");
      tmpWindow.location = "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id="+apiKey+"&redirect_uri=https://finextend.herokuapp.com/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0"
    },
    goToPayment () {
      this.code = this.stateCode      
      if (this.code == ''){
        this.isOpenDialog = false
      } else{
        this.$router.push('/payment')
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    .signup-button {
      margin: 2rem 0;
    }
  }
</style>