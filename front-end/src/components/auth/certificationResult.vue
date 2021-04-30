<template>
   <div>
       {{ $route.query.code }}
   </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { dbApi } from '@/api.js'

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
  async mounted () {
      const code = this.$route.query.code
      this.$store.commit('GETCODE', code)
      console.log(this.$store.state.code);
      await dbApi.auth(code).then(({ data }) => {
        console.log(data)
      })      
      setTimeout('window.close()', 2000)
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