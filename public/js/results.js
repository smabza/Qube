var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var indexJs = remote.require("./index.js");
const app = remote.app;

var language = $('script[src*=results]').attr('data-language');

/*
    File descriptions contains variables fi_descriptions and en_descriptions choose right one according to chosen language. 
    result
*/
var descriptions = fiDescriptions;
if (language === 'fi')
{
    var descriptions = fiDescriptions;
    var results = fiResultExports;
} else  // Default to english.
{
    var descriptions = enDescriptions;
    var results = enResultExports;
}

var basicResultsLength = Object.keys(results.basicResults).length;


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
    app.console.log(scope);
    switch (scope) {
        case "header":
            // Save JSON object keys into an array, pick the DOM element to use and run function
            resultKeys = Object.keys(results.headerValues);
            elementId = "resultsHeader";
            showResults(resultKeys, elementId, scope);
            break;
        case "basic":
            resultKeys = Object.keys(results.basicResults);
            elementId = "results";
            showResults(resultKeys, elementId, scope);
            break;
        case "extensive":
            resultKeys = Object.keys(results.extensiveResults);
            elementId = "results";
            showResults(resultKeys, elementId, scope);
            break; 
        case "limbs":
            resultKeys = Object.keys(results.limbData);
            elementId = "results";
            showResults(resultKeys, elementId, scope);
            break;
        default:
            break;
    }
}

// Extract values from logDescVal
// Add object key from array and the extracted value to the paragraph
// Append paragraph to the page
function showResults(resultKeys, elementId, scope)
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
        (function()
        {
            if (resultKeys.hasOwnProperty(key))
            {
                // Find the value from logDescVal object by iterating through resultKeys array
                // For example resultKeys[0] = "Weight" => logDescVal["Weight"] = 110,1
                var elementValue = logDescVal[resultKeys[index]];     // ??! Git push ja kiitos, my job here is done
                var title = resultKeys[index] + ": " + elementValue;
                newParagraph = document.createElement("p");
                newParagraph.appendChild(document.createTextNode(resultKeys[index] + ": " + elementValue));
                
                // Color extensive results to more orange for "UX"
                if (scope === "extensive" && index >= basicResultsLength)
                {
                    newParagraph.style.backgroundColor = "#ffc582";
                }

                // Color every second line of limb results (each limb) to oranger
                if (scope === "limbs" && (index < 3 || (index > 5 && index < 9 ) || index > 11 ))
                {
                    newParagraph.style.backgroundColor = "#ffc582";
                }
                
                document.getElementById(elementId).appendChild(newParagraph);
                /* TODO: Need to add actual descriptions */
                newParagraph.addEventListener("click", function() {showModal(title, "Description");});
                index++;
            }
        })();
    }
}

/* 
    Set hidden inputs to the send email form.
    Gets the values from the results shown on the page.
*/
var sendEmailForm = $("#email");
sendEmailForm.submit(function()
{
    // Empty the form before filling.
    $("#email input[type='hidden']").remove();
    var i = 0;
    var results = $("div#results p").each(function()
    {
        var result = $(this).html();
        var input = $("<input />", { name: i,
                                     value: result,
                                     type: "hidden"});
        sendEmailForm.append(input);
        i++;
    });
});

// EXIT BUTTON
function goHome()
{
    window.location = "http://127.0.0.1:3000/";
    app.console.log("WAAWW")
}

function showModal(title, description)
{
   $("#myModal .modal-title").html(title)
   $("#myModal .modal-body").html(description)
   $("#myModal").modal();
}