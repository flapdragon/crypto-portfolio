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
                <td class="text-xs-left">{{ props.item.price }}</td>
                <td class="text-xs-left">{{ props.item.marketCap }}</td>
                <td class="text-xs-left">{{ props.item.volume24h }}</td>
                <td class="text-xs-left">{{ props.item.circulatingSupply }}</td>
                <td class="text-xs-left">{{ props.item.change24h }}</td>
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
      </v-container>
    </v-card>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faBitcoin } from '@fortawesome/fontawesome-free-brands'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      usdValueSum: 0,
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Price', value: 'price' },
        { text: 'Market Cap', value: 'marketCap' },
        { text: 'Volume (24h)', value: 'volume24h' },
        { text: 'Circulating Supply', value: 'circulatingSupply' },
        { text: 'Change (24h)', value: 'change24h' },
        { text: 'Invested', value: 'invested' },
        { text: 'USD Value', value: 'usdValue' }
      ],
      items: [
        {
          name: 'Bitcoin',
          price: 6635.23,
          marketCap: 112538643103,
          volume24h: 4947860000,
          circulatingSupply: 16960775,
          change24h: -3.04,
          invested: 0.1565,
          usdValue: 1038.41
        },
        {
          name: 'Ethereum',
          price: 368.40,
          marketCap: 36341531041,
          volume24h: 1104620000,
          circulatingSupply: 98646400,
          change24h: -3.42,
          invested: 6.5405,
          usdValue: 2409.52
        }
      ]
    }
  },
  computed: {
    icon () {
      return faBitcoin
    }
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
