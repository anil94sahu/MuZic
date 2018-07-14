var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var song = require('./song');
mongoose.connect('mongodb://localhost:27017/MuZic');

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

router.route('/songs').post(function (req, res) {
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

router.route('/songs').get(function (req, res) {
  song.find(function (err, products) {
      if (err) {
          res.send(err);
      }
      res.send(products);
  });
});

router.route('/songs/:id').get(function(req,res){
  song.findById(req.params.id, function (err,song) {  
    if(err){
      res.send(err)
    }
    res.send(song)
  })
})


router.route('/songs/:id').delete(function (req,res) {
    song.remove({id:req.params.id}, function (err,song) {
      if (err) {
        res.send(err)
      }
      res.send(song)  
      })
    }
)

router.route('/songs/:id').put(function (req,res) {
  song.findById(req.params.id, function (err,song) {  
    if(err){
      res.send(err)
    }
    song.artist_id = req.body.artist_id;
    song.album_id = req.body.album_id;
    song.filename = req.body.filename;
    song.name = req.body.name;
    song.save(function (err) {  
      if (err) {
        res.send(err)
      }
      res.json({message: 'record has been updated'})
    })
  })
  })