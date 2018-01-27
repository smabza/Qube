/* ============================
  ROUTES FOR THE TOUCH SCREEN
============================ */

var languageController = require('./lang.js');

//languageController.language = 'fi';
//languageController.language = 'en';


/* START PAGE */
var home = function(req, res, next) {
    res.render('home');
};

var selectLanguage = function(req, res) {
    languageController.language = req.body.language;
    res.redirect('/basicInfo');
};

/* USER INPUTS PARAMETERS */
var basicInfo = function(req, res, next) {
   res.render('basicInfo', {text: languageController.basicInfoText(languageController.language)});
};

/* USER SELECTS DEVICES */
var selectDevices = function(req, res, next) {
  res.render('select', {text: languageController.selectText(languageController.language)});
};

var measurementsInProcess = function(req,res, next) {
     res.render('inprocess', {text: languageController.inprocessText(languageController.language)});
};


/* =============================
  ROUTES FOR THE SECOND SCREEN
=============================== */

var results = function(req, res, next) {
    res.render('results', {title: 'Tulokset'});
};

var inProcessPoster = function(req, res, next) {
    res.render('inprocessPoster', {text: languageController.inprocessPosterText(languageController.language)});
};

// Mittauskuutio welcome screen
var poster = function(req, res, next) {
    res.render('poster', {text: languageController.posterText(languageController.language)});
};

var finished = function(req, res, next) {
    res.render('finished', {text: languageController.finishedText(languageController.language)});
};

 /* FINISHED PAGE BIG SCREEN */
var finishedPoster = function(req, res, next) {
    res.render('finishedPoster', {text: languageController.finishedPosterText(languageController.language)});
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

module.exports.selectLanguage = selectLanguage;

// 404 not found
module.exports.notFound404 = notFound404;
