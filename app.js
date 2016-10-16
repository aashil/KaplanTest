var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var obj = JSON.parse(fs.readFileSync('data/channel.json', 'utf8'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/data', function (req, res){
  res.json(obj);
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);