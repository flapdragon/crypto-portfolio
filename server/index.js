// NOTE: Cheerio is NOT es6 friendly, e.g. no fat arrow functions
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')

const app = express()
const port = 3000

// API: GET. Screen scraper. Hard-coded everything right now.
app.get('/screen-scrape', (req, res) => {
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

app.listen(port, () => console.log(`Crypto app listening on port ${port}!`))
