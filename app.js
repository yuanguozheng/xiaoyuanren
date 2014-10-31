var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var msgResponse = require('./modules/public/msgResponse');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

var routes = require('./routes/index');
var userss = require('./routes/user');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: settings.cookieSecret,
    key: settings.cookieSecret,
    cookie: {secure: true, maxAge: 1000 * 60 * 60 * 24 * 30},
    store: new MongoStore({
        db: settings.db
    })
}));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', userss);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    msgResponse.doError(0, res);
    return;
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        msgResponse.doError(-1, err.message, res);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    msgResponse.doError(-1, err.message, res);
});


module.exports = app;
