<template>
  <div>
    <v-toolbar dark color="primary">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <!-- <font-awesome-icon :icon="icon" class="toolbar-icon-custom" /> -->
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
                <td>{{ props.item.cmc_rank }}</td>
                <td>{{ props.item.name }}</td>
                <!-- <td><img v-bind:src="props.item.image" class="logo-sprite" v-bind:alt="props.item.name" height="16" width="16"> {{ props.item.name }}</td> -->
                <td class="text-xs-left">${{ props.item.quote.USD.price }}</td>
                <td class="text-xs-left">{{ props.item.quote.USD.market_cap }}</td>
                <td class="text-xs-left">{{ props.item.quote.USD.volume_24h }}</td>
                <td class="text-xs-left">{{ props.item.circulating_supply }}</td>
                <td class="text-xs-left" :class="props.item.quote.USD.percent_change_24h.toString().charAt(0) === '-' ? 'cell-color-red' : 'cell-color-green'">{{ props.item.quote.USD.percent_change_24h }}%</td>
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
import coins from '../../../local-data/Coins'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Rank', align: 'left', value: 'cmc_rank' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Price', value: 'quote.USD.price' },
        { text: 'Market Cap', value: 'quote.USD.market_cap' },
        { text: 'Volume (24h)', value: 'quote.USD.volume_24h' },
        { text: 'Circulating Supply', value: 'circulating_supply' },
        { text: 'Change (24h)', value: 'percent_change_24h' },
        { text: 'Coins Owned', value: 'coinsOwned' },
        { text: 'USD Value', value: 'usdValue' }
      ],
      items: [],
      coinList: [ 'bitcoin', 'ethereum', 'ripple', 'nem', 'litecoin', 'dash', 'monero', 'waves', 'bitshares', 'siacoin', 'bytecoin-bcn', 'golem-network-tokens', 'stellar', 'dogecoin', 'digibyte', 'verge', 'reddcoin', 'digitalnote', 'aeon', 'ravencoin', 'fantomcoin', 'library-credit', 'tron', 'bittorent', 'ravencoin' ],
      investmentData: coins,
      errors: []
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
    // axios.get(`https://sandbox.coinmarketcap.com/v1/cryptocurrency/listings/latest/`, {
    axios.get(`http://localhost:3000/latest`)
      .then(response => {
        const data =  response.data.data
        let matchCoin = {}
        let investedCoin = {}
        // Loop over invested coin array
        for (let invest of this.investmentData) {
          matchCoin = data.find(tick => tick.symbol === invest.symbol)
          // If coin found in top 100
          if (matchCoin) {
            investedCoin = { ...matchCoin, ...invest, volume24h: matchCoin['24h_volume_usd'], usdValue: invest.coinsOwned * matchCoin.quote.USD.price, percentChange24h: matchCoin.percent_change_24h === null ? 0 : matchCoin.percent_change_24h }
            this.items.push(investedCoin)
          }
          else {
            // This no longer works with the new API system. Time to screen scrape?
            // // Get coin one by one
            // // set image: , image: require('@/assets/' + matchCoin.name.toLowerCase() + '.png')
            // axios.get(`http://localhost:3000/latest/${invest.symbol}/`)
            //   .then(response => {
            //     matchCoin = response.data[0]
            //     investedCoin = { ...matchCoin, ...invest, volume24h: matchCoin['24h_volume_usd'], usdValue: invest.coinsOwned * matchCoin.quote.USD.price, percentChange24h: matchCoin.percent_change_24h === null ? 0 : matchCoin.percent_change_24h }
            //     this.items.push(investedCoin)
            //   })
            //   .catch(e => {
            //     console.log(e)
            //     this.errors.push(e)
            //   })

            // Screen scrapey
            // /screen-scrape/top-100/:page
            // axios.get(`http://localhost:3000/screen-scrape/coin/`)
            //   .then(response => {
            //     matchCoin = response.data.find(tick => tick.symbol === invest.symbol)
            //     investedCoin = { ...matchCoin,
            //       ...invest,
            //       cmc_rank: matchCoin.rank,
            //       volume24h: matchCoin['volume_24h'],
            //       usdValue: invest.coinsOwned * matchCoin.price,
            //       percentChange24h: matchCoin.change_24h === null ? 0 : matchCoin.change_24h,
            //       quote: { USD:
            //         { price: matchCoin.price,
            //           market_cap: matchCoin.market_cap,
            //           volume_24h: matchCoin.volume_24h,
            //           percent_change_24h: matchCoin.change_24h
            //         }
            //       }
            //     }
            //     this.items.push(investedCoin)
            //   })
            //   .catch(e => {
            //     console.log(e)
            //     this.errors.push(e)
            //   })

            axios.get(`http://localhost:3000/screen-scrape/coin/${invest.id}/`)
              .then(response => {
                matchCoin = response.data.find(tick => tick.symbol === invest.symbol)
                investedCoin = { ...matchCoin,
                  ...invest,
                  cmc_rank: matchCoin.rank,
                  volume24h: matchCoin['volume_24h'],
                  usdValue: invest.coinsOwned * matchCoin.price,
                  percentChange24h: matchCoin.change_24h === null ? 0 : matchCoin.change_24h,
                  quote: { USD:
                    { price: matchCoin.price,
                      market_cap: matchCoin.market_cap,
                      volume_24h: matchCoin.volume_24h,
                      percent_change_24h: matchCoin.change_24h
                    }
                  }
                }
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
