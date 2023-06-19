const mongoose = require('mongoose');

const exchangeIconSchema = new mongoose.Schema(
    {
        exchange_id:{type:String},
        url:{type:String}
    }
)

const exchangesIcon = mongoose.model('exchangeicons',exchangeIconSchema)
module.exports = exchangesIcon;
