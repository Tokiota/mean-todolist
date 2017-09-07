// set up ======================================================================
var settings = require('./config/settings');
var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(settings.dbUrl, { useMongoClient: true }); 
app.use(express.static('./public')); 	
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override')); 

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
