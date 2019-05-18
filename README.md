# crypto-portfolio
Portfolio to manage crypto investments. Written in Vue.js, Express, Node.js and MongoDB.

## Setup
You will need a folder/file under the root called local-data/Coins.js that export defaults an array of objects. Something like:
```javascript
export default [
  { id: 'bitcoin', coinsOwned: 1000000 }
]
```
Create an account and generate an API key at [https://coinmarketcap.com/api/](https://coinmarketcap.com/api/).

Use that key in the header of all HTTP calls to that API. Their [documentation](https://coinmarketcap.com/api/documentation/v1/) explains this very clearly. My example:
```javascript
const headers = {
  headers: {
    'X-CMC_PRO_API_KEY': 'ef813d40-6cbd-4b9e-8831-8be8f03124ab' // Random UUID in the same format as the key
  }
}
```

To install and run the API:
```
cd ui
npm install
npm start
```

To install and run the UI (the same instructions):
```
cd ui
npm install
npm start
```
