var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;
var showPoster = index.showPoster;
var exec = remote.require("./exec.js");
var fs = require("fs");
var exec = require('child_process').exec;


$('#printResults').on('click', function() {
    // Print_file script here and then go to homepage.
        exec("/home/kuutio/Työpöytä/electron_demo/scripts/print_file", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        window.location = "http://127.0.0.1:3000/";
        showPoster();
    });

 $('#homepage').on('click', function() {
        showPoster();
 });

    exec.pcMode();
    exec.child();
    exec.cloth();
    exec.bodytype();
