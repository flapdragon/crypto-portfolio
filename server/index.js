// NOTE: Cheerio is NOT es6 friendly, e.g. no fat arrow functions
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')

// Express
const app = express()
const port = 3000

// CORS
app.use(cors())

// Local data
const latest = require('./data/latest-02.json')
const useLatest = true

// Get routes
const scrapeCoins = require('./scrape-coins')
const scrapeListings = require('./scrape-listings')
const scrapeHistorical = require('./scrape-historical')

// Set routes
// GET Screen scraper at CoinMarketCap for individual coins
app.use('/scrape/coins', scrapeCoins)
// GET Screen scraper at CoinMarketCap for listings by page
app.use('/scrape/listings', scrapeListings)
// GET Screen scraper at CoinMarketCap for individual coin historical data
app.use('/scrape/historical', scrapeHistorical)

// Coin Market Cap header. Contains API key.
const headers = {
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COIN_KEY || ''
  }
}

// Coinmarketcap latest API
app.get('/latest', (req, res) => {
  if (useLatest) {
    console.log('Using latest local data')
    res.status(200).send(latest)
  }
  else {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', headers)
      .then(response => {
        console.debug(response.data)
        res.status(200).send(response.data)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(err.toString())
      })
  }
})

// Coinmarketcap listing API
app.get('/latest/:coin', (req, res) => {
  axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=10&convert=USD,${req.params.coin}`, headers)
    .then(response => {
      console.log(response.data)
      res.status(200).send(response.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.toString())
    })
  // res.status(200).send(req.params.coin)
})

// Holo YTD
// https://coinmarketcap.com/currencies/holo/historical-data/?start=20180101&end=20181008
// Bytecoin YTD
// https://coinmarketcap.com/currencies/bytecoin-bcn/historical-data/?start=20180101&end=20181008

app.use('/analysis', express.static(path.join(__dirname, '../dist')))

// Express server
app.get('/', (req, res) => res.send('Hello crypto'))

// 404
app.use((req, res, next) => {
  res.status(404).send('(╯°□°）╯︵ ┻━┻')
})

app.listen(port, () => console.log(`Crypto app listening on port ${port}!`))
