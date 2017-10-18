var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var index = remote.require("./index.js");
var measumentEnded = index.measumentEnded;
var exec = require('child_process').exec;
const app = remote.app;

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
			window.location = "http://127.0.0.1:3000/results";
			measumentEnded();
		}
	}
}   