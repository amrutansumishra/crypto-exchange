const route = require('express').Router();
const {fetchExchange,AddExchangeIcon,AddExchange} = require('../Controller/exchangeContorller')
route.get('/exchanges', fetchExchange)
route.post('/add-exchanges', AddExchange)
route.post('/add-exchange-icon', AddExchangeIcon)

module.exports = route;