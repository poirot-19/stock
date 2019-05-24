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
    message: "From which date you want to start DD-MMM-YYYY:- ",
    validate: function validateStockDate(startDate){
        return startDate !== '' || "Please enter a start date";
    }
  },
  {
    type: 'input',
    name: 'endDate',
    message: "Till which date you want to analyze DD-MMM-YYYY:- " ,
    validate: function validateStockDate(endDate){
        return endDate !== '' || "Please enter a end date";
    }
  }
];

module.exports={questions};
