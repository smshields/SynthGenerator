const { SerialPort, ReadlineParser } = require('serialport');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

express.static.mime.define({'application/javascript': ['js']});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


//
// SerialPort.list().then(
//   ports =>{
//     console.log("List of ports");
//     console.log(ports);
//   },
//   err => {
//     console.log("Error! ");
//     console.log(err);
//   } 
// );

// //SerialPort setup
// let port = new SerialPort(
//   {
//     path:'/dev/ttyACM0',
//     baudRate: 115200
//   },
//   function(err){
//     if(err){
//       return console.log('Error: ', err.message);
//     }
//   }
// );
// //SerialPort Parser
// let parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
// parser.on('data', console.log);

// port.on('data', function (data){

// });

// port.write('string', function(err) {
//   if(err){
//     return console.log('Error on write: ', err.message);
//   }
//   console.log('Message written.');
// });

// port.on('error', function(err){
//   //console.log('Error: ', err.message);
// });

// port.on('readable', function(){
//   //console.log('Data: ', port.read());
// });



module.exports = app;
