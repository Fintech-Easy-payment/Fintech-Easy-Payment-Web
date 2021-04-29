<template>
   <div>
       {{ $route.query.code }}
   </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: "authResult",
  data: () => ({
      accessToken: '',
      refreshToken: '',
      userNum: '',
  }),
  computed: {
    ...mapMutations(['GETTOKEN'])
  },
  mounted () {
      const code = this.$route.query.code
      this.$store.commit('GETCODE', code)
      console.log(this.$store.state.code);
      this.$store.dispatch('postAuthCode')
      // console.log(this.$store.state)
      setTimeout('window.close()', 10000)
  },
  methods: {
    ...mapActions([
    'postToken',
    ]),

  },

}
</script>

<style>

</style>