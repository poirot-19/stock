'use strict';
const express=require ('express');
const bodyParser=require('body-parser');
const program=require('commander');
const inquirer= require('inquirer');
const {Stock}=require('./models/stock');
const {mongoose}=require('./mongoose/mongoose');

const port=3000;
const app=express();
const api=require('./routes/api.js');

var output = [];
var questions = [
  {
    type: 'input',
    name: 'stockName',
    message: "Welcome Agent! Which stock you need to process?:-",
    validate: function validateStockName(stockName){
        return stockName !== '' || "Please enter a stock name";
    }
  },
  {
    type: 'input',
    name: 'startDate',
    message: "From which date you want to start DD-MMM-YYYY:- "
  },
  {
    type: 'input',
    name: 'endDate',
    message: "Till which date you want to analyze DD-MMM-YYYY:- " ,
  }
];

var questions2=[
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you want to continue (Press Enter for YES)',
    default: true
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
    var mStock=answers.stockName;
    var mStartDate=answers.startDate;
    var mEndDate=answers.endDate;
    Stock.find({
      stockName: mStock,
      stockDate: { $gte: new Date(mStartDate) , $lte: (mEndDate)}
      }).then((stock) => {
      if (stock.length==0) {

        Stock.findOne({stockName:{$regex:mStock}}).then((stock2)=>{

          if(stock2.length!=0){
            console.log('Did you mean this : ' + stock2.stockName);
            inquirer.prompt(questions2).then(answers2 => {
              if (answers2.askAgain) {
                ask();
              } else {
                console.log('Thank You for visiting');
              }
            });
            } else {
            console.log("Stock Not Found came inside second");
            inquirer.prompt(questions2).then(answers2 => {
              if (answers2.askAgain) {
                ask();
              } else {
                console.log('Thank You for visiting');
              }
            });
          }

        }).catch((e)=>{
          console.log('Stock Not found');
          inquirer.prompt(questions2).then(answers2 => {
            if (answers2.askAgain) {
              ask();
            } else {
              console.log('Thank You for visiting');
            }
          });
        });

      }else{
            var sum=0;
            for (var i=0;i<stock.length;i++){
                // console.log(stock[i].stockName);
                // console.log(stock[i].stockDate);
                // console.log(stock[i].stockPrice);
                sum=sum+stock[i].stockPrice;
            }
            var mean=(sum/stock.length).toFixed(2);
            var sd=0; var tsd=0;
            for(var i=0;i<stock.length;i++){
              sd=sd+Math.pow((stock[i].stockPrice-mean),2);
            }
            var maxProfit=0; var currMax=0; var tempMax=0;
            var startIndex=-1,endIndex=-1;
            for(var i=0;i<stock.length;i++){
              for(var j=i+1;j<stock.length;j++){
                tempMax=stock[j].stockPrice-stock[i].stockPrice;
                if(tempMax>maxProfit){
                  maxProfit=tempMax;
                  startIndex=i;
                  endIndex=j;
                }
              }
            }


            tsd=(Math.sqrt((sd/(stock.length)))).toFixed(2);
            console.log("Here is your result :-");
            console.log('Mean is '+mean);
            console.log('Standard Deviation is ' +tsd);
            if(maxProfit>0){
              console.log('Buy Date : '+stock[startIndex].stockDate);
              console.log('Sell Date : '+stock[endIndex].stockDate);
              console.log('Maximum profit will be : '+maxProfit);
            }else{
              console.log('No need to buy Stocks, stock is going down continuously');
            }

            inquirer.prompt(questions2).then(answers2 => {
              if (answers2.askAgain) {
                ask();
              } else {
                console.log('Thank You for visiting');
              }
            });
      }


      }).catch((e) => {
      console.log(e);
    });

  })
};

ask();

app.use(bodyParser.json());
app.use('/api',api);

app.listen(port,function(){
  // console.log('listening on port '+port);
});
