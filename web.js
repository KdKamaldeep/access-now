// var express = require('express')

// app = express();
// // parse urlencoded request bodies into req.body
// var bodyParser = require('body-parser')
// // app.use(
// // bodyParser.urlencoded({ extended: true })
// // );
// var options = {
  // dotfiles: 'ignore',
  // etag: false,
  // extensions: ['htm', 'html','js','css'],
  // index: false,
  // maxAge: '1d',
  // redirect: false,
  // setHeaders: function (res, path, stat) {
    // res.set('x-timestamp', Date.now());
  // }
// }

// app.use(express.static("dist",options));


// //app.use(__dirname + "/dist");
// app.listen(process.env.PORT || 5000);

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.listen(process.env.PORT || 5000)