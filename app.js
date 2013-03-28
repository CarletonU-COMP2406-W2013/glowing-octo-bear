/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , kitchen = require('./routes/kitchen')
  , waiter = require('./routes/waiter')
  , http = require('http')
  , path = require('path')
  , bcrypt = require("bcrypt") //hashing algorithm
  , mongoose = require("mongoose")
  , mongoStore = require("connect-mongo")(express)
  , Waiter
  , Menu;

mongoose.connect("mongodb://localhost/OrderUp");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
var waiterSchema = mongoose.Schema({
  username: String,
  password: String
});
var orderSchema = mongoose.Schema({
  _id: Number,
  table: Number,
  name: String,
  price: Number
});
var menuSchema = mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  type: String
}, {
  collection: "menu"
})

Waiter = mongoose.model("Waiter", waiterSchema);
Order = mongoose.model("Order", orderSchema);
Menu = mongoose.model("Menu", menuSchema);
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
  
  // enable cookies
  app.use(express.cookieParser())

  // setup session management 
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

// post for loading data into the menu
app.post('/drinks', function(req, res){
  Menu.find({type: "Beverage"}, function(err, items) {
      res.send(200,items)
  });
});
app.post('/food', function(req, res){
  Menu.find({type: "Food"}, function(err, items) {
      res.send(200,items)
  });
});
app.post('/dessert', function(req, res){
  Menu.find({type: "Dessert"}, function(err, items) {
      res.send(200,items)
  });
});

app.post("/register", function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  req.session.username = username
  Waiter.find({username: username}, function(err, users){
    //check if the user already exists
    if(users.length!=0){
      res.redirect("/?error=user already exists");  
      return;
    }
    //generate a salt, with 10 rounds (2^10 iterations)
    bcrypt.genSalt(10, function(err, salt) {
      //hash the given password using the salt we generated
      bcrypt.hash(password, salt, function(err, hash) {
        //create a new instance of the mongoose Waiter model we defined above
        var newWaiter = new Waiter({
          username: username,
          password: hash
        }); 
        
        //save() is a magic function from mongoose that saves this user to our DB
        newWaiter.save(function(err, newWaiter){
          res.send(200)
        });    
      });
    }); 
  }); 
});

// handle login
app.post('/login', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  //Search the Database for a Waiter with the given username
  Waiter.find({username: username}, function(err, users){
    //we couldn't find a user with that name
    if(err || users.length==0){
      res.send(400);
      return;
    }
    
    var user = users[0];
    //compare the hash we have for the user with what this password hashes to
    bcrypt.compare(password, user.password, function(err, authenticated){
      if(authenticated){
        req.session.username = user.username;
        res.send(200);
      }else{
        res.send(401);
      }
    });
  });
});

// handle logout
app.post("/logout", function(req, res){
  req.session.destroy(function(err){
      if(err){
          console.log("Error: %s", err);
      }
      res.redirect("/");
  }); 
});

// handle orderCreation
app.post("/sendorder", function(req, res){
  req.session.destroy(function(err){
      if(err){
          console.log("Error: %s", err);
      }
      // cleans out that tables orders
      var query = Order.remove({table: req.body.data[0].table});
      query.exec();


      var newOrder;
      for (var i = req.body.data.length - 1; i >= 0; i--) {
        newOrder = new Order({
          _id: req.body.data[i]._id,
          table: req.body.data[i].table,
          name: req.body.data[i].name,
          price: req.body.data[i].price
        }); 
        newOrder.save(function(err, newOrder){});
      }
      res.send(200);
  }); 
});



///// call back for kitchen
app.get('/kitchen', kitchen.kitchen);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
