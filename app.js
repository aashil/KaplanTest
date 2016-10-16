var express = require('express');
var app = express();
var bodyPaser = require('body-parser');

app.use(bodyPaser.urlencoded({extended: true}));
app.use(bodyPaser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/data', function (req, res){
  res.json({message: 'Channel data sending soon...'});
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);