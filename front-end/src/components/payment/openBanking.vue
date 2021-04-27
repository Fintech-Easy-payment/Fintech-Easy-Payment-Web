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
                  <v-text-field
                    :value=withdrawNum
                    label="출금계좌"
                    class="payment__field--block"
                    readonly
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
export default {
  name: 'paymentPage',
  data: () => ({
    product: '3개월권',
    withdrawNum: '12341234',
    amount: '1000',
    depositNum: '98769876',
  }),
  methods: {
    handlePayment(){
      console.log('a');
      //출금 open api
    }
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
