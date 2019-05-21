var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const db='mongodb://abhinav_2k17:mlabs700@ds349065.mlab.com:49065/products';

mongoose.connect(db,{useNewUrlParser: true},function(err){
if(err){
  console.log(err);
}
else {
  // console.log('connected to mongodb databse');
}
});
module.exports={mongoose};
