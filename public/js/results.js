var electron = require("electron");
var fs = require("fs");
var remote = electron.remote;
var indexJs = remote.require("./index.js");
const app = remote.app;

var language = $('script[src*=results]').attr('data-language');

if (language === 'fi') {
    var descriptions = fiDescriptions;
} else  // Default to english.
{
    var descriptions = enDescriptions;
}

var log = fs.readFileSync('public/logs/data1.txt', 'utf8');

// Cut off all unnecessary stuff from the beginning until "Da, ... which is date object"
var start = "Da";
for (var index = 0; index < log.length; index++) {
    var sub = log.substr(index, start.length);
    if (sub === start) {
        log = log.slice(index, log.length);
        break;
    }
}
// And all the uncecessary from the end
for (var index = log.length; index > 0; index--) {
    var sub = log.substr(index, start.length);
    if (sub === "aH") {
        log = log.slice(0, index);
        break;
    }
}

var logKey = [];
var logVal = [];

var logPairs = {};

logArr = log.split(",")

// Divide log into keys and values
for (var index = 0; index < logArr.length; index++) {
    if (index % 2 == 0) {
        logKey.push(logArr[index]);
    }
    else {
        logVal.push(logArr[index]);
    }
}

// Create a JSON with pairs of keys and values
// ex. "Da" : "03/10/2017"
for (var index = 0; index < logKey.length; index++) {
    logPairs[logKey[index]] = logVal[index];
}

var header = ["Da", "TI", "AG", "Hm"];
var basicResults = ["Wk", "FW", "fW", "mW", "bW", "MI", "IF", "rA", "rB"];
var extensiveResults = ["Wk", "FW", "fW", "mW", "bW", "MI", "IF", "rA", "rB", "rJ", "MW", "OV", "LP", "wW", "ww", "wI", "wO", "wo"];
var limbs = ["FR", "fR", "mR", "FL", "fL", "mL", "Fr", "fr", "mr", "Fl", "fl", "ml", "FT", "fT", "mT"];


function addResultsToPage(resultKeys, elementId) 
{
    var newParagraph;
    var resultArea = document.getElementById(elementId);

    for (var i = 0; i < resultKeys.length; i++)
    {
        let text = descriptions[resultKeys[i]] + ": " + logPairs[resultKeys[i]];
        text = text.replace(/"/g, '');
        newParagraph = document.createElement("p");
        newParagraph.appendChild(document.createTextNode(text));
        newParagraph.addEventListener("click", function () { showModal(text, "Description"); });
        resultArea.appendChild(newParagraph);
        if (i >= basicResults.length && elementId === "extensive")
        {
            newParagraph.style.backgroundColor = "#ffc582"
        }
    }
}

function hide(divId) {
    var div = document.getElementById(divId);
    div.style.display = "none";
}

function show(divId) {
    var div = document.getElementById(divId);
    div.style.display = "";
}

addResultsToPage(header, "resultsHeader");
addResultsToPage(basicResults, "results");
addResultsToPage(extensiveResults, "extensive");
addResultsToPage(limbs, "limbs");
// Show only basic on load
hide("limbs");
hide("extensive");

$("#basicsButton").on("click", function() {
    hide("limbs");
    hide("extensive");
    show("results");
});

$("#limbsButton").on("click", function() {
    hide("results");
    hide("extensive");
    show("limbs");
});

$("#extensivesButton").on("click", function() {
    hide("limbs");
    show("extensive");
});

/* 
    Set hidden inputs to the send email form.
    Gets the values from the results shown on the page.
*/
var sendEmailForm = $("#email");
sendEmailForm.submit(function () {
    // Empty the form before filling.
    $("#email input[type='hidden']").remove();
    var i = 0;
    $(".toEmail p").each(function () {
        var result = $(this).html();
        var input = $("<input />", {
            name: i,
            value: result,
            type: "hidden"
        });
        sendEmailForm.append(input);
        i++;
    });
});

// EXIT BUTTON
function goHome() {
    window.location = "http://127.0.0.1:3000/";
    app.console.log("WAAWW")
}

function showModal(title, description) {
    $("#myModal .modal-title").html(title)
    $("#myModal .modal-body").html(description)
    $("#myModal").modal();
}