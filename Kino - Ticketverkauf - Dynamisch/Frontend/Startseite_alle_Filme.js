$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    $.ajax({
        url: 'http://localhost:8000/api/startseite/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
        showMiddleSection(response);
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});

function showMiddleSection(response) {
    const section = $('<section>');
    const div = $('<div class="container">');
    section.append(div);

    for (i = 0; i < response.length; i++) {
        const obj = response[i];
        const divimg = $('<div class="image">');
        const divuhr = $('<div class="uhrzeit">');
        const divwra = $('<div class="wrapper">');
        const divboxta = $('<div class="boxtime a">');
        const divboxtb = $('<div class="boxtime b">');
        const divboxtc = $('<div class="boxtime c">');
        const divdesc = $('<div class="description">');
        const divres = $('<div class="reservation-button">');
        const divfsk = $('<div class="fsk">');
        const slideContainer = $('<div class="slide">');

        div.append(divimg);
            divimg.append('<img src="http://localhost:8000/' + obj.bildpfad + '">');

        div.append(divuhr);
            divuhr.append($('<h2>').text('Uhrzeit'));
            divuhr.append($('<p>').text('Preis: ' + obj.preis + ',00€ pro Ticket'));

            divuhr.append($('<h4>').text(obj.tag1));
                divboxta.append(obj.uhrzeit1);
                divboxtb.append(obj.uhrzeit2);
                divboxtc.append(obj.uhrzeit3);
                divwra.append(divboxta);
                divwra.append(divboxtb);
                divwra.append(divboxtc);
            divuhr.append(divwra.clone());

            divuhr.append($('<h4>').text(obj.tag2));
            divuhr.append(divwra.clone());

            divuhr.append($('<h4>').text(obj.tag3));
            divuhr.append(divwra);

        div.append(divdesc);
            divdesc.append($('<h2>').text(obj.titel));
            divdesc.append($('<p>').text(obj.beschreibung));
            divdesc.append(divres);
                divres.append($('<a href="Reservieren.html" class="reservation" id="' + Number(i+1) + '">').text('Reservieren'));
            divdesc.append(divfsk);
                divfsk.append($('<p>').text(obj.fsk));

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
            for (i = 0; i < response.length; i++) {
                const obj1 = response[i];
                if (obj1.id == idfilm) {
                    let selectedfilm = obj1;
                    setJSONSessionItem("film", selectedfilm);
                };
            };
        });
    });
}        


function setSessionItem(label, value) {
    sessionStorage.setItem(label, value);
}

function setJSONSessionItem(label, jsonValue) {
    setSessionItem(label, JSON.stringify(jsonValue));
}