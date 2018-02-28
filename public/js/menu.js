var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var electron = require("electron");
var remote = electron.remote;
var exec = require('child_process').exec;

function returnHome() 
{
    window.location = "http://127.0.0.1:3000/";
}

function bodyComposition()
{
    window.location = "http://127.0.0.1:3000/basicInfo";
}

function bloodPressure() 
{
    window.location = "http://127.0.0.1:3000/bloodPressure";
}