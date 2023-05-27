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