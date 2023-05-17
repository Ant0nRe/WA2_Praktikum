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
        loadMiddleSection(response);
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});

function loadMiddleSection(response) {
    const section = $('<section>');
    const div = $('<div class="container">');

    section.append(div);
        div.append($('<a class="prev" onclick="plusSlides(-1)">').text('❮'));
        div.append($('<a class="next" onclick="plusSlides(1)">').text('❯'));
                
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
                    divres.append($('<a href="Reservieren.html" class="reservation">').text('Reservieren'));
                divdesc.append(divfsk);
                    divfsk.append($('<p>').text('FSK ' + obj.fsk));

            slideContainer.append(divimg);
            slideContainer.append(divuhr);
            slideContainer.append(divdesc);

            div.append(slideContainer);
        }
        section.insertAfter('#navbar');

        showSlides(slideIndex);

        const reservations = document.querySelectorAll('.reservation');
        reservations.forEach(reservation => {
            reservation.addEventListener('click', () => {
                for (i = 0; i < response.length; i++) {
                    const obj1 = response[i];
                    if (obj1.id == slideIndex) {
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

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let x = document.getElementsByClassName("slide");
    if (n > x.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = x.length; 
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "flex";
}     