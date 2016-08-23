var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

// app.get('/', function(req,res){
//   res.send('Hello World!!');
// });

mongoose.connect("mongodb://test:testtest@ds013956.mlab.com:13956/sowcomedb");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected!!!!!");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// app.use(express.static(__dirname + '/public'));
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);


var data={count:0};
app.get('/', function(req, res){
  // console.log('/ =====', res);
  // console.log('/ =====', req);
  data.count++;
  res.render('my_first_ejs',data);
});
app.get('/reset', function(req, res){
  data.count=0;
  res.render('my_first_ejs', data);
});
app.get('/set/count', function(req,res){
  // console.log('/set/count =====', req);
  // console.log('/set/count =====', res);
  if(req.query.count) data.count=req.query.count;
  res.render('my_first_ejs', data);
});
app.get('/set/:num', function(req, res){
  data.count=req.params.num;
  res.render('my_first_ejs', data);
});



// app.get('/', function (req,res) {
//     res.render('my_first_ejs');
// });

app.listen(3000, function(){
  console.log('Server On!!');
});
