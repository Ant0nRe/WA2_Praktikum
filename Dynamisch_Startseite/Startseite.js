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

        var div = $('<div class="container">');
        var leftarrow = $('<a class="prev" onclick="plusSlides(-1)">').text('❮');
        var rightarrow = $('<a class="next" onclick="plusSlides(1)">').text('❯');

        div.append(leftarrow);
        div.append(rightarrow);
                
        for (i = 0; i < response.length; i++) {
            var obj = response[i];
            var divimg = $('<div class="image">');
            var divuhr = $('<div class="uhrzeit">');
            var divwra = $('<div class="wrapper">');
            var divboxta = $('<div class="boxtime a">');
            var divboxtb = $('<div class="boxtime b">');
            var divboxtc = $('<div class="boxtime c">');
            var divdesc = $('<div class="description">');
            var divres = $('<div class="reservation-button">');
            var divfsk = $('<div class="fsk">');
            var slideContainer = $('<div class="slide">');

            divimg.append('<img src="http://localhost:8000/' + obj.bildpfad + '">');

            divuhr.append($('<h2>').text('Uhrzeit'));
            divuhr.append($('<p>').text('Preis: ' + obj.preis + '€ pro Ticket'));

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

            divdesc.append($('<h2>').text(obj.titel));
            divdesc.append($('<p>').text(obj.beschreibung));

            divdesc.append(divres);
                divres.append($('<a href="../Reservieren/Reservieren.html" class="reservation">').text('Reservieren'));

            divdesc.append(divfsk);
                divfsk.append($('<p>').text(obj.fsk));

            slideContainer.append(divimg);
            slideContainer.append(divuhr);
            slideContainer.append(divdesc);

            div.append(slideContainer);
            }

        $('#middlesection').append(div);

        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});
