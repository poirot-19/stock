'use strict';

const express=require ('express');
const bodyParser=require('body-parser');
const program=require('commander');
const inquirer= require('inquirer');

const {Stock}=require('./models/stock');
const {mongoose}=require('./mongoose/mongoose');
var {questions}=require('./utils/questions');
var {questions2}=require('./utils/questions2');
const api=require('./routes/api.js');

//dfdfd
const port=3000;
const app=express();


//Function for comfirming with user if it wants to continue asking for stocks
function check(){
  inquirer.prompt(questions2).then(answers2 => {
    if (answers2.askAgain) {
      ask();
    } else {
      console.log('Thank You for visiting');
    }
  });
}

//Main function for reading the answers from CLI and giving output
function ask() {
    inquirer.prompt(questions).then(answers => {
            var mStock=answers.stockName;
            var mStartDate=answers.startDate;
            var mEndDate=answers.endDate;
            Stock.find({
                          stockName: mStock,
                          stockDate: { $gte: new Date(mStartDate) , $lte: (mEndDate)}
                          },null, {sort: {stockPrice:1}}).then((stock) => {

                            if (stock.length==0) {
                              Stock.findOne({stockName:{$regex:mStock}}).then((stock2)=>{
                                if(stock2.length!=0){
                                  console.log('Did you mean this : ' + stock2.stockName);
                                  check();
                                } else {
                                    console.log("Stock Not Found came inside second");
                                    check();
                                }

                                }).catch((e)=>{
                                  console.log('Stock Not found');
                                  check();
                                });

                              } else{
                                      var sum=0;
                                        for (var i=0;i<stock.length;i++)
                                          sum=sum+stock[i].stockPrice;

                                        var mean=(sum/stock.length).toFixed(2);
                                        var sd=0; var tsd=0;

                                        for(var i=0;i<stock.length;i++)
                                          sd=sd+Math.pow((stock[i].stockPrice-mean),2);

                                        var maxProfit=0; var currMax=0; var tempMax=0;
                                        var startIndex=-1,endIndex=-1;

                                        for(var i=0,j=stock.length-1;i<j;){
                                          if(stock[j].stockDate>stock[i].stockDate){
                                            startIndex=i;
                                            endIndex=j;
                                            console.log('Here are your results:');
                                            console.log('Buy Date');
                                            console.log(stock[startIndex].stockDate);
                                            console.log('Sell Date');
                                            console.log(stock[endIndex].stockDate);
                                            maxProfit=stock[endIndex].stockPrice-stock[startIndex].stockPrice;
                                            break;

                                    } else{
                                      if((stock[j].stockPrice-stock[j-1].stockPrice)< (stock[i+1].stockPrice-stock[i].stockPrice) ){
                                        j=j-1;
                                      } else{
                                        i=i+1;
                                      }

                                    }
                                  }
                                  if(maxProfit>0){
                                    console.log('Maximum profit will be : '+maxProfit.toFixed(2));
                                  }else{
                                    console.log('No need to buy Stocks, stock is going down continuously');
                                  }
                                  tsd=(Math.sqrt((sd/(stock.length)))).toFixed(2);
                                  console.log('Mean is '+mean);
                                  console.log('Standard Deviation is ' +tsd);
                                  check();
                                }


                              }).catch((e) => {
                                console.log(e);
                              });

                            })
                          };

//Calling the ask() function for the first time
ask();
app.use(bodyParser.json());
app.use('/api',api);

app.listen(port,function(){
});
