const express=require('express');
const {Stock}=require('../models/stock');
var {mongoose}=require('../mongoose/mongoose');

const router=express.Router();

router.post('/stocks',function(req,res){
        var stock=new Stock({
        stockName     :req.body.stockName,
        stockDate     :req.body.stockDate,
        stockPrice    :req.body.stockPrice,
        });

        stock.save(function(err,registeredUser){
        if(err)
        console.log(err);
        else {
          res.status(201).send('stock added');
          }
        });
      });

module.exports=router;
