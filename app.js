var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
var socketio = require("socket.io");
var app = express();

const { SerialPort, ReadlineParser } = require('serialport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

express.static.mime.define({'application/javascript': ['js']});

const server = require('http').createServer(app);
const io = socketio(server);
app.server = server;

var totemData = {
  roll: 0,
  pitch: 0,
  yaw: 0,
  counter: 0
}

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

io.on('connection', (socket) => {
  console.log("Socket connection started with new user.");

  socket.on('requestData', (req) => {
    //send updated parsing information
    io.emit('data', totemData);
  });

});


//Serial port management
SerialPort.list().then(
  ports =>{
    console.log("List of ports");
    console.log(ports);
  },
  err => {
    console.log("Error! ");
    console.log(err);
  } 
);

//SerialPort setup
let port = new SerialPort(
  {
    path:'/dev/ttyACM0',
    baudRate: 115200
  },
  function(err){
    if(err){
      return console.log('Error: ', err.message);
    }
  }
);
//SerialPort Parser
let parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
parser.on('data', function(data){
  try{
    const jsonStrWithoutNewlines = data.replace(/[\n\r]+/g, '\\n');
    let test = JSON.parse(jsonStrWithoutNewlines);
    totemData.pitch = test["p"];
    totemData.roll = test["r"];
    totemData.yaw = test["y"];
    totemData.counter = test["c"];
    //console.log(totemData);
  }  catch(e) {
    //filter non-json strings out
  }

});



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






module.exports =  app;
