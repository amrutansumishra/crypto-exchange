const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://0.0.0.0:27017/cryptoExchange').then(()=>{
    console.log("MangoDB connected")
}).catch((err)=>{
    console.log(err.message)
})

const exchangeRoute = require('./Routes/Crypto');
app.use(express.json());
app.use(cors());
app.use('/api/',exchangeRoute);


app.listen(PORT,()=>{
    console.log('Server run on port')
})