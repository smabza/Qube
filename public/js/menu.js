var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;
var exec = require('child_process').exec;



$('#seuraava').on('click', startMeasurements);

function startMeasurements() {
    exec("echo 'G\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
};


$('#seuraava').on('click', function() {
    heightInstr();
});
$('#violet').on('click', function() {
    $('#violet').css('border', '5px solid #FAFE8D');
});