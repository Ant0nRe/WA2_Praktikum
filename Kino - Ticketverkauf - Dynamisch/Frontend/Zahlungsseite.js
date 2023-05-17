$(document).ready(function() {
    const section = $('<section class="containerInfo">');
    const table = $('<table class="tableInfo">');
    const tbody = $('<tbody>');
    const tr1 = $('<tr>');
    const tr2 = $('<tr>');
    const tr3 = $('<tr>');
    const tr4 = $('<tr>');
    const tr5 = $('<tr>');
    let film = getJSONSessionItem('film');
        
    section.append($('<h3>').text('Ausgewählte Sachen'));
    section.append(table);
        table.append(tbody);
            tbody.append(tr1);
                tr1.append($('<td>').text('Vorstellung: ' + film.titel));
            tbody.append(tr2);
                tr2.append($('<td>').text('Datum: ' + getSessionItem('datum')));
            tbody.append(tr3);
                tr3.append($('<td>').text('Uhrzeit: ' + getSessionItem('time')));
            tbody.append(tr4);
                tr4.append($('<td>').text('Preis: ' + Number(getSessionItem('gesamtpreis')).toFixed(2).replace(".",",") + '€'));
            tbody.append(tr5);
                tr5.append($('<td>').text('Sitzwahl: ' + getJSONSessionItem('platz')));

    $('.container').append(section);

    const button = document.querySelector('.submit-btn');
    button.addEventListener('click', () => {  
        const form = document.querySelector('#form');
        const formData = {
            vorname: form.elements[0].value,
            nachname: form.elements[1].value,
            email: form.elements[2].value,
            strasse: form.elements[3].value,
            plz: form.elements[4].value,
            stadt: form.elements[5].value,
            bundesland: form.elements[6].value,
            zahlungsart: form.elements["payment"].value,
        };
        setJSONSessionItem("FormData", formData);
            
        $.ajax({
            url: 'http://localhost:8000/api/kunde',
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

const box = document.getElementById('paypalbox');
const box1 = document.getElementById("kreditkartenbox");

function showBoxes1() {
    document.getElementById('paypal').checked = true;
    document.getElementById('kreditkarte').checked = false;
    if(document.getElementById('paypal').checked) {
        box.style.display = "block";
        box1.style.display ="none"
    }
    else {
        box1.style.display = "block";
        box.style.display ="none"
    }
}

function showBoxes2() {
    document.getElementById('kreditkarte').checked = true;
    document.getElementById('paypal').checked = false;
    if(document.getElementById('kreditkarte').checked) {
        box1.style.display = "block";
        box.style.display ="none"
    }
    else {
        box1.style.display ="none"
        box.style.display = "block";
    }
}