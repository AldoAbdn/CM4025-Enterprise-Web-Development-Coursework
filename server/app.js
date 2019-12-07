var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Security
var security = require("./security/security");
//Controllers 
var indexController = require('./controllers/indexController');
var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
var feedController = require('./controllers/feedController');
//Express App
var app = express();
//Database
var dbURL = 'mongodb://GlAdOs:ThisStatementIsFalse101@ds131784.mlab.com:31784/rss';
mongoose.connect(dbURL, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error'));

//Middleware Setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Route Setup
app.get("/", indexController.returnIndex);
//Auth
app.post("/api/auth/login", security.secure, authController.login);
app.post("/api/auth/addUser", security.secure, authController.signup);
app.post("/api/auth/logout", security.secure, authController.logout);
//User
app.get("/api/user/getDetails", security.secure, security.checkToken, userController.getDetails);
app.post("/api/user/addFeed", security.secure, security.checkToken,userController.addFeed);
app.delete("/api/user/removeFeed", security.secure, security.checkToken, userController.removeFeed);
//Feed
app.get("/api/feed/getFeeds", security.secure, security.checkToken, feedController.getFeeds);
app.get("/api/feed/getFeedSources", security.secure, security.checkToken, feedController.getFeedSources);
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
  res.send(err.message);
});

module.exports = app;
