var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./song');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8000;
var router = express.Router();

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);

router.use(function (req, res, next) {
  // do logging 
  // do authentication 
  console.log('Logging of request will be done here');
  next(); // make sure we go to the next routes and don't stop here
});

router.route('/products').post(function (req, res) {
  var p = new song();
  p.id = req.body.id;
  p.album_id = req.body.album_id;
  p.artist_id = req.body.artist_id;
  p.name = req.body.name;
  p.filename = req.body.filename;
  p.save(function (err) {
      if (err) {
          res.send(err);
      }
      res.send({ message: 'songs Created !' })
  })
});
