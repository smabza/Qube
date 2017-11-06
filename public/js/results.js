var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var indexJs = remote.require("./index.js");
const app = remote.app;

try {
    var descriptions = remote.getGlobal("logDescriptions");
    var results = remote.getGlobal("resultJSONs");
    // app.console.log(descriptions.AG);
    // app.console.log(results);
} 
catch (error) {
    app.console.log(error);
}

var log = fs.readFileSync('public/logs/data1.txt', 'utf8');

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

// app.console.log(log)

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

/*
// It's possible to search the JSON with the keys
app.console.log("Print logPairs.AG: " + logPairs.AG);   // AG : 22, age

// Example of extracting values from the arrays and objects
app.console.log("logKey[7] " + logKey[7]); // => Wk
app.console.log(descriptions[logKey[7]]); // => Weight
app.console.log(logVal[7]); // => 110,6
*/

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
}

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
*/

// Always print header values
resultSelector(0);

function resultSelector(scope)
{
    app.console.log(scope);
    var resultKeys;
    switch (scope) {
        case 0:
            resultKeys = Object.keys(results.headerValues);
            elementId = "resultsHeader";
            showResults(resultKeys, elementId);
            break;
        case 1:
            resultKeys = Object.keys(results.basicResults);
            elementId = "results";
            showResults(resultKeys, elementId);
            break;
        case 2:
            resultKeys = Object.keys(results.extensiveResults);
            elementId = "results";
            showResults(resultKeys, elementId);
            break; 
        default:
            break;
    }
}

// Print data on page
// Extract values from logDescVal
// Add object key from array and the extracted value to the paragraph
// Append paragraph to the page
function showResults(resultKeys, elementId)
{
    var index = 0;
    for (var key in resultKeys) 
    {
        if (resultKeys.hasOwnProperty(key)) 
        {
            // Find the value from logDescVal object by iterating through resultKeys array
            // For example if resultKeys[0] = "Weight" => logDescVal["Weight"] = 110,1
            var elementValue = JSON.stringify(logDescVal[resultKeys[index]]);     // ??! Git push ja kiitos, my job here is done
            var newParagraph = document.createElement("p");          
            newParagraph.appendChild(document.createTextNode(resultKeys[index] + ": " + elementValue));
           // document.body.appendChild(newParagraph);
            document.getElementById(elementId).appendChild(newParagraph);
            index++;
        }
    }
}