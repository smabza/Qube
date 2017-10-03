var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var index = remote.require("./index.js");
var measumentEnded = index.measumentEnded;
var exec = require('child_process').exec;

function editData() {
  exec("/home/kuutio/Työpöytä/electron_demo/scripts/edit_data",function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
    }
  });
};
// check if the file exists asyncronously:
setInterval( function() {
  //editData();
  fs.stat('/home/kuutio/mittauskuutio/all_data.txt', (error, file) => {
        if (!error && file.isFile()) {
          fs.readFile('/home/kuutio/mittauskuutio/all_data.txt', 'utf8', function (err, data) {
            if (err) {
              return console.log(err);
            }
            window.location = "http://127.0.0.1:3000/results";
            measumentEnded();
          });
        }
        if (error && error.code === 'ENOENT') {
          //return resolve(false);
        }
      });
}, 5000);