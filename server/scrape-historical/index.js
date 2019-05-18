const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()

/**
 * @description GET Screen scraper at CoinMarketCap to get individual coin historical data.
 * @param {string} coin name of coin
 * @param {string} start start date of historical data search
 * @param {string} end end date of historical data search
 * @returns {JSON} JSON with date, open, high, low, close, volume, market cap
 */
router.get('/:coin', (req, res) => {
  // Get today's date
  const date = new Date()
  // Start date
  const start = req.query.start || `${date.getFullYear() - 1}${('0' + (date.getMonth()+1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`
  // End date
  const end = req.query.end || `${date.getFullYear()}${('0' + (date.getMonth()+1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`
  // Axios call to CoinMarketCap
  axios.get(`https://coinmarketcap.com/currencies/${req.params.coin}/historical-data/?start=${start}&end=${end}`)
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

module.exports = router
