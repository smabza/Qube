var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var indexJs = remote.require("./index.js");
const app = remote.app;

try 
{
    // Import descriptions.js and resultExports.js -- No module.imports in client side...
    var descriptions = remote.getGlobal("logDescriptions");
    var results = remote.getGlobal("resultJSONs");
    // app.console.log(descriptions.AG);
    // app.console.log(results);
} 
catch (error) 
{
    app.console.log(error);
}

var log = fs.readFileSync('public/logs/data1.txt', 'utf8');

// Cut off all unnecessary stuff from the beginning until "Da, ... which is date object"
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

// Log this to see that the descriptions and values work
// app.console.log(logDescVal);

// Always print header values and basic results first
resultSelector("header");
resultSelector("basic");

// Function that selects the results to be shown (parameter scope comes from results_new.ejs button)
function resultSelector(scope)
{
    var resultKeys;
    var elementId;
    var showBodyParts;
    switch (scope) {
        case "header":
            // Save JSON object keys into an array, pick the DOM element to use and run function
            resultKeys = Object.keys(results.headerValues);
            elementId = "resultsHeader";
            showResults(resultKeys, elementId);
            break;
        case "basic":
            resultKeys = Object.keys(results.basicResults);
            elementId = "results";
            showResults(resultKeys, elementId);
            break;
        case "extensive":
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
    var newParagraph;
    var resultsNode = document.getElementById("results");
    // Clear old results from the screen when switching between modes 
    if (resultsNode.hasChildNodes)
    {
        while(resultsNode.firstChild)
        {
            resultsNode.removeChild(resultsNode.firstChild);
        }
    }
    var index = 0;
    for (var key in resultKeys) 
    {
      //  app.console.log(resultKeys[index]);
      
        if (resultKeys.hasOwnProperty(key)) 
        {
            // Find the value from logDescVal object by iterating through resultKeys array
            // For example resultKeys[0] = "Weight" => logDescVal["Weight"] = 110,1
            var elementValue = logDescVal[resultKeys[index]];     // ??! Git push ja kiitos, my job here is done
            newParagraph = document.createElement("p");
            newParagraph.appendChild(document.createTextNode(resultKeys[index] + ": " + elementValue));
            document.getElementById(elementId).appendChild(newParagraph);
            index++;
        }
    }
}

// // EXIT BUTTON
function goHome()
{
    window.location = "http://127.0.0.1:3000/";
    app.console.log("WAAWW")
}