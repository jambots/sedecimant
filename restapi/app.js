var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var debug = require('debug')('app');
var querystring = require('querystring');
var md5 = require('md5');

const adminRouter = require('./routes/adminRoutes');
const apiRouter = require('./routes/apiRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/webfonts', express.static(__dirname + '/public/fonts/webfonts/'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', adminRouter);
app.post('/', adminRouter);
app.post('/site/approving/:id', adminRouter);
app.post('/site/banning/:id', adminRouter);
app.post('/site/syndication/:id', adminRouter);
app.post('/site/complete/:id', adminRouter);
app.get('/site/edit/:id', adminRouter);
app.post('/site/edit/:id', adminRouter);
app.get('/site/delete/:id', adminRouter);
app.post('/site/delete/:id', adminRouter);
app.get('/site/complete/:id', adminRouter);
app.get('/site/add/', adminRouter);
app.post('/site/add/', adminRouter);

app.post('/api/list/', apiRouter);
app.post('/api/banned/', apiRouter);
app.post('/api/approved/', apiRouter);
app.post('/api/unsyndicate/:id', apiRouter);
app.post('/api/syndicate/', apiRouter);


app.use('/favicon.ico', (req, res) => res.status(204));
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
  res.render(err);
});

module.exports = app;
