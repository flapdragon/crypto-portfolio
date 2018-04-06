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
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.price_usd }}</td>
                <td class="text-xs-left">{{ props.item.market_cap_usd }}</td>
                <td class="text-xs-left">{{ props.item.volume24h }}</td>
                <td class="text-xs-left">{{ props.item.available_supply }}</td>
                <td class="text-xs-left">{{ props.item.percent_change_24h }}</td>
                <td class="text-xs-left">{{ props.item.invested }}</td>
                <td class="text-xs-left">{{ props.item.usdValue }}</td>
              </template>
              <template slot="footer">
                <td colspan="7"></td>
                <td>
                  Total: {{ usdValueSum }}
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            {{ items }}
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
      usdValueSum: 0,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Price', value: 'price_usd' },
        { text: 'Market Cap', value: 'market_cap_usd' },
        { text: 'Volume (24h)', value: 'volume24h' },
        { text: 'Circulating Supply', value: 'available_supply' },
        { text: 'Change (24h)', value: 'percent_change_24h' },
        { text: 'Invested', value: 'invested' },
        { text: 'USD Value', value: 'usdValue' }
      ],
      items: [],
      coin: {},
      investment: { invested: 0, usdValue: 0 }
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
    }
  },
  created () {
    // const vm = this
    axios.get(`https://api.coinmarketcap.com/v1/ticker/bitcoin/`)
      .then(response => {
        console.log(response)
        console.log(response.data)
        console.log(response.data[0])
        console.log(response.data[0]['24h_volume_usd'])
        this.coin = { ...response.data[0], ...this.investment, volume24h: response.data[0]['24h_volume_usd'] }
        this.items.push(this.coin)
        console.log('this.items')
        console.log(this.items)
        // JSON responses are automatically parsed.
        // this.posts = response.data
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toolbar-icon-custom {
    font-size: 28px;
  }
</style>
