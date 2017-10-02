/*================================
The file contains functions which
send commands to the analyser
================================*/

var util = require('util');
var exec = require('child_process').exec;


// for putty to start by itself

const { exec } = require('child_process');

exec('putty start', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

// PC mode
exports.pcMode = function() {
  exec("echo 'M1\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
};

// do reset
exports.child = function() {
  exec("echo -ne 'Q\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
};

// cloth weight
exports.cloth = function() {
  exec("echo 'D001.5\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
};

// body type
exports.bodytype = function() {
  exec("echo 'D20\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
};
