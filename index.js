const electron = require('electron');
var electronapp = electron.app;

// LOGGER --------------
const console = require('console');
electronapp.console = new console.Console(process.stdout, process.stderr);
// To use in renderer make
// const remote = require('electron').remote;
// const app = remote.app;
// app.console.log("text")

// -------------- LOGGER

var BrowserWindow = electron.BrowserWindow;

// vendor libraries:
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var path = require('path');
var route = require('./route');

var app = express();

app.set('port', process.env.PORT || 3000);
// USE DEMO VIEWS:
app.set('views', path.join(__dirname, 'demo_views'));
app.set('view engine', 'ejs');

// app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));

app.use(express.static(__dirname + '/bower_components')); // bootstrap
app.use(express.static(__dirname + '/public'));

// Require log descriptions and create a global shared object
global.logDescriptions = require("./public/logs/descriptions.js");
global.resultJSONs = require("./public/logs/resultExports.js")










/* ================
  IMPORTING ROUTES
================ */

// GET
app.get('/', route.home);

app.get('/basicinfo', route.basicInfo);

// Select devices view
app.get('/selectDevices', route.selectDevices);

// measurements in process
app.get('/measurementsInProcess', route.measurementsInProcess);

// results
 app.get('/results', route.results);

// 2nd screen in process
app.get('/inProcessPoster', route.inProcessPoster);

// poster for the big screen
app.get('/poster', route.poster);

// when measurements are finished, show this on a PC screen
app.get('/finished', route.finished);
app.get('/finishedPoster', route.finishedPoster);

// 404 not found THIS SHOULD STAY LAST
app.use(route.notFound404);


var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;
   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


/* =================================
  DISPLAYS AND WINDOWS CONFIGURATION
================================== */

electronapp.on('ready', function() {
  var electronScreen = electron.screen;
  // gets all displays available:
  var displays = electronScreen.getAllDisplays();
  // console.log(displays);
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  var mainWindow = new BrowserWindow({ width: size.width, height: size.height, fullscreen: true, frame: false});
  // loads nodeJs app to electron window:
  mainWindow.loadURL('http://127.0.0.1:3000/');
  // opens developer tools:
  //mainWindow.webContents.openDevTools();
  var secondWindow;

  //second display, Second in array:
  var externalDisplay = displays[1];

if (externalDisplay) {
  secondWindow = new BrowserWindow({
    x: externalDisplay.bounds.x,
    y: externalDisplay.bounds.y,
     width: externalDisplay.bounds.width,
    height: externalDisplay.bounds.height,
    fullscreen: true,
    frame: false
   });
   secondWindow.loadURL('http://127.0.0.1:3000/poster');
}

// load instructions viw to the second screen
function heightInstr() {
  if (externalDisplay) {
  /* var secondWindow = new BrowserWindow({
     x: externalDisplay.bounds.x,
     y: externalDisplay.bounds.y,
     width: externalDisplay.bounds.width,
     height: externalDisplay.bounds.height
     //fullscreen: true
    });
    //  secondWindow.webContents.openDevTools();*/
     secondWindow.loadURL('http://127.0.0.1:3000/inProcessPoster');
     //secondWindow.webContents.openDevTools();
     console.log("watch second screen");
   }
}

function measumentEnded() {
  mainWindow.loadURL('http://127.0.0.1:3000/finished');
}

function showPoster() {
  secondWindow.loadURL('http://127.0.0.1:3000/poster');
}

// export function to select.ejs:
module.exports.heightInstr = heightInstr;
module.exports.measumentEnded = measumentEnded;
module.exports.showPoster = showPoster;

});
