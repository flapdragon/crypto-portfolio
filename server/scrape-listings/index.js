const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()

// GET Screen scraper at CoinMarketCap for listings by page
router.get('/:page', (req, res) => {
  // Axios call to CoinMarketCap
  axios.get(`https://coinmarketcap.com/${req.params.page}`)
    .then((response) => {
      if (response.status === 200) {
        const htmlAll = response.data
        const $ = cheerio.load(htmlAll)
        // const title = $('h2.bottom-margin-1x').text()
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
    })
  })

module.exports = router
