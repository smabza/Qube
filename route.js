/* ============================
  ROUTES FOR THE TOUCH SCREEN
============================ */

/* START PAGE */
var home = function(req, res, next) {
   res.render('home', {title: 'Koti'});
};

/* USER INPUTS PARAMETERS */
var basicInfo = function(req, res, next) {
   res.render('basicInfo', {title: 'BasicInfo'});
};

/* USER SELECTS DEVICES */
var selectDevices = function(req, res, next) {
  res.render('select', {title: 'Select Devices'});
};

var measurementsInProcess = function(req,res, next) {
     res.render('inprocess', {title: 'Mitauskäynnissä'});
  };


/* =============================
  ROUTES FOR THE SECOND SCREEN
=============================== */

var results = function(req, res, next) {
    res.render('results', {title: 'Tulokset'});
};

var inProcessPoster = function(req, res, next) {
    res.render('inProcessPoster', {title: 'inProcessPoster'});
};

// Mittauskuutio welcome screen
var poster = function(req, res, next) {
    res.render('poster', {title: 'Welcome'});
};

var finished = function(req, res, next) {
    res.render('finished', {title: 'Finished'});
};

 /* FINISHED PAGE BIG SCREEN */
var finishedPoster = function(req, res, next) {
    res.render('finishedPoster', {title: 'Refer to another screen'});
 };

 // 404 not found
var notFound404 = function(req, res, next) {
    res.status(404);
    res.render('404', {title: '404 Ei Löydy'});
};


/* ==============================
    EXPORTS
============================== */

// home
module.exports.home = home;

// BasicInfo
module.exports.basicInfo = basicInfo;

// select Devices
module.exports.selectDevices = selectDevices;

// measurements are in process
module.exports.measurementsInProcess = measurementsInProcess;

// results on the big screen:
module.exports.results = results;

// height instructions
module.exports.inProcessPoster = inProcessPoster;

module.exports.poster = poster;

module.exports.finished = finished;

module.exports.finishedPoster = finishedPoster;

// 404 not found
module.exports.notFound404 = notFound404;
