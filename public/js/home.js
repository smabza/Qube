var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;
var exec = remote.require("./exec.js");
var fs = require("fs");

$('#reset').on('click', function () {

    // Set TANITA pc mode on
    exec("echo 'M1\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });


    // Reset TANITA
    exec("echo -ne 'Q\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

});