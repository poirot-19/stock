const mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
    stockName: {
    type: String,
    required:true,
    trim:true
    },
    stockDate: {
    type: Date,
    required: true,
    },
    stockPrice: {
    type: Number,
    required: true,
    }
  });

StockSchema.set({usePushEach:true});
var Stock = mongoose.model('Stock', StockSchema);

module.exports = {Stock}
