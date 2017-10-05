var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var index = remote.require("./index.js");
var exec = require('child_process').exec;

/* =======================================
Read all_data file if it exist, then
create DOM elements with the values parsed
from the file, then delete the file.
======================================= */
fs.stat('/home/kuutio/mittauskuutio/all_data.txt', (error, file) => {
      if (!error && file.isFile()) {
        fs.readFile('/home/kuutio/mittauskuutio/all_data.txt', 'utf8', function (err, data) {
          if (err) {
            return console.log(err);
          }
          // parse JSON and print first parameter:
          results = data.split(",");
          console.log(results[2]);
          document.getElementById('weight').innerHTML = "Paino: " + "</br>" + results[0];
					document.getElementById('fatPercent').innerHTML = "Rasvaprosentti: " + "</br>" + results[1];
					document.getElementById('BMI').innerHTML = "BMI: " + "</br>" + results[2];
					document.getElementById('viskFat').innerHTML = "Viskeraalinen rasva: " + "</br>" + results[3];
					document.getElementById('BMR').innerHTML = "BMR: " + "</br>" + results[4];
					document.getElementById('metAge').innerHTML = "Metabolinen ikä: " + "</br>" + results[5];

					exec("find /home/kuutio/mittauskuutio/ -name "+"*all_data.txt"+" -type f -exec rm {} \\;", function (error, stdout, stderr) {
					  console.log('stdout: ' + stdout);
					  console.log('stderr: ' + stderr);
        });
      if (error && error.code === 'ENOENT') {
        //return resolve(false);
      }
    });
	}
});