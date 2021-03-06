var controller = {
    lang: 'en',
    get getLang() {
        return this.lang;
    },
    set setLang(newLang) {
        // Default english.
        this.lang = newLang == 'fi' ? 'fi' : 'en';        
    }
};

var fi_select = {
    title: "Valitsee suoritettavat mittaukset",
    back: "Takaisin",
    height: "Pituus",
    weight: "Paino",
    bodycomposition: "Kehonkoostumus",
    bloodpressure: "Verenpaine",
    selectall: "Valitse kaikki",
    next: "Seuraava"
};

var en_select = {
    title: "Choose",
    back: "Back",
    height: "Height",
    weight: "Weight",
    bodycomposition: "Body composition",
    bloodpressure: "Blood pressure",
    selectall: "Choose all",
    next: "Next"
};

var fi_basicInfo = {
    title: "Perustiedot",
    prompt: "Anna perustietosi",
    heightHint: "Invalid or no value!",
    weightHint: "Invalid or no value!",
    age: "Ikä",
    height: "Pituus",
    male: "Mies",
    female: "Nainen",
    cancel: "Keskeytä",
    next: "Seuraava"
};

var en_basicInfo = {
    title: "Basic information",
    prompt: "Input your information.",
    heightHint: "Invalid or no value!",
    weightHint: "Invalid or no value!",
    age: "Age",
    height: "Height",
    male: "Male",
    female: "Female",
    cancel: "Cancel",
    next: "Next"
};

var fi_inprocess = {
    title: "Mittaus käynnissä...",
    instructions: "Mittausohjeet toisella näytöllä.",
    cancel: "Keskeytä"

};


var en_inprocess = {
    title: "Measurement in progress...",
    instructions: "Instructions on the next screen.",
    cancel: "Cancel"
};

var fi_finishedText = {
	title: "Tervetuloa Qubeen",
	select: "Valitse jatkotoimenpiteet.",
	frontpage: "Etusivulle",
	print: "Tulosta tulokset ja palaa etusivulle."
}

var en_finishedText = {
	title: "Welcome to Qube",
	select: "Select the next action.",
	frontpage: "Return to front page.",
	print: "Print the results and return to the front page."
}

var fi_inProcessPoster = {
    title: "Mittalaitteen ohjeet",
    instr1: "Ota kengät ja sukat pois.",
    instr2: "Astu laitteelle ensimmäisen kuvan osoittamalla tavalla.",
    instr3: "Odota, että laite suorittaa punnituksen.",
    instr4: 'Kun laitteen näytössä lukee "GRIP ON", tartu kapuloihin.',
    instr5: "Laske kädet sivulle ja odota, että laite suorittaa mittaukset.",
    instr6: 'Kun laitteen näytössä lukee "GRIP OFF", laita kapulat takaisin telineisiin.',
    instr7: "Astu pois laiteelta.",
    instr8: "Tulosten analysoinnissa kestää noin 5 sekuntia."
};

var en_inProcessPoster = {
    title: "Mittalaitteen ohjeet",
    instr1: "Remove your shoes and socks.",
    instr2: "Step on the device, like shown on first picture.",
    instr3: "Wait for the device to finish weighing.",
    instr4: 'When the device tells you to "GRIP ON", grip on the handles.',
    instr5: "Put down your hands and wait. The device is performing the measuring.",
    instr6: 'When the device tells you to "GRIP OFF", put the handles back to their slots.',
    instr7: "Step off the device.",
    instr8: "Analyzing results, this takes up to 5 seconds."
};

var fi_poster = {
    title: "Tervetuloa Qubeen.",
    prompt: "Ole hyvä ja seuraa kosketusnäytön ohjeita."
}

var en_poster = {
    title: "Welcome to Qube.",
    prompt: "Please follow the instructions on the touch screen."
}


var fi_finishedPoster = {
	title: "Tervetuloa Qubeen.",
	done: "Mittaukset suoritettu.",
	prompt: "Lisäohjeita kosketusnäytöllä."
}


var en_finishedPoster = {
	title: "Welcome to Qube.",
	done: "Measurement complete.",
	prompt: "Additional instructions on the touch screen."
}

var fi_bloodPressure = {
    title: "Blood pressure measurement",
    introText: "Verenpaineen vaihtelu on luontaista ja siksi olosuhteet on vakioitava mahdollisimman hyvin. Mittaus tehdään mittaamalla kaksi peräkkäistä mittausta 1–2 minuutin välein.</br>Puoleen tuntiin ennen mittausta ei pidä harrastaa liikuntaa, tupakoida, juoda alkoholia, kahvia, teetä eikä kola- tai energiajuomia.</br>Huom! Täysin luotettava arvio verenpaineesta ei synny yhdellä kaksoismittauksella. Ammattilaisten vastaanottomittauksissa lasketaan neljänä eri vuorokautena tehtyjen kaksoismittauksien keskiarvot.",
    instr1: ". Istu selkänojalliseen tuoliin, nojaudu selkänojaan ja istu mahdollisimman rennosti.", 
    instr2: "Kiedo mansetti paljaan olkavarren ympärille siten, että sormi mahtuu mansetin ja olkavarren väliin.",
    instr3: "Katso, että ilmaletkun kiinnityskohta on ylöspäin ja että letku kulkee vapaasti.",
    instr4: "Tue käsivarsi noin 90 asteen kulmaan siten, että mansetti ja sydän ovat samalla tasolla. Pidä käsi rentona. Kun olet kiinnittänyt mansetin olkavarteen, rauhoitu ennen mittausta noin viiden minuutin ajaksi.",
    instr5: "Suorita mittaus painamalla napista. Ole täysin rentona, älä puhu tai liiku mittauksen aikana. Toista mittaus 1-2 minuutin kuluttua ja merkitse molemmat tulokset muistiin."
}

var en_bloodPressure = {
    // TODO KORJATKAA TÄÄ SAAAATANA
    title: "Blood pressure measurement",
    introText: "Verenpaineen vaihtelu on luontaista ja siksi olosuhteet on vakioitava mahdollisimman hyvin. Mittaus tehdään mittaamalla kaksi peräkkäistä mittausta 1–2 minuutin välein.</br>Puoleen tuntiin ennen mittausta ei pidä harrastaa liikuntaa, tupakoida, juoda alkoholia, kahvia, teetä eikä kola- tai energiajuomia.</br>Huom! Täysin luotettava arvio verenpaineesta ei synny yhdellä kaksoismittauksella. Ammattilaisten vastaanottomittauksissa lasketaan neljänä eri vuorokautena tehtyjen kaksoismittauksien keskiarvot.",
    instr1: "Istu selkänojalliseen tuoliin, nojaudu selkänojaan ja istu mahdollisimman rennosti.", 
    instr2: "Kiedo mansetti paljaan olkavarren ympärille siten, että sormi mahtuu mansetin ja olkavarren väliin.",
    instr3: "Katso, että ilmaletkun kiinnityskohta on ylöspäin ja että letku kulkee vapaasti.",
    instr4: "Tue käsivarsi noin 90 asteen kulmaan siten, että mansetti ja sydän ovat samalla tasolla. Pidä käsi rentona. Kun olet kiinnittänyt mansetin olkavarteen, rauhoitu ennen mittausta noin viiden minuutin ajaksi.",
    instr5: "Suorita mittaus painamalla napista. Ole täysin rentona, älä puhu tai liiku mittauksen aikana. Toista mittaus 1-2 minuutin kuluttua ja merkitse molemmat tulokset muistiin."
}

function selectText(lang) {
    if (lang == 'fi')
        return fi_select;
    else
        return en_select;
}

function basicInfoText(lang) {
    if (lang == 'fi')
        return fi_basicInfo;
    else
        return en_basicInfo;
}

function inprocessText(lang) {
    if (lang == 'fi')
        return fi_inprocess;
    else
        return en_inprocess;
}

function finishedText(lang) {
    if (lang == 'fi')
        return fi_finishedText;
    else
        return en_finishedText;
}

function finishedText(lang) {
    if (lang == 'fi')
        return fi_finishedText;
    else
        return en_finishedText;
}

function inprocessPosterText(lang) {
    if (lang == 'fi')
        return fi_inProcessPoster;
    else
        return en_inProcessPoster;
}


function posterText(lang) {
    if (lang == 'fi')
        return fi_poster;
    else
        return en_poster;
}

function finishedPosterText(lang) {
    if (lang == 'fi')
        return fi_poster;
    else
        return en_poster;
}

function bloodPressureText(lang) {
    if (lang == "fi") {
        return fi_bloodPressure;
    }
    else {
        return en_bloodPressure;
    }
}

module.exports.controller = controller;
// TODO results page translations
//module.exports.results = results;
module.exports.selectText = selectText;
module.exports.basicInfoText = basicInfoText;
module.exports.inprocessText = inprocessText;
module.exports.finishedText = finishedText;
module.exports.inprocessPosterText = inprocessPosterText;
module.exports.posterText = posterText;
module.exports.finishedPosterText = finishedPosterText;
module.exports.bloodPressureText = bloodPressureText;
