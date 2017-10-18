var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var indexJs = remote.require("./index.js");
const app = remote.app;

/* =======================================
Read all_data file if it exist, then
create DOM elements with the values parsed
from the file, then delete the file.
======================================= */
/*fs.stat('/home/kuutio/mittauskuutio/all_data.txt', (error, file) => {
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
*/
/////////////////////////////////////////////////

try {
    var descriptions = remote.getGlobal("logDescriptions");
    app.console.log(descriptions.AG);
} 
catch (error) {
    app.console.log(error);
}

app.console.log("WAT?");
var log = fs.readFileSync('public/logs/data.txt', 'utf8');

// Cut off all unnecessary stuff from the beginning until "Da, ..."
var start = "Da";
for (var index = 0; index < log.length; index++) 
{
    var sub = log.substr(index, start.length);
    if (sub === start)
    {
        log = log.slice(index, log.length);
        break;
    }
}
// And all the uncecessary from the end
for (var index = log.length; index > 0; index--) 
{
    var sub = log.substr(index, start.length);
    if (sub === "aH")
    {
        log = log.slice(0, index);
        break;
    }
}

app.console.log(log)

var logKey = [];
var logVal = [];

var logPairs = {};
var logDescVal = {};

logArr = log.split(",")

// Divide log into keys and values
for (var index = 0; index < logArr.length; index++) {
    if (index % 2 == 0)
    {
        logKey.push(logArr[index]);
    }
    else
    {
        logVal.push(logArr[index]);
    } 
}

    // Create a JSON with pairs of keys and values
    // ex. "Da" : "03/10/2017"
for (var index = 0; index < logKey.length; index++) 
    {
        logPairs[logKey[index]] = logVal[index];
    }

// It's possible to search the JSON with the keys
app.console.log("Print logPairs.AG: " + logPairs.AG);   // AG : 22, age

// Example of extracting values from the arrays and objects
app.console.log("logKey[7] " + logKey[7]); // => Wk
//app.console.log(descriptions[logKey[7]]); // => Weight
app.console.log(logVal[7]); // => 110,6


// Connect descriptions and values
// Find logKey with index, find description with the key and add value to the description
for (var index = 0; index < logKey.length; index++) 
    {
        logDescVal[descriptions[logKey[index]]] = logVal[index];    // What?!
    }

// Save object keys to an array from logDescVal
var elementKeys = Object.keys(logDescVal);

// Print data on page
// Extract values from logDescVal
// Add object key from array and the extracted value to the paragraph
// Append paragraph to the page
//var index = 0;
/*for (var key in logDescVal) {
    if (logDescVal.hasOwnProperty(key)) {
        var elementValue = JSON.stringify(logDescVal[key]);     
        var newParagraph = document.createElement("p");          
        newParagraph.appendChild(document.createTextNode(elementKeys[index] + ": " + elementValue));
        document.body.appendChild(newParagraph);
        index++;
    }
}*/

app.console.log("Test");

for (var index = 0; index < elementKeys.length; index++) {
     app.console.log(elementKeys[index]);
}

document.getElementById('weight').innerHTML = "Paino: " + "</br>" + logDescVal.Weight;
document.getElementById('fatPercent').innerHTML = "Rasvaprosentti: " + "</br>" + logPairs.FW;
document.getElementById('BMI').innerHTML = "BMI: " + "</br>" + logPairs.MI;
document.getElementById('viskFat').innerHTML = "Viskeraalinen rasva: " + "</br>" + logPairs.IF;
document.getElementById('BMR').innerHTML = "BMR: " + "</br>" + logPairs.rB;
document.getElementById('metAge').innerHTML = "Metabolinen ikä: " + "</br>" + logPairs.rA;