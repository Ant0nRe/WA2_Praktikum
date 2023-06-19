$(document).ready(function() {
    const section = $('<section class="containerInfo">');
    const table = $('<table class="tableInfo">');
    const tbody = $('<tbody>');
    const tr1 = $('<tr>');
    const tr2 = $('<tr>');
    const tr3 = $('<tr>');
    const tr4 = $('<tr>');
    const tr5 = $('<tr>');
    const film = getJSONSessionItem('film');
    const date = getSessionItem('date');
    const platz = getJSONSessionItem('platz');
    
    const parts = date.split(' ');
    const dayPart = parts[0] + ' ' + parts[1];
    const timePart = parts[2];
        
    section.append($('<h3>').text('Ausgewählte Sachen'));
    section.append(table);
        table.append(tbody);
            tbody.append(tr1);
                tr1.append($('<td>').text('Vorstellung: ' + film.Name));
            tbody.append(tr2);
                tr2.append($('<td>').text('Datum: ' + dayPart));
            tbody.append(tr3);
                tr3.append($('<td>').text('Uhrzeit: ' + timePart + ' Uhr'));
            tbody.append(tr4);
                tr4.append($('<td>').text('Preis: ' + Number(getSessionItem('gesamtpreis')).toFixed(2).replace(".",",") + '€'));
            tbody.append(tr5);
                tr5.append($('<td>').text('Sitzwahl: ' + platz));

    $('.container').append(section);

    const button = document.querySelector('.submit-btn');
    button.addEventListener('click', () => { 
        vF = validateForm();
        if (vF == 0) {
            alert("Falsche Eingabe");
        }
        else {
        const form = document.querySelector('#form');
        const formData = {
            Vorname: form.elements[0].value,
            Nachname: form.elements[1].value,
            Email: form.elements[2].value,
            Strasse: form.elements[3].value,
            PLZ: form.elements[4].value,
            Stadt: form.elements[5].value,
            Bundesland: form.elements[6].value,
            Zahlungsart: form.elements["payment"].value,
            Filmname: film.Name,
            Filmdatum: date,
            Filmsitze: JSON.stringify(platz)
        };
            
        $.ajax({
            url: 'http://localhost:8000/api/reservierer',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                cache: false,
                data: JSON.stringify(formData)
            })
            .done(function (response) {
                console.log(response);
            })
            .fail(function (jqXHR, statusText, error) {
                console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        });
        window.open('Bestaetigung.html').focus();
        window.location.href = 'Startseite.html';

        }

    });
});

function showBoxes() {
    const paypalCheckbox = document.getElementById('paypal');
    const kreditkarteCheckbox = document.getElementById('kreditkarte');
    const box = document.getElementById('paypalbox');
    const box1 = document.getElementById('kreditkartenbox');

    if (paypalCheckbox.checked) {
        box.style.display = "block";
        box1.style.display = "none";
        kreditkarteCheckbox.checked = false;
    } else if (kreditkarteCheckbox.checked) {
        box1.style.display = "block";
        box.style.display = "none";
        paypalCheckbox.checked = false;
    }
}

function validateForm() {
    const vorname = document.getElementById('leftbox').value;
    const nachname = document.getElementById('rightbox').value;
    const email = document.getElementById('email').value;
    const strasse = document.getElementById('strasse').value;
    const plz = document.getElementById('plz').value;
    const stadt = document.getElementById('stadt').value;
    const dropdown = document.querySelector('.inputBox select');
    const emailpaypal = document.getElementById('emailpaypal').value;
    const kn = document.getElementById('kn').value;
    const datum = document.getElementById('datum').value;
    const cvc = document.getElementById('cvc').value;
    const paypalCheckbox = document.getElementById('paypal');
    const kreditkarteCheckbox = document.getElementById('kreditkarte');

    let errorField = [];

    const namePattern = /^[a-zA-ZäöüÄÖÜß\s]+$/
    if (!namePattern.test(vorname)) {
        errorField.push('leftbox');
    }
    if (!namePattern.test(nachname)) {
        errorField.push('rightbox');
    }

    const emailPattern = /[a-zA-ZäÄöÖüÜß0-9._%+\-!?#$&'/=^`|{}~]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/;
    if (!emailPattern.test(email)) {
        errorField.push('email');
    }

    const strassePattern = /^[a-zA-Z0-9äöüÄÖÜß\s\-\.]+$/;
    if (!strassePattern.test(strasse)) {
        errorField.push('strasse');
    }

    const plzPattern = /^[0-9]{5}$/;
    if (!plzPattern.test(plz)) {
        errorField.push('plz');
    }

    const stadtPattern = /^[a-zA-ZäöüÄÖÜß\s\-\.]+$/;
    if (!stadtPattern.test(stadt)) {
        errorField.push('stadt');
    }

    if (dropdown.value === '') {
        errorField.push('bundesland');
    }

    cvcPattern = /^[0-9]{3,4}$/;
    knPattern = /^(\d{13,19})$/;
    datumPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/
    if(paypalCheckbox.checked) {
        if(!emailPattern.test(emailpaypal)) {
            errorField.push('emailpaypal');
        }
    }
    if(kreditkarteCheckbox.checked) {
        if(!cvcPattern.test(cvc)) {
            errorField.push('cvc');
        }
        if(!knPattern.test(kn)) {
            errorField.push('kn');
        }
        if(!datumPattern.test(datum)) {
            errorField.push('datum');
        }
    }

    if (errorField.length > 0) {
        errorField.forEach(field => {
          document.getElementById(field).classList.add('error');
        });
        return false;
    }
    return true;
}