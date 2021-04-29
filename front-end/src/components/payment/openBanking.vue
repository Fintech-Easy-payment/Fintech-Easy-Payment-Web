<template>
  <div class="payment">
      <v-app dark="dark">
        <v-main>
          <v-container fill-height="fill-height">
            <v-card light="light" width="100%">
              <v-card-text>
                <div class="payment__field">
                  <v-text-field
                    :value=product
                    label="상품"
                    class="payment__field--block"
                    readonly
                  />
                  <v-select
                    :items="withdrawList"
                    :value="selectedValue"
                    label="출금계좌"
                    class="payment__field--block"
                    @change="handleSelect($event)"
                  />
                  <v-text-field
                    :value=amount
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
import { mapActions } from 'vuex'

export default {
  name: 'paymentPage',
  data: () => ({
    product: '3개월권',
    withdrawList: ['기엄 : 12341234','98798723'],
    amount: '1000',
    depositNum: '98769876',
    selectedValue: null,
  }),
  mounted() {
    // this.getPaymentData()
  },
  methods: {
    ...mapActions(['getUserData','postPaymentData']),
    async getPaymentData(){
      const result = await this.$store.dispatch("getUserData")
      this.product = result.product
      this.withdrawList = result.withdraw
      this.amount = result.amount
      this.depositNum = result.depositNum
    },
    handlePayment(){
      console.log('a');
      //출금 open api
      const payload = {
        withdrawNum :this.selectedValue
      }
      this.$store.dispatch('postPaymentData',payload)

      
    },
    handleSelect (value) {
      this.selectedValue = value
      // this.$emit('change', value)
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
