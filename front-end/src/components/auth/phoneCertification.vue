<template>
  <div class="container">
      <v-btn 
        v-text="'Certificate'"
        class="signup-button"
        block="block" 
        @click="handleCertificate()"
      />
  </div>
</template>

<script>
export default {
  name: "certification",
  data: () => ({

  }),
  methods: {
    handleCertificate() {
      const apiKey = "89358db6-c434-40fe-9ae2-a2254dc1506a"
      //#자기 키로 변경
      const tmpWindow = window.open("about:blank");
      tmpWindow.location = "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id="+apiKey+"&redirect_uri=https://finextend.herokuapp.com/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0"

    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    .signup-button {
      
    }
  }
</style>