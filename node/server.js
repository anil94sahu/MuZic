const express = require('express');
const bodyParser= require('body-parser')
const app = express();


/* app.listen(8000, function() {
   
}) */
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if(err) throw err;
    var db = client.db('MuZic');
   
  
    // Start the application after the database connection is ready
    app.listen(3000);
    db.collection("albums").find({}, function(err, docs) 
    { var resultArray  = [];
      //  console.log(docs);
        docs.forEach(function(doc) {
            resultArray.push(doc);
          }, function (err) {
            console.log('results:', resultArray);
            
          });
    })
  });


