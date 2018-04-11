# crypto-portfolio
Portfolio to manage crypto investments. Written in Vue.js, Express, Node.js and MongoDB.

## Full disclosure
Full disclosure, it's just Vue.js and Axios right now.

## Setup
You will need a folder/file under the root called local-data/Coins.js that export defaults an array of objects. Something like:

```javascript
export default [
  { id: 'bitcoin', coinsOwned: 1000000 }
]
```
