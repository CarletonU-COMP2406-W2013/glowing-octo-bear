/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , kitchen = require('./routes/kitchen')
  , waiter = require('./routes/waiter')
  , http = require('http')
  , path = require('path')
  , mongoose = require("mongoose")
  , mongoStore = require("connect-mongo")(express)
  , Waiter;

  mongoose.connect("mongodb://localhost/OrderUp");
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function callback () {
  var waiterSchema = mongoose.Schema({
    username: String,
    password: String
  });
  
  Waiter = mongoose.model("Waiter", waiterSchema);
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3500);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon(__dirname + '/public/images/favicon.png'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser())
  app.use(express.session({
      cookie: {maxAge: 60000 * 60} // 60 minutes
    , secret: "t0nberry"
    , store: new mongoStore({ //use a mongo-connect store
      db: "sessions" 
    })
  }));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res, next){
  //redirect to user page if logged in
  if(req.session.username){
      res.redirect("/waiter");
  }else{
      next();
  }
}, routes.index);
app.get('/waiter', function(req, res, next){
    //redirect home if not logged in
    if(req.session.username){
        next();
    }else{
        res.redirect("/");
    }
}, waiter.waiter);
app.post('/login', function(req,res) {
  
})
app.get('/kitchen', kitchen.kitchen);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
