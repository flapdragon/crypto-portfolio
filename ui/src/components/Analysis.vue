<template>
  <v-content>
    Analysis
  </v-content>
</template>

<script>
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
// import axios from 'axios'

export default {
  name: 'Analysis',
  data () {
    return {
      name: ''
    }
  },
  methods: {

  },
  created () {
    // // Get top 100 coins from coinmarketcap.com API V2
    // axios.get(`https://api.coinmarketcap.com/v2/ticker/?limit=100`)
    //   .then(response => {
    //     for (const [key, value] of Object.entries(response.data.data)) {
    //       // console.log(value)
    //       this.items.push({ ...value, 'volume_percent': (value.quotes.USD.volume_24h / value.quotes.USD.market_cap) * 100 })
    //     }
    //     // research.data.filter(coin => {
    //     //   return coin.quotes.USD.price < 0.1000
    //     // })
    //   })
    //   .catch(e => {
    //     console.log(e)
    //     this.errors.push(e)
    //   })
  }
}
</script>

<style scoped>
</style>
