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
const latest = require('./data/latest.json')

// Coin Market Cap header. Contains API key.
const headers = {
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COIN_KEY || ''
  }
}

// Coinmarketcap latest API
app.get('/latest', (req, res) => {
  if (latest) {
    console.debug('latest')
    res.status(200).send(latest.data)
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

// API: GET. Screen scraper. Hard-coded everything right now.
app.get('/screen-scrape/top-100/:page', (req, res) => {
  axios.get(`https://coinmarketcap.com/${req.params.page}`)
    .then((response) => {
      if (response.status === 200) {
        const htmlAll = response.data
        const $ = cheerio.load(htmlAll)
        const title = $('h2.bottom-margin-1x').text()
        let headers = []
        headers.push["symbol"]
        $('table#currencies > thead > tr > th').each(function(i, elem) {
          const header = $(this).text().replace(/[()]/g, '').replace(/\s/g, '_').replace(/#/g, 'rank').toLowerCase()
          headers.push(header)
        })
        let data = []
        let obj = {}
        $('table#currencies > tbody > tr').each(function(i, elem) {
          $(this).find('td').each(function(i, elem) {
            // if ($(this).attr('data-sort')) {
            //   obj[headers[i]] = $(this).attr('data-sort')
            // }
            // else {
            //   obj[headers[i]] = $(this).text().replace(/\n/g, '')
            // }

            console.log(i, $(this).attr('data-sort'), $(this).text())

            switch (i) {
              case 1:
              case 2:
                obj[headers[i]] = $(this).attr('data-sort')
                break
              case 5:
                obj['symbol'] = $(this).text().match(/[a-zA-Z]/g).join('')
                obj[headers[i]] = $(this).text().match(/[0-9]/g).join('')
                break
              default:
                obj[headers[i]] = $(this).text().replace(/\n/g, '').replace(/\$/g, '').replace(/,/g, '')
                break
            }
          })
          data.push(obj)
          obj = {}
        })
        res.status(200).send(data)
      }
    }
  )
})

// API: GET. Screen scraper. Hard-coded everything right now.
app.get('/screen-scrape/historical-data', (req, res) => {
  axios.get('https://coinmarketcap.com/currencies/bytecoin-bcn/historical-data/?start=20180101&end=20181008')
    .then((response) => {
      if (response.status === 200) {
        const htmlAll = response.data
        const $ = cheerio.load(htmlAll)
        const title = $('h2.bottom-margin-1x').text()
        let headers = []
        $('table.table > thead > tr > th').each(function(i, elem) {
          headers.push($(this).text())
        })
        let data = []
        let obj = {}
        $('table.table > tbody > tr').each(function(i, elem) {
          $(this).find('td').each(function(i, elem) {
            if ($(this).attr('data-format-value')) {
              obj[headers[i]] = $(this).attr('data-format-value')
            }
            else {
              obj[headers[i]] = $(this).text()
            }
          })
          console.log(obj)
          data.push(obj)
          obj = {}
        })
        console.log(title)
        console.log(headers)
        // console.log(data)
        res.status(200).send(data)
      }
    }
  )
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
