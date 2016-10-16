var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var obj = JSON.parse(fs.readFileSync('data/channel.json', 'utf8'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set the port number
var port = process.env.PORT || 3000;
var router = express.Router();

//Setting the CORS header to allow resources on other port to access backend data.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Create a route for sending JSON data
router.get('/data', function (req, res){
  res.json(obj);
});

app.use('/', router);
app.listen(port);
console.log('Backend running on port: ' + port);