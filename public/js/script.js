$('label.btn').on('change', changeColor);
$('.selectAll').on('click', deselectAll);

$('.measuringDevices').on('click', enableNextButton);

function enableNextButton() {
	var deviceButtons = document.getElementsByClassName("measuringDevices");
	var t = $(deviceButtons[1]).attr('class');

	for (i=0; i < deviceButtons.length; i++) {
		if ($(deviceButtons[i]).attr('class') === "active") {
			$('.absolute').toggle();
			return;
		};
	};
};

function changeColor() {
	var counter = 0;
	var deviceButtons = document.getElementsByClassName("measuringDevices");

// change color from initial(#38b6ab/ rgb(56, 182, 171)) to darker (#154440 / rgb(21, 68, 64)):
	 if (this.style.backgroundColor === 'rgb(56, 182, 171)' || this.style.backgroundColor === "") {
		$(this).css('background-color', 'rgb(21, 68, 64)');
		console.log(this.style.backgroundColor);
		// count all clicked buttons:
		for (i=0; i < deviceButtons.length; i++) {
			if (deviceButtons[i].style.backgroundColor === 'rgb(21, 68, 64)') {
				counter++;
			}
		};
		// if at least one button is clicked, make 'Next' available:
		if (counter > 0) {
			$('.absolute').removeClass('disabled');
		};
	 }
	else {
		$(this).css('background-color', 'rgb(56, 182, 171)');
		$(this).removeClass('active');
		for (i=0; i < deviceButtons.length; i++) {
			if (deviceButtons[i].style.backgroundColor === 'rgb(21, 68, 64)') {
				counter++;
			}
		};
	}

  // user must choose Weight and Height when choosing Body Composition:
  if (deviceButtons[2].style.backgroundColor === 'rgb(21, 68, 64)') {
    if (deviceButtons[2].style.backgroundColor !== deviceButtons[0].style.backgroundColor || deviceButtons[2].style.backgroundColor !== deviceButtons[1].style.backgroundColor) {
      $('.absolute').removeClass('disabled');
      // document.getElementById("huom").innerHTML = "<span>HUOM!</span> Tehdäksesi kehonkoostumusmittaukset, sinun on myös valittava pituuden ja painon mittaus.";
    } else {
      document.getElementById("huom").innerHTML = "";
    }
  } else {
     document.getElementById("huom").innerHTML = "";
     $('.absolute').removeClass('disabled');
  }
  if (counter === 0) {
    $('.absolute').addClass('disabled');
  };
};

// toggle button to select / deselect all options
function deselectAll() {

  var tbutton = document.getElementById("toggle-btn");
  var listOfCheckboxes = document.getElementsByClassName("checkbox");

  if (tbutton.innerHTML == "Valitse kaikki" ) {
    tbutton.innerHTML = "Poista kaikki";
    for (i=0; i < listOfCheckboxes.length; i++) {
  		listOfCheckboxes[i].checked = true;
  	};
    $('label.btn').addClass('active');
  	$('label.btn').css('background-color', 'rgb(21, 68, 64)');
  	$('.absolute').removeClass('disabled');
		//demo:
		$('#violet').css('border', '5px solid #FAFE8D');
  }
  else {
    tbutton.innerHTML = "Valitse kaikki";
    for (i=0; i < listOfCheckboxes.length; i++) {
  		listOfCheckboxes[i].checked = false;
  	};
    $('label.btn').removeClass('active');
  	$('label.btn').css('background-color', 'rgb(56, 182, 171)');
  	$('.absolute').addClass('disabled');
		$('#violet').css('border', 'none');
  }
}
