var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

// app.get('/', function(req,res){
//   res.send('Hello World!!');
// });

// mongoose.connect("mongodb://tester:qwe123@ds013956.mlab.com:13956/sowcomedb");
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected!!!!!");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});


var dataSchema = mongoose.Schema({
  name:String,
  count:Number
});
var Data = mongoose.model('data',dataSchema);
Data.findOne({name:"myData"}, function(err,data){
  if(err) return console.log("Data Error : ",err);
  if(!data){
    Data.create({name:"myData", count:0}, function(err,data){
      if(err) return console.log("Data create Error : ",err);
      console.log("Counter initialized : ",data);
    });
  }
});




// app.use(express.static(__dirname + '/public'));
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname);

app.get('/', function(req,res){
  Data.findOne({name:"myData"},function(err,data){
    if(err) return console.log("Data Error : ",err);
    data.count++;
    data.save(function(err){
      if(err) return console.log("Data save Error : ",err);
      res.render('my_first_ejs',data);
    });
  });
});


// var data={count:0};
// app.get('/', function(req, res){
//   // console.log('/ =====', res);
//   // console.log('/ =====', req);
//   data.count++;
//   res.render('my_first_ejs',data);
// });
// app.get('/reset', function(req, res){
//   data.count=0;
//   res.render('my_first_ejs', data);
// });
// app.get('/set/count', function(req,res){
//   // console.log('/set/count =====', req);
//   // console.log('/set/count =====', res);
//   if(req.query.count) data.count=req.query.count;
//   res.render('my_first_ejs', data);
// });
// app.get('/set/:num', function(req, res){
//   data.count=req.params.num;
//   res.render('my_first_ejs', data);
// });


app.get('/reset',function(req,res){
  setCounter(res,0);
});
app.get('/set/count', function(req,res){
  if(req.query.count) setCounter(res, req.query.count);
  else getCounter(res);
});
app.get('/set/:num', function(req,res){
    if(req.params.num) setCounter(res,req.params.num);
    else getCounter(res);
});
function setCounter(res,num){
  console.log("setCounter");
  Data.findOne({name:"myData"},function(err,data){
    if(err) return console.log("Data setCounter Error : ",err);
    data.count=num;
    data.save(function(err){
      if(err) return console.log("Data save Error : ",err);
      res.render('my_first_ejs',data);
    });
  });
}
function getCounter(res){
  console.log("getCounter");
  Data.findOne({name:"myData"},function(err,data){
    if(err) return console.log("Data getCounter Error : ",err);
    res.render('my_first_ejs',data);
  });
}

// app.get('/', function (req,res) {
//     res.render('my_first_ejs');
// });

app.listen(3000, function(){
  console.log('Server On!!');
});
