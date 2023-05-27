$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    $.ajax({
        url: 'http://localhost:8000/api/film/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response1) {
        console.log('Data loaded successfully (AJAX 1)');
        console.log(response1);
        $.ajax({
            url: 'http://localhost:8000/api/filmdatum/alle',
            method: 'get',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            dataType: 'json'
        }).done(function (response2) {
            console.log('Data loaded successfully (AJAX 2)');
            console.log(response2);
            loadMiddleSection(response1, response2);
        }).fail(function (jqXHR, statusText, error) {
            console.log('Error occured (AJAX 2)');
            console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
            alert(jqXHR.responseText);
        });
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured (AJAX 1)');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});

function loadMiddleSection(response1, response2) {
    const section = $('<section>');
    const div = $('<div class="container">');
    let date = [];
    let day = [];
    let time = [];
    section.append(div);
                
        for (let i = 0; i < response1.length; i++) {
            const obj1 = response1[i];
            date = [];
            for (let j = 0; j < response2.length; j++) {
                const obj2 = response2[j];
                if (obj1.Name == obj2.Name) {
                    date.push(obj2.Datum);
                }
            }
            
            const divimg = $('<div class="image">');
            const divuhr = $('<div class="uhrzeit">');
            const divdesc = $('<div class="description">');
            const divres = $('<div class="reservation-button">');
            const divfsk = $('<div class="fsk">');
            const slideContainer = $('<div class="slide">');

            // Bild
            div.append(divimg);
                divimg.append('<img src="http://localhost:8000/' + obj1.Bildpfad + '">');

            // Uhrzeit
            div.append(divuhr);
                divuhr.append($('<h2>').text('Uhrzeit'));
                divuhr.append($('<p>').text('Preis: ' + obj1.Preis + ',00€ pro Ticket'));

                for (let k = 0; k < date.length; k++) {
                    const parts = date[k].split(' ');
                    const datePart = parts[0] + ' ' + parts[1];
                    const timePart = parts[2];
                    day[k] = datePart;
                    time[k] = timePart;
                }
           
                for (let i = 0; i < date.length;) { 
                    const boxtime = [$('<div class="boxtime a">'), $('<div class="boxtime b">'), $('<div class="boxtime c">')];
                    let d = 0;
                    const divwra = $('<div class="wrapper">');
                        divuhr.append($('<h4>').text(day[i]));
                        for (n = i; n < day.length && d < 3; n++) {
                            if (day[i] == day[n]) {
                                divwra.append(boxtime[d].text(time[n]));
                                d++;
                            }  
                        }
                    i+=d; 
                    divuhr.append(divwra);
                }  

            // Beschreibung
            div.append(divdesc);
                divdesc.append($('<h2>').text(obj1.Name));
                divdesc.append($('<p>').text(obj1.Beschreibung));
                divdesc.append(divres);
                divres.append($('<a href="Reservieren.html" class="reservation" id="' + Number(i+1) + '">').text('Reservieren'));
                divdesc.append(divfsk);
                    divfsk.append($('<p>').text('FSK ' + obj1.FSK));

            slideContainer.append(divimg);
            slideContainer.append(divuhr);
            slideContainer.append(divdesc);

            div.append(slideContainer);
        }

    section.insertAfter('#navbar');

    const reservations = document.querySelectorAll('.reservation');
    reservations.forEach(reservation => {
        reservation.addEventListener('click', () => {
            const idfilm = reservation.id; 
            for (let m = 0; m < response1.length; m++) {
                const obj1 = response1[m];
                if (obj1.ID == idfilm) {
                    const selectedfilm = obj1;
                    date = [];
                    for (let n = 0; n < response2.length; n++) {
                        const obj2 = response2[n];
                        if (obj2.Name == selectedfilm.Name) {
                            date.push(obj2.Datum);
                        }
                    }
                    const selecteddate = date;
                    setJSONSessionItem("film", selectedfilm);
                    setJSONSessionItem("data", selecteddate);
                };
            };
        });
    });
}      