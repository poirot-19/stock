const express=require('express');
const {Stock}=require('../models/stock');
var {mongoose}=require('../mongoose/mongoose');

const router=express.Router();

// router.get('/stocks',(req,res)=>{
//
//   var page = req.query.page;
//   var limit = req.query.limit;
//   var name = req.query.name;
//   var sortParam = req.query.sortParam;
//
//   var x=1;
//   var len=sortParam.length;
//   if(sortParam.charAt(0)==='-'){
//    x = -1;
//    sortParam=sortParam.substr(1,len-1);
//   }else {
//    x = 1;
//   }
//
//   User.paginate({ $or:[ {'first_name':{ "$regex": name, "$options": "i" }}, {'last_name':{ "$regex": name, "$options": "i" }} ]}
//                   ,[{ page: page, limit: Number(limit), sort:{sortParam:x} }], function(err, result) {
//     if(err){
//       console.log(err);
//     } else{
//       res.status(200).send(result.docs);
//     }
//   });
//
// });


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


// router.get('/users/:id', (req, res) => {
//         var id = req.params.id;
//         User.findOne({
//           id: id
//         }).then((user) => {
//           if (!user) {
//             return res.status(404).send('User not found');
//           }
//           console.log(user);
//           res.status(200).send({user});
//         }).catch((e) => {
//           res.status(400).send(e);
//         });
//       });




module.exports=router;
