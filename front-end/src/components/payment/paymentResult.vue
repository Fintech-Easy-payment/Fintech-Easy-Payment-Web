<template>
  <div class="result">
      <v-app dark="dark">
        <v-main>
          <v-container fill-height="fill-height">
            <v-card light="light" width="100%">
              <v-card-text>
                <div v-if="isSuccess">
                  <div class="result-text">
                      {{user}}님의 결제 내역입니다.
                  </div>
                  <div class="result-list">
                      <ul>
                          <li>asdf</li>
                          <li>a234</li>
                      </ul>
                  </div>
                </div>
                <div v-else>
                  <div class="result-text">
                      {{user}}님의 계좌를 확인해주세요.
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
  </div>
</template>

<script>
export default {
  name: "paymentResult",
  props: {
    isSuccess: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    user: '고객',
  }),
  methods: {
  },

}
</script>

<style>

</style>
