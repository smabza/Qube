var util = require('util');
var exec = require('child_process').exec;
var fs = require('fs');
const remote = require('electron').remote;
const app = remote.app;
var index = remote.require("./index.js");
var heightInstr = index.heightInstr;


// Create new result log and (re)start putty
fs.writeFileSync("public/logs/data.txt", "")
restartPutty();

// Get the info box element
var infoBox = document.getElementById("infoBox");

// clicking Seuraava executes a function:
$('#sendData').on('click', sendData);
//reset the given variables:
$('#cancel').on('click', resetVariables);

// function sends user's data to the console:
function sendData() {
    age = document.getElementById("age").value;
    height = document.getElementById("height").value;
    gender = $(".active").attr('id');

    if (gender === "male") {
        gender = 1;
    } else if (gender === "female") {
        gender = 2;
    } else {
        gender = none;
    }

    if ((age > 4 && age < 99) && (height > 89 && height < 249) && (gender === 1 || gender === 2)) {
        var allDone = false;

        /////////////////////////////
        //
        // 	SEND COMMANDS TO TANITA
        //
        /////////////////////////////

        exec("echo 'M1\n' > /dev/ttyUSB0", function (error, stdout, stderr) { });		// Extra exec to "wake up" the machine to respond to next execs

        // BODYTYPE
        exec("echo 'D20\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        // CLOTHES WEIGHT
        exec("echo 'D001.5\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        // GENDER
        exec("echo 'D1" + gender + "\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        // AGE
        exec("echo 'D4" + age + "\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        // HEIGHT
        exec("echo 'D3" + height + "\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        // Use timeout to make sure the putty log file exists and has been saved
        setTimeout(function () {
            allDone = checkTanitaResponse();
            if (allDone) {
                startMeasurements();
            }
        }, 100);

    }
}

function resetVariables() {
    exec("echo 'Q\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

function checkTanitaResponse() 
{
    var text;

    try 
    {   
        text = fs.readFileSync("public/logs/data.txt", "utf8");
        
    }
    catch (error) 
    {
        app.console.log("Error reading file. Terminating and restarting putty to create new file.");
        infoBox.value = "Error creating or reading the file for measurement results. Terminating and restarting putty to create a new file.";
        restartPutty();
        return false;
    }
    

    if (text.includes("@") && text.includes("D2") && text.includes("D0") && text.includes("D1") && text.includes("D4") && text.includes("D3")) {
        app.console.log("File read, all Tanita responses found!");
        infoBox.value = "Connection to the measurement device OK!";
        return true;
    }
    else {
        app.console.log("Not all responses found. Terminating and restarting putty to create new file, try again.");
        infoBox.value = "Measuring device not responding properly. Terminating and restarting putty to create new file, try again. Make sure that the measuring device is powered and connected."
        restartPutty();
        return false;
    }
}

function restartPutty()
{
    exec("killall putty");
    exec("putty -load 'Mittauskuutio'");
    exec("wmctrl -R Tervetuloa Mittauskuutioon");	
}

function startMeasurements() 
{
    heightInstr();
    exec("echo 'G\n' > /dev/ttyUSB0", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    window.location = "http://127.0.0.1:3000/measurementsInProcess";
}
