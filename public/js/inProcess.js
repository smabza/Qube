var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var exec = require('child_process').exec;
var fs = require("fs");
const app = remote.app;
var showPoster = index.showPoster;


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

// Reads log, tries to find checksum to see if whole log exists
setInterval(readLog, 2000);

function readLog() {
	var puttyLog = fs.readFileSync('public/logs/data.txt', 'utf8');

	var checksum = "CS";
	for (var index = 0; index < puttyLog.length; index++) {
		var sub = puttyLog.substr(index, checksum.length);
		// If checksum exists, show results
		if (sub === checksum)
		{
			app.console.log("Checksum found, ready to show results!");
			//showPoster();
			window.location = "http://127.0.0.1:3000/results";
			
		}
	}
}