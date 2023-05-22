$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    $.ajax({
        url: 'http://localhost:8000/api/reservierungsitze/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
        showMiddleSection(response);
    }).fail(function (jqXHR, statusArrText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.statusArr + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    }); 
});

function showMiddleSection(response) {
    const divboxc1 = $('<div class="box-cell box1">');
    const divlaufz = $('<div class="laufzeit">');
    const divpreis = $('<div class="preis">');
    const divfsk = $('<div class="fsk">');
    const divcwra = $('<div class="clickwrapper">');
    const divwra1 = $('<div class="wrapper">');
    const divwra2 = $('<div class="wrapper">');
    const divwra3 = $('<div class="wrapper">');
    const film = getJSONSessionItem('film');

    divboxc1.append($('<h2>').text(film.titel));
    divboxc1.append(divlaufz);
        divlaufz.append($('<p>').text('Preis: ' + film.preis + ',00€ pro Ticket'));
    divboxc1.append(divpreis);
        divpreis.append($('<p>').text('Laufzeit: ' + film.laufzeit + ' min'));
    divboxc1.append(divfsk);
        divfsk.append($('<p>').text('Altersfreigabe: FSK ' + film.fsk));
        
    divboxc1.append(divcwra);
        divcwra.append($('<h4>').text(film.tag1));
        divcwra.append(divwra1);
            divwra1.append($('<div class="boxtime a" id="M13" title="' + film.tag1 + '" onclick="change(\'M13\')">').text(film.uhrzeit1));
            divwra1.append($('<div class="boxtime b" id="M16" title="' + film.tag1 + '" onclick="change(\'M16\')">').text(film.uhrzeit2));
            divwra1.append($('<div class="boxtime c" id="M19" title="' + film.tag1 + '" onclick="change(\'M19\')">').text(film.uhrzeit3));
        divcwra.append($('<h4>').text(film.tag2));
        divcwra.append(divwra2);
            divwra2.append($('<div class="boxtime a" id="Mi13" title="' + film.tag2 + '" onclick="change(\'Mi13\')">').text(film.uhrzeit1));
            divwra2.append($('<div class="boxtime b" id="Mi16" title="' + film.tag2 + '" onclick="change(\'Mi16\')">').text(film.uhrzeit2));
            divwra2.append($('<div class="boxtime c" id="Mi19" title="' + film.tag2 + '" onclick="change(\'Mi19\')">').text(film.uhrzeit3));
        divcwra.append($('<h4>').text(film.tag3));
        divcwra.append(divwra3);
            divwra3.append($('<div class="boxtime a" id="F13" title="' + film.tag3 + '" onclick="change(\'F13\')">').text(film.uhrzeit1));
            divwra3.append($('<div class="boxtime b" id="F16" title="' + film.tag3 + '" onclick="change(\'F16\')">').text(film.uhrzeit2));
            divwra3.append($('<div class="boxtime c" id="F19" title="' + film.tag3 + '" onclick="change(\'F19\')">').text(film.uhrzeit3));

    $('#middlesection').prepend(divboxc1);

    const divboxc2 = $('<div class="box-cell box2">');
    const table = $('<table class="containerSeats">');
    const thead = $('<thead>');
    const tbody = $('<tbody>');
    const tr1 =  $('<tr class="row">');
    const divscreen = $('<div class="screen">');

    let statusArr = [];
    for (i = 0; i < response.length; i++) {
        let obj = response[i];
        if (film.titel == obj.titel) {
            statusArr.push(obj.status);
        }
    }

    divboxc2.append(table);
        table.append(thead);
            thead.append(tr1);
            tr1.append($('<td>'));
            for (k = 1; k < 9; k++) {
                tr1.append($('<td class="number">').text(k));
            }

        const letters = ['E', 'D', 'C', 'B', 'A'];
        table.append(tbody);
        for (i = 0; i < letters.length; i++) {
            const tr2 = $('<tr class="row">');
            tbody.append(tr2);
                tr2.append($('<td>').text(letters[i]));
                for (j = 0; j < 8; j++) {
                    let index = i*8+j;
                    tr2.append($('<td class="' + statusArr[index] + '" id="' + letters[i] + (j+1) + '">'));
                }
        }

    divboxc2.append(divscreen);
        divscreen.append($('<p>').text('LEINWAND'));

    divboxc2.insertAfter(divboxc1);

    const place = document.getElementById("place");
    let count = document.getElementById('count').innerHTML;
    let total = document.getElementById('total').innerHTML;
    let elementIds = [];
    const containerSeats = document.querySelector('.containerSeats');
    containerSeats.addEventListener("click", (event) => {
        if (event.target.classList.contains('available') && count <= 9) {
            // Falls Sitz angeklickt -> weiß
            event.target.classList.replace('available', 'selected');
            // Sitznummer ins Feld schreiben
            let elementId = event.target.id;
            let wantedSeat = document.createElement("li");
            wantedSeat.id = "wantedSeat" + elementId;
            let text = document.createTextNode("Platz " + elementId + " reserviert");
            wantedSeat.appendChild(text);
            place.appendChild(wantedSeat);
            // Preis und Anzahl Plätze erhöhen
            count ++;
            let countspan = document.getElementById('count');
            countspan.innerHTML = count;
            total = Number(total) + Number(film.preis);
            let totalspan = document.getElementById('total');
            totalspan.innerHTML = total;
            elementIds.push(elementId);
        } 
        else {
            // Falls nochmal Sitz angeklickt -> grau
            event.target.classList.replace('selected', 'available');
            // Sitznummer aus Feld löschen
            let elementId = event.target.id;
            let elem = document.getElementById('wantedSeat' + elementId);
            elem.parentNode.removeChild(elem);
            // Preis und Anzahl Plätze verringern
            count --;
            let countspan = document.getElementById('count');
            countspan.innerHTML = count;
            total = Number(total) - Number(film.preis);
            let totalspan = document.getElementById('total');
            totalspan.innerHTML = total;
            const a = elementIds.indexOf(elementId);
            elementIds.splice(a,1);
        }
    });

    
        
    let IdArr = []; 
    let objct = [];    
    const reservations = document.querySelector('.reservation');
    reservations.addEventListener('click', (e) => {
        const boxtimesold = document.querySelector('.boxtime-sold');
        let selectedpreis = total;
        if (!boxtimesold || selectedpreis == 0) {
            e.preventDefault();
            alert('Bitte Uhrzeit und Sitzplatz anklicken');
        }
        else {
            for (i = 0; i < response.length; i++) {
                let obj2 = response[i];
                for (j = 0; j < elementIds.length; j++) {
                    if (film.titel == obj2.titel && elementIds[j] == obj2.platzid) {
                        IdArr[j] = obj2.id;
                    }
                }
            }
            const boxtimes = document.querySelector('.boxtime-sold').innerHTML;
            const datum = document.querySelector('.boxtime-sold').title;
            setJSONSessionItem("platz", elementIds);
            setSessionItem("gesamtpreis", selectedpreis);
            setSessionItem("time", boxtimes);
            setSessionItem("datum", datum);
            for (l = 0; l < elementIds.length; l++) {
                objct = {'id': IdArr[l], 'titel': film.titel, 'platzid': elementIds[l], 'status': 'sold' };
                $.ajax({
                    url: 'http://localhost:8000/api/reservierungsitze',
                    method: 'put',
                    contentType: 'application/json; charset=utf-8',
                    cache: false,
                    data: JSON.stringify(objct)
                })
                .done(function (response) {
                    console.log(response);
                })
                .fail(function (jqXHR, statusText, error) {
                    console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
                });
            }
        }
    });
}        
   
function setSessionItem(label, value) {
    sessionStorage.setItem(label, value);
}

function setJSONSessionItem(label, jsonValue) {
    setSessionItem(label, JSON.stringify(jsonValue));
}

function getSessionItem(label) {
    return sessionStorage.getItem(label);
}

function getJSONSessionItem(label) {
    var val = getSessionItem(label);

    if (isNullOrUndefined(val)) 
        return val;

    if (isJSONString(val)) 
        return tryParseJSONString(val);

    return val;
}

function tryParseJSONString(str) {
    try {
        var obj = JSON.parse(str);
        if (obj && typeof obj === "object") 
            return obj;
    } catch (e) { }
    return false;
}

function isJSONString(str) {
    return tryParseJSONString(str) != false;
}

function isNullOrUndefined(val) {
    return val === null || val === undefined;
}

let previousEl;
function change(x) {
    // Schaut, ob ein vorheriges previousEl existiert, falls ja wird es der Klasse boxtime zugewiesen
    if (previousEl) {
        previousEl.className = "boxtime";
    }
    // Nimmt sich ID des div und weist ihm die Klasse boctime-sold zu
    previousEl = document.getElementById(x);
    previousEl.className = "boxtime-sold";
}