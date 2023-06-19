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
    const divboxc2 = $('<div class="box-cell box2">');
    const divlaufz = $('<div class="laufzeit">');
    const divpreis = $('<div class="preis">');
    const divfsk = $('<div class="fsk">');
    const divcwra = $('<div class="clickwrapper">');
    const film = getJSONSessionItem('film');
    const data = getJSONSessionItem('data');
    let elementIds = [];
    let day = [];
    let time = [];     
    let statusArr = [];    
    let IdArr = []; 
    let objct = []; 

    // Informationen zum Film
    const ticketpreis = film.Preis.toFixed(2).toString().replace(".",",");
    divboxc1.append($('<h2>').text(film.Name));
    divboxc1.append(divlaufz);
        divlaufz.append($('<p>').text('Preis: ' + ticketpreis + '€ pro Ticket'));
    divboxc1.append(divpreis);
        divpreis.append($('<p>').text('Laufzeit: ' + film.Dauer + ' min'));
    divboxc1.append(divfsk);
        divfsk.append($('<p>').text('Altersfreigabe: FSK ' + film.FSK));
    divboxc1.append($('<h4 class="uhrzeit">').text("Bitte Uhrzeit auswählen"));
        
    //Uhrzeit und Sitzauswahl
    for (let i = 0; i < data.length; i++) {
        const parts = data[i].split(' ');
        const dataPart = parts[0] + ' ' + parts[1];
        const timePart = parts[2];
        day[i] = dataPart;
        time[i] = timePart;
    }

    divboxc1.append(divcwra);
    for (let j = 0; j < data.length;) { 
        const boxtime = [$('<div class="boxtime a">'), $('<div class="boxtime b">'), $('<div class="boxtime c">')];
        let d = 0;
        const divwra = $('<div class="wrapper">');
            divcwra.append($('<h4>').text(day[j]));
            for (let k = j; k < day.length && d < 3; k++) {
                if (day[j] == day[k]) {    
                    const id = data[k]; 
                    const boxtimeElement = boxtime[d].text(time[k]).attr('id', id);
                    boxtimeElement.on('click', function() {
                        statusArr = [];
                        divboxc2.empty();
                        const clickedId = $(this).attr('id');
                        change(clickedId);    
                        const boxtimesold = document.querySelector('.boxtime-sold');
                        if (boxtimesold) {
                            const id2 = boxtimesold.getAttribute('id');
                            for (let l = 0; l < response.length; l++) {
                                const obj = response[l];
                                if (film.Name == obj.Name && id2 == obj.Datum) {
                                    statusArr.push(obj.Status);
                                }
                            }    
                        }

        const table = $('<table class="containerSeats">');    
        const thead = $('<thead>');
        const tbody = $('<tbody>');
        const tr1 =  $('<tr class="row">');
        const divscreen = $('<div class="screen">');
        divboxc2.append(table);
            table.append(thead);
                thead.append(tr1);
                    tr1.append($('<td>'));
                    for (let m = 1; m < 9; m++) {
                        tr1.append($('<td class="number">').text(m));
                    }

            const letters = ['E', 'D', 'C', 'B', 'A'];
            table.append(tbody);
    
            for (let n = 0; n < letters.length; n++) {
                const tr2 = $('<tr class="row">');
                tbody.append(tr2);
                    tr2.append($('<td>').text(letters[n]));
                    for (let o = 0; o < 8; o++) {
                        const index = n*8+o;
                        tr2.append($('<td class="' + statusArr[index] + '" id="' + letters[n] + (o+1) + '">'));
                    }
            }

        divboxc2.append(divscreen);
            divscreen.append($('<p>').text('LEINWAND'));
            const place = document.getElementById("place");
            let count = document.getElementById('count').innerHTML;
            let total = document.getElementById('total').innerHTML;
            const containerSeats = document.querySelector('.containerSeats');
                    
            containerSeats.addEventListener("click", (event) => {
                if (event.target.classList.contains('available') && count <= 9) {
                    // Falls Sitz angeklickt -> weiß
                    event.target.classList.replace('available', 'selected');
                    // Sitznummer ins Feld schreiben
                    const elementId = event.target.id;
                    const wantedSeat = document.createElement("li");
                    wantedSeat.id = "wantedSeat" + elementId;
                    const text = document.createTextNode("Platz " + elementId + " reserviert");
                    wantedSeat.appendChild(text);
                    place.appendChild(wantedSeat);
                    // Preis und Anzahl Plätze erhöhen
                    count ++;
                    const countspan = document.getElementById('count');
                    countspan.innerHTML = count;
                    total = Number(total) + Number(film.Preis);
                    const totalspan = document.getElementById('total');
                    totalspan.innerHTML = total;
                    elementIds.push(elementId);
                } 
                else {
                    // Falls nochmal Sitz angeklickt -> grau
                    event.target.classList.replace('selected', 'available');
                    // Sitznummer aus Feld löschen
                    const elementId = event.target.id;
                    const elem = document.getElementById('wantedSeat' + elementId);
                    elem.parentNode.removeChild(elem);
                    // Preis und Anzahl Plätze verringern
                    count --;
                    const countspan = document.getElementById('count');
                    countspan.innerHTML = count;
                    total = Number(total) - Number(film.Preis);
                    const totalspan = document.getElementById('total');
                    totalspan.innerHTML = total;
                    const a = elementIds.indexOf(elementId);
                    elementIds.splice(a,1);
                }
            });
                    });
                    divwra.append(boxtime[d].text(time[k]));
                    d++;
                }  
                $('#middlesection').prepend(divboxc1);
                divboxc2.insertAfter(divboxc1);     
            }
        j+=d; 
        divcwra.append(divwra);
    }          
    
    const reservations = document.querySelector('.reservation');
    reservations.addEventListener('click', (e) => {
        const boxtimesold = document.querySelector('.boxtime-sold');
        const selectedpreis = total.innerHTML;
        if (!boxtimesold || selectedpreis == 0) {
            e.preventDefault();
            alert('Bitte Uhrzeit und Sitzplatz anklicken');
        }
        else {
            const boxtimes = document.querySelector('.boxtime-sold').id;
            for (let p = 0; p < response.length; p++) {
                let obj2 = response[p];
                for (let q = 0; q < elementIds.length; q++) {
                    if (film.Name == obj2.Name && elementIds[q] == obj2.Platzid && boxtimes == obj2.Datum) {
                        IdArr[q] = obj2.ID;
                    }
                }
            }
            console.log(IdArr);
            setJSONSessionItem("platz", elementIds);
            setSessionItem("gesamtpreis", selectedpreis);
            setSessionItem("date", boxtimes);
            for (let r = 0; r < elementIds.length; r++) {
                objct = {'ID': IdArr[r], 'Name': film.Name, 'Datum': boxtimes,'Platzid': elementIds[r], 'Status': 'sold'};
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