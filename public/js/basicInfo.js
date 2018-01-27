var util = require('util');
var exec = require('child_process').exec;
var fs = require('fs');
const remote = require('electron').remote;
const app = remote.app;

// pcModeExec = "M1";
// clothesWeightExec = "D0";
// genderExec = "D1";
// bodytypeExec = "D2";
// heightExec = "D3";
// ageExec = "D4"
// startExec = "G";

restartPutty();

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
                window.location = "http://127.0.0.1:3000/selectDevices";
            }
        }, 100);

        // after exec, go to selectDevices view:
        //window.location = "http://127.0.0.1:3000/selectDevices";
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
        app.console.log("Problem reading file. Terminating and restarting putty to create new file.");
        restartPutty();
    }
    

    if (text.includes("@") && text.includes("D2") && text.includes("D0") && text.includes("D1") && text.includes("D4") && text.includes("D3")) {
        app.console.log("File read, all Tanita responses found!")
        return true;
    }
    else {
        app.console.log("Not all responses found. Terminating and restarting putty to create new file, try again.");
        restartPutty();
        return false;
    }
}

function restartPutty()
{
    exec("killall putty");
    exec("putty -load 'Mittauskuutio'");	
}
