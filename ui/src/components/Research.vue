<template>
  <v-content>
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
          <v-flex xs4 sm4 class="py-2">
            <v-btn-toggle v-model="filter">
              <v-btn flat v-if="filter === 0">
                <v-badge color="teal accent-4">
                  <span slot="badge">{{ filteredItemsLength }}</span>
                  All
                </v-badge>
              </v-btn>
              <v-btn flat v-else>
                All
              </v-btn>
              <v-btn flat v-if="filter === 1">
                <!-- <v-icon>money</v-icon> -->
                <v-badge color="teal accent-4">
                  <span slot="badge">{{ filteredItemsLength }}</span>
                  <v-icon>chevron_left</v-icon> 1.00
                </v-badge>
              </v-btn>
              <v-btn flat v-else>
                <!-- <v-icon>money</v-icon> -->
                <v-icon>chevron_left</v-icon> 1.00
              </v-btn>
              <v-btn flat v-if="filter === 2">
                <v-badge color="teal accent-4">
                  <span slot="badge">{{ filteredItemsLength }}</span>
                  <v-icon>chevron_left</v-icon> 0.10
                </v-badge>
              </v-btn>
              <v-btn flat v-else>
                <v-icon>chevron_left</v-icon> 0.10
              </v-btn>
              <v-btn flat v-if="filter === 3">
                <v-badge color="teal accent-4">
                  <span slot="badge">{{ filteredItemsLength }}</span>
                  <v-icon>chevron_left</v-icon> 0.01
                </v-badge>
              </v-btn>
              <v-btn flat v-else>
                <v-icon>chevron_left</v-icon> 0.01
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-flex xs4></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :custom-filter="customFilter"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props" @click.native.stop="navigate('/analysis/{{ props.item.name }}')">
                <td>{{ props.item.cmc_rank }}</td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">${{ props.item.quote.USD.price }}</td>
                <td class="text-xs-right">{{ props.item.quote.USD.market_cap | largeToUSD }}</td>
                <td class="text-xs-right">{{ props.item.quote.USD.volume_24h | largeToUSD }}</td>
                <td class="text-xs-right">{{ props.item.volume_percent | volumePercent }}%</td>
                <td class="text-xs-left">{{ props.item.circulating_supply }}</td>
                <td class="text-xs-left" :class="props.item.quote.USD.percent_change_24h.toString().charAt(0) === '-' ? 'cell-color-red' : 'cell-color-green'">{{ props.item.quote.USD.percent_change_24h }}%</td>
                <td class="text-xs-left" :class="props.item.quote.USD.percent_change_7d.toString().charAt(0) === '-' ? 'cell-color-red' : 'cell-color-green'">{{ props.item.quote.USD.percent_change_7d }}%</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-content>
</template>

<script>
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'

export default {
  name: 'Research',
  data () {
    return {
      search: '',
      filter: 0,
      headers: [
        { text: 'Rank', align: 'left', value: 'cmc_rank' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Price', value: 'quote.USD.price' },
        { text: 'Market Cap', align: 'right', value: 'quote.USD.market_cap' },
        { text: 'Volume 24h', align: 'right', value: 'quote.USD.volume_24h' },
        { text: '% Volume 24h / Cap', align: 'right', value: 'volume_percent' },
        { text: 'Circulating Supply', value: 'circulating_supply' },
        { text: 'Change 24h', value: 'quote.USD.percent_change_24h' },
        { text: 'Change 7d', value: 'quote.USD.percent_change_7d' }
      ],
      items: [],
      filteredItemsLength: 100,
      errors: []
    }
  },
  methods: {
    customFilter (items, search, filter) {
      // Switch does not seem to work here, because of the breaks?, so using a series of ifs
      search = search.toString().toLowerCase()
      // All
      if (this.filter === 0) {
        if (search) {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.name.toLowerCase().includes(this.search)) this.filteredItemsLength++
            return item.name.toLowerCase().includes(this.search)
          })
        }
        else {
          this.filteredItemsLength = 100
          return this.items
        }
      }
      // < $1.00
      if (this.filter === 1) {
        if (search) {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 1.000 && item.name.toLowerCase().includes(this.search)) this.filteredItemsLength++
            return item.quote.USD.price < 1.0000 && item.name.toLowerCase().includes(this.search)
          })
        }
        else {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 1.0000) this.filteredItemsLength++
            return item.quote.USD.price < 1.0000
          })
        }
      }
      // < $0.10
      if (this.filter === 2) {
        if (search) {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 0.1000 && item.name.toLowerCase().includes(this.search)) this.filteredItemsLength++
            return item.quote.USD.price < 0.1000 && item.name.toLowerCase().includes(this.search)
          })
        }
        else {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 0.1000) this.filteredItemsLength++
            return item.quote.USD.price < 0.1000
          })
        }
      }
      // < $0.01
      if (this.filter === 3) {
        if (search) {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 0.0100 && item.name.toLowerCase().includes(this.search)) this.filteredItemsLength++
            return item.quote.USD.price < 0.0100 && item.name.toLowerCase().includes(this.search)
          })
        }
        else {
          this.filteredItemsLength = 0
          return this.items.filter(item => {
            // Increment filtered items count
            if (item.quote.USD.price < 0.0100) this.filteredItemsLength++
            return item.quote.USD.price < 0.0100
          })
        }
      }
    }
  },
  created () {
    // Get top 100 coins from coinmarketcap.com API V2
    axios.get(`http://localhost:3000/latest`)
      .then(response => {
        const data =  response.data.data
        for (const [key, value] of Object.entries(data)) {
          this.items.push({ ...value, 'volume_percent': (value.quote.USD.volume_24h / value.quote.USD.market_cap) * 100 })
        }
      })
      .catch(e => {
        console.log(e)
        // this.errors.push(e)
      })
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
    },
    largeToUSD: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      return formatter.format(value)
    },
    volumePercent: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })
      return formatter.format(value)
    }
  }
}
</script>

<style scoped>
  .cell-color-red {
    color: red
  }
  .cell-color-green {
    color: green
  }
</style>
