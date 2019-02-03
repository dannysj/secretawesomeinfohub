// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var mongoose = require('mongoose');
    var db;
    // configuration =================
    var config = {
          "USER"    : "heeirunAdmin",
          "PASS"    : "password",
          "HOST"    : "ec2-3-85-184-97.compute-1.amazonaws.com",
          "PORT"    : "27017",
          "DATABASE" : "secretawesomeinfo"
        };

        var dbPath  = "mongodb://"+config.USER + ":"+
    config.PASS + "@"+
    config.HOST + ":"+
    config.PORT + "/"+
    config.DATABASE;
    var standardGreeting = 'Hello World!';
    var greetingSchema = mongoose.Schema({
        sentence: String
    });
    var Greeting = mongoose.model('Greeting', greetingSchema);
    db = mongoose.connect(dbPath);
    mongoose.connection.once('open', function() {
  var greeting;
  Greeting.find( function(err, greetings){
   if( !greetings ){
      greeting = new Greeting({ sentence: standardGreeting });
      greeting.save();
    }
  });
});


    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
    var routes = require("./routes/routes.js")(app);
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json



    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
