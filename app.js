var express 		= require("express");
var bodyparser  	= require("body-parser");
var mongoose		= require("mongoose");
var path 			= require('path');
var cookieParser 	= require('cookie-parser');
var logger 			= require('morgan');
var app 			= express();
require('./passport');

var routes = require('./routes/route');

mongoose.connect("mongodb://localhost/comment");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/', routes);

app.get('*', function(req, res) {
    console.log("dajsdhkjasdhkjashdkjashdkjashd")
    res.sendFile(__dirname+'/frontend/index.html');
})



app.listen(3000, function(req, res)  {
	console.log('server is running at 3000');
});
