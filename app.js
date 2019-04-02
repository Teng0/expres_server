var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();



// ისეთი ფუნქციის შექმნა რომელიც პარამეტს იღებს და midlware ს აბრუნებს

var m = function(param){
  return function(req,res,next){
      req.foo=param
      next();
  }
}
//Express Session ის შემოტანა
app.use(session({
  secret: 'randomKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//midware ს დამატება
app.use(m("bar"));
app.use(function(req,res,next){
//  req.m("bar");
  next();
})

app.use(function(req,res,next){
  //console.log(req.foo);
  next();
})

// ისეთი ფუნქციის შექმნა რომელიც პარამეტს იღებს და midlware ს აბრუნებს

var m = function(param){
  return function(req,res,next){
      req.foo=param
      next();
  }
}


// view engine setup
//ესენი PUG ის სამუშაოთ
//app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'pug');


//ეს nunjucks ის სამუშაოთ
app.set('views2', path.join(__dirname, 'views2'));
nunjucks.configure('views2', {
  autoescape: true,
  express: app
});


app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// p საც რომ მოერგოს და porduct საც
app.use('/p(roduct)?', productRouter);
//სტატიკური ფაილის გამოძახება
app.use("/assets",express.static(path.join(__dirname,"public")))
//როუტების გაწერა
app.get("/page/about-us",function(req,res){

  //res.send("About US");

// GET ით გაყოლებული პარამეტრები
  res.send(req.query);
});
// : ით გამოიყოფა დინამური სეგნემტი (ID ) სახელი რომ ვიცოდეთ რა პარამეტრს შეესაბამება
app.get("/page/:id",function(req,res){

  //  / ის მერე გადაცემული :id  პარამეტრის მნიშვნელობა
  res.send(req.params);
  
  //res.send("IDs");
});
app.get("/page",function(req,res){

  res.send("PAGE PAGE");
});


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
