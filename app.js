var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('mongoose');
db.connect('mongodb+srv://renoandrianto:3035663473@comp3322.lk0zf.mongodb.net/project?retryWrites=true&w=majority'
, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err)
  console.log("MongoDB connection error: "+err);
  else
  console.log("Connected to MongoDB");
});

var userSchema = new db.Schema({
  UserId: String,
  PW: String,
});

var cartSchema = new db.Schema({
  // CartId: String,
  MusicId: String,
  UserId: String,
  Quantity: Number,
}, {
  toJSON: {virtuals:true}
});

var musicSchema = new db.Schema({
  MusicId: String,
  MusicName: String,
  Category: String,
  Composer: String,
  Description: String,
  Price: Number,
  Published: String,
  NewArrival: Boolean,
});

cartSchema.virtual('music', {
  ref: 'music',
  localField: 'MusicId',
  foreignField: 'MusicId',
  justOne: true
});

var user = db.model("user", userSchema);
var cart = db.model("cart", cartSchema);
var music = db.model("music", musicSchema);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "session"}))



app.use(function(req, res, next) {
  req.user = user;
  req.cart = cart;
  req.music = music;
  next();
});

app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
