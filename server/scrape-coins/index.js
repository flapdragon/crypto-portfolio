const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()

// GET Screen scraper at CoinMarketCap for individual coins
router.get('/:coin', (req, res) => {
  // Axios call to CoinMarketCap
  axios.get(`https://coinmarketcap.com/currencies/${req.params.coin}/`)
    .then(response => {
      if (response.status === 200) {
        const htmlAll = response.data
        const $ = cheerio.load(htmlAll)
        // Get market cap, wolumve 24, circulating supply and max supply
        // NOTE: Sometimes there is also a total supply
        let headers = []
        let data = []
        let obj = {}
        $('.details-panel-item--marketcap-stats.flex-container > .coin-summary-item').each(function(i, elem) {
          const header = $(this).find('h5').text().replace(/[()]/g, '').replace(/\s/g, '_').replace(/#/g, 'rank').toLowerCase()
          headers.push(header)
          const value = $(this).find('div > span > span:first-child').text().replace(/\n/g, '').replace(/\$/g, '').replace(/,/g, '') || $(this).find('div > span').text().replace(/\n/g, '').replace(/\$/g, '').replace(/,/g, '')
          if (i === 2) {
            obj["symbol"] = $(this).find('div').text().match(/[A-Z]/g).join('')
          }
          obj[header] = value
        })
        // Get rank
        obj["rank"] = $('.label.label-success').text().match(/[0-9]/g).join('')
        // Get price
        obj["price"] = $('span#quote_price').attr('data-usd') || $('span#quote_price > span:first-child').text()
        // Name
        obj["name"] = $('h1.details-panel-item--name > img').attr('alt') || req.params.coin
        // Percent change 24 hours
        obj["change_24h"] = $('div.details-panel-item--price.bottom-margin-1x > span:nth-child(2) > span').text()
        // Return coin/token object
        res.status(200).send(obj)
      }
    })
    .catch(err => {
      // console.error(err)
      res.status(500).send(err.toString())
    })
})

module.exports = router
