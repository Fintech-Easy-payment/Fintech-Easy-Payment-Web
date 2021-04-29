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
      </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'paymentPage',
  data: () => ({
    // product: userData.productName,
    // withdrawList: userData.accountList,
    // amount: userData.productPrice,
    depositNum: '98769876',
    selectedValue: null,
  }),
  computed: {
    ...mapState([
      'userData',
    ]),
    accountLists() {
      return this.userData.accountList.map((account) => {
        return account.accountNum
      })
    },
  },
  methods: {
    ...mapActions(['getUserData','postPaymentData']),
    async getPaymentData(){
      await this.$store.dispatch("getUserData")
    },
    handlePayment(){
      console.log('a');
      //출금 open api
      const accoutDataIndex = this.accountLists.findIndex(option => option === this.selectedValue)
      console.log();
      const payload = {
        account_list : this.userData.accountList[accoutDataIndex]
      }
      console.log(payload);
      const result = this.$store.dispatch('postPaymentData',payload)
      console.log(result);

      
    },
    handleSelect (value) {
      this.selectedValue = value
      console.log(this.selectedValue)
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
