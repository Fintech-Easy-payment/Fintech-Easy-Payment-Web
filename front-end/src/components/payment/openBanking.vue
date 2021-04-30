<template>
  <div class="payment">
      <v-app dark="dark">
        <v-main>
          <v-container fill-height="fill-height">
            <v-card light="light" width="100%">
              <v-card-text>
                <div class="payment__field">
                  <v-text-field
                    :value="userData.productName"
                    label="상품"
                    class="payment__field--block"
                    readonly
                  />
                  <v-select
                    :items="accountLists"
                    :value="selectedValue"
                    label="출금계좌"
                    class="payment__field--block"
                    @change="handleSelect($event)"
                  />
                  <v-text-field
                    :value="userData.productPrice"
                    label="결제금액"
                    class="payment__field--block"
                    readonly
                  />
                  <v-text-field
                    :value=depositNum
                    label="입금계좌"
                    class="payment__field--block"
                    readonly
                  />
                </div>
                <div class="payment__button">
                  <v-btn  
                    v-text="'결제하기'"
                    block="block" 
                    type="submit" 
                    x-large
                    @click.prevent="handlePayment()"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </v-main>
        <div 
        class="error-dialog"
      >
        <BaseDialog
          :is-dialog-open="isOpenDialog"
        >
          <template #content>
            <div 
              v-text="isSuccessed ? '결제가 완료되었습니다.':'결제에 실패했습니다.'"
            />
          </template>
          <template #footer>
            <div
              @click="isOpenDialog = false"
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'paymentPage',
  components: {
    BaseDialog: () => import('../common/baseDialog'),
  },
  data: () => ({
    // product: userData.productName,
    // withdrawList: userData.accountList,
    // amount: userData.productPrice,
    depositNum: '100000000001',
    selectedValue: null,
    isOpenDialog: false,
    isSuccessed: false,
  }),
  computed: {
    ...mapState([
      'userData',
    ]),
    accountLists() {
      return this.userData.accountList ? this.userData.accountList.map((account) => {
        return account.bank_name + " " + account.account_num_masked
      }) : []
    },
  },
  methods: {
    ...mapActions(['getUserData','postPaymentData']),
    async getPaymentData(){
      await this.$store.dispatch("getUserData")
    },
    async handlePayment(){
      //출금 open api
      const accoutDataIndex = this.accountLists.findIndex(option => option === this.selectedValue)
      const payload = this.userData.accountList[accoutDataIndex].fintech_use_num
      
      const result = await this.$store.dispatch('postPaymentData',payload)
      if (result == 2){
        this.isOpenDialog = true
        this.isSuccessed = true
      } else {
        this.isOpenDialog = true
        this.isSuccessed = false
      }
    },
    handleSelect (value) {
      this.selectedValue = value
    },
  },

}
</script>

<style lang="scss" scoped>
.payment{
  &__field {
    width: 100%;
    &--block {
      margin-bottom: 1rem;
    }
  }
  &__button {
    width: 100%;
    margin-bottom: 2rem;
  }
}

</style>
