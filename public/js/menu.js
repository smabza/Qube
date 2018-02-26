var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;
var exec = require('child_process').exec;

function returnHome() 
{
    window.location = "http://127.0.0.1:3000/";
}

function startMeasurements() 
{
    heightInstr();
    exec("echo 'G\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    window.location = "http://127.0.0.1:3000/measurementsInProcess";
}

function bloodPressure() 
{
    window.location = "http://127.0.0.1:3000/bloodPressure";
}