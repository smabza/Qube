var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var exec = require('child_process').exec;
var fs = require("fs");
const app = remote.app;


// Keskeyta returns user back to home page and erases all user's input:
$('.back').on('click', function () {
	// exec.child();
	exec("echo 'Q\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
	window.location = "http://127.0.0.1:3000/";
});

