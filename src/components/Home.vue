<template>
  <div>
    <v-toolbar dark color="primary">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <font-awesome-icon :icon="icon" class="toolbar-icon-custom" />
      <v-toolbar-title class="white--text">Crypto Investments</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg>
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-flex>
          <v-flex xs8>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.rank }}</td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">${{ props.item.price_usd }}</td>
                <td class="text-xs-left">{{ props.item.market_cap_usd }}</td>
                <td class="text-xs-left">{{ props.item.volume24h }}</td>
                <td class="text-xs-left">{{ props.item.available_supply }}</td>
                <td class="text-xs-left" :class="props.item.percent_change_24h.toString().charAt(0) == '-' ? 'cell-color-red' : 'cell-color-green'">{{ props.item.percent_change_24h }}%</td>
                <td class="text-xs-left">{{ props.item.coinsOwned }} {{ props.item.symbol }}</td>
                <td class="text-xs-left">{{ props.item.usdValue | toUSD }}</td>
              </template>
              <template slot="footer">
                <td colspan="8"></td>
                <td>
                  Total: {{ usdValueSum | toUSD }}
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faBitcoin } from '@fortawesome/fontawesome-free-brands'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Rank', align: 'left', value: 'rank' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Price', value: 'price_usd' },
        { text: 'Market Cap', value: 'market_cap_usd' },
        { text: 'Volume (24h)', value: 'volume24h' },
        { text: 'Circulating Supply', value: 'available_supply' },
        { text: 'Change (24h)', value: 'percent_change_24h' },
        { text: 'Coins Owned', value: 'coinsOwned' },
        { text: 'USD Value', value: 'usdValue' }
      ],
      items: [],
      coinList: [ 'bitcoin', 'ethereum', 'ripple', 'nem', 'litecoin', 'dash', 'monero', 'waves', 'bitshares', 'siacoin', 'bytecoin-bcn', 'golem-network-tokens', 'stellar', 'dogecoin', 'digibyte', 'verge', 'reddcoin', 'digitalnote', 'aeon', 'fantomcoin', 'library-credit' ],
      investmentData: [
        { id: 'bitcoin', coinsOwned: 0.1565 },
        { id: 'ethereum', coinsOwned: 6.5405 },
        { id: 'ripple', coinsOwned: 3309.9485 },
        { id: 'nem', coinsOwned: 915.571545 },
        { id: 'litecoin', coinsOwned: 8.9323 },
        { id: 'dash', coinsOwned: 0.16519046 },
        { id: 'monero', coinsOwned: 0.075039206 },
        { id: 'waves', coinsOwned: 19.94134954 },
        { id: 'bitshares', coinsOwned: 1559.96959 },
        { id: 'siacoin', coinsOwned: 30911.88 },
        { id: 'bytecoin-bcn', coinsOwned: 59182.61647504 },
        { id: 'golem-network-tokens', coinsOwned: 523.780512532 },
        { id: 'stellar', coinsOwned: 5683.0030733 },
        { id: 'dogecoin', coinsOwned: 56460.52408681 },
        { id: 'digibyte', coinsOwned: 12549.53880836 },
        { id: 'verge', coinsOwned: 70290.2323271346 },
        { id: 'reddcoin', coinsOwned: 61413.247872 },
        { id: 'kin', coinsOwned: 595000 },
        { id: 'digitalnote', coinsOwned: 11079.16158329 },
        { id: 'aeon', coinsOwned: 35.615 },
        { id: 'fantomcoin', coinsOwned: 0.5176667808 },
        { id: 'library-credit', coinsOwned: 14 }
      ]
    }
  },
  methods: {
    mapDataObject: function (obj) {
      console.log(obj)
    }
  },
  computed: {
    icon () {
      return faBitcoin
    },
    usdValueSum () {
      if (this.items.length > 0) {
        return this.items.map(item => item.usdValue).reduce((prev, next) => prev + next)
      } else {
        return 0
      }
    }
  },
  created () {
    // Get top 100 coins from coinmarketcap.com
    axios.get(`https://api.coinmarketcap.com/v1/ticker/`)
      .then(response => {
        let matchCoin = {}
        let investedCoin = {}
        // Loop over invested coin array
        for (let invest of this.investmentData) {
          matchCoin = response.data.find(tick => tick.id === invest.id)
          // If coin found in top 100
          if (matchCoin) {
            investedCoin = { ...matchCoin, ...invest, volume24h: matchCoin['24h_volume_usd'], usdValue: invest.coinsOwned * matchCoin.price_usd }
            this.items.push(investedCoin)
          } else {
            // Get coin one by one
            axios.get(`https://api.coinmarketcap.com/v1/ticker/${invest.id}/`)
              .then(response => {
                matchCoin = response.data[0]
                investedCoin = { ...matchCoin, ...invest, volume24h: matchCoin['24h_volume_usd'], usdValue: invest.coinsOwned * matchCoin.price_usd }
                this.items.push(investedCoin)
              })
              .catch(e => {
                console.log(e)
                this.errors.push(e)
              })
          }
          // Clean up variables
          matchCoin = {}
          investedCoin = {}
        }
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
  },
  components: {
    FontAwesomeIcon
  },
  filters: {
    toUSD: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })
      return formatter.format(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toolbar-icon-custom {
    font-size: 28px;
  }
  .cell-color-red {
    color: red
  }
  .cell-color-green {
    color: green
  }
</style>
