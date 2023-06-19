const exchanges = require('../Models/exchangeModel');
const exchangeIcon = require('../Models/exchangeIconModel')

exports.AddExchange = async (req,res)=>{
    try{
        const data = new exchanges(req.body)
        const add_data = await data.save();
        res.status(200).json({
            success:true
        })
    }catch(err){
        res.status(400).json(err);
    }
}
exports.AddExchangeIcon = async (req,res)=>{
    try{
        const data = new exchangeIcon(req.body);
        const add_data = data.save()
        res.status(200).json({
            success:true
        })
    }catch(err){
        res.status(400).json(err)
    }
}
exports.fetchExchange = async (req,res)=>{
    try{
        
        const data = await exchanges.aggregate([{ $lookup:
            {
              from: 'exchangeicons',
              localField: 'exchange_id',
              foreignField: 'exchange_id',
              as: 'icons'
            }
          }])
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({success:false,err});
    }
}
