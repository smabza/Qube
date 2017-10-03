var electron = require("electron");
var remote = electron.remote;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;
var exec = remote.require("./exec.js");
var fs = require("fs");

$('#reset').on('click', function() {
// check if the file exists asyncronously:
fs.stat('/home/kuutio/mittauskuutio/all_data.txt', (error, file) => {
  if (!error && file.isFile()) {
    fs.readFile('/home/kuutio/mittauskuutio/all_data.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      // parse JSON and print first parameter:
      results = data.split(",");
      console.log(results[2]);
    });
  }
  if (error && error.code === 'ENOENT') {
    return resolve(false);
  }
});

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