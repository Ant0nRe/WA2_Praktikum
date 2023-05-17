$(document).ready(function() {
    const div1 = $('<div class="my-5 page">');
    const div2 = $('<div class="p-5">');
    const section1 = $('<section class="top-content bb d-flex justify-content-between">');
    const div3 = $('<div class="logo">');
    const div4 = $('<div class="top-right">');
    const div5 = $('<div class="graphic-path">');
    const section2 = $('<section class="store-user mt-5">');
    const div6 = $('<div class="col-10">');
    const div7 = $('<div class="row bb pb-3">');
    const div8 = $('<div class="col-7">');
    const div9 = $('<div class="col-5">');
    const div10 = $('<div class="row extra-info pt-3">');
    const div11 = $('<div class="col-7">');
    const div12 = $('<div class="col-5">');
    const section3 = $('<section class="product-area mt-4">');
    const table = $('<table class="table table-hover">');
    const thead = $('<thead>');
    const tr = $('<tr>');
    const tbody= $('<tbody>');
    const section4 = $('<section class="balance-info">');
    const div15 = $('<div class="row">');
    const div16 = $('<div class="col-8">');
    const div17 = $('<div class="col-4">');
    const table2 = $('<table class="table border-0 table-hover">');
    const tr2 = $('<tr>');
    const tr3 = $('<tr>');
    const tr4 = $('<tr>');
    const tfoot = $('<tfoot>');
    const footer = $('<footer>');
    const div18 = $('<div>');

    let film = getJSONSessionItem('film');
    let platz = getJSONSessionItem('platz');
    let data = getJSONSessionItem('FormData');
    let datum = getSessionItem('datum');
    let ticketpreis = Number(getSessionItem('gesamtpreis')).toFixed(2);
    let mwstpreis = ((Number(ticketpreis)/100)*7).toString();
    let gesamtpreis = (Number(ticketpreis) + Number(mwstpreis));

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '.' +mm + '.' + yyyy;
    
    div1.append(div2);
        div2.append(section1);
            section1.append(div3);
                div3.append($('<img src="http://localhost:8000/startseite/Kino_logo.png" alt="logo" class="img-fluid">'));
            section1.append(div4);
                div4.append(div5);
                    div5.append($('<p>').text('Bestätigung'));

        div2.append(section2);
            section2.append(div6);
                div6.append(div7);
                    div7.append(div8);
                        div8.append($('<p>').text('Verkäufer'));
                        div8.append($('<h2>').text('Kino Ebingen'));
                        div8.append($('<p class="address">').html('Musterstraße 123 <br> 72458 Albstadt Ebingen, <br> Baden-Württemberg'));
                    div7.append(div9);
                        div9.append($('<p>').text('Kunde'));
                        div9.append($('<h2>').text(data.vorname + ' ' + data.nachname));
                        div9.append($('<p class="address">').html(data.strasse +'<br>' + data.plz + ' ' + data.stadt + ', <br>' + data.bundesland));
                    div6.append(div10);
                        div10.append(div11);
                            div11.append($('<p>').html('Zahlungsmethode: <span>'+data.zahlungsart+'</span>'));
                        div10.append(div12);
                            div12.append($('<p>').text('Tickets gekauft am: '));
                            div12.append($('<p>').html('<span>'+ today + '</span>'));

            div2.append(section3);
                section3.append(table);
                    table.append(thead);
                        thead.append(tr);
                            tr.append($('<td>').text('Film'));
                            tr.append($('<td>').text('Datum'));
                            tr.append($('<td>').text('Sitzplatz'));
                            tr.append($('<td>').text('Preis'));
                    table.append(tbody);
                    for(i=0;i < platz.length; i++) {
                        const tr = $('<tr>');
                        const td = $('<td>');
                        const div13 = $('<div class="media">');
                        const div14 = $('<div class="media-body">');
                        tbody.append(tr);
                            tr.append(td);
                                td.append(div13);
                                    div13.append('<img src="http://localhost:8000/' + film.bildpfad + '" class="mr-3 img-fluid" alt="Product 01">');
                                    div13.append(div14);
                                        div14.append($('<p class="mt-4 title">').text(film.titel));
                            tr.append($('<td>').text(datum));
                            tr.append($('<td>').text(platz[i]));
                            tr.append($('<td>').text(film.preis.toFixed(2).replace(".",",") + '€'));
                    }
            
            div2.append(section4);
                section4.append(div15);
                    div15.append(div16);
                        div16.append($('<p class="m-0 font-weight-bold">').text('Hinweis: '));
                        div16.append($('<p>').html(' An der Kasse wird Ihr Alter geprüft. <br> Bitte zeigen Sie diesen  QR-Code an der Kasse.'));
                    div15.append(div17);
                        div17.append(table2);
                            table2.append(tr2);
                                tr2.append($('<td>').text('Zwischensumme:'));
                                tr2.append($('<td>').text(ticketpreis.toString().replace(".",",") + '€'));
                            table2.append(tr3);
                                tr3.append($('<td>').text('inkl. MWST:'));
                                tr3.append($('<td>').text(mwstpreis.toString().replace(".",",") + '€'));
                            table2.append(tfoot);
                                tfoot.append(tr4);
                                    tr4.append($('<td>').text('Gesamt:'));
                                    tr4.append($('<td>').text(gesamtpreis.toString().replace(".",",") + '€'));

            div2.append($('<img class="img-fluid qr-code" src="http://localhost:8000/startseite/QR-Code.png" alt="qr">'));
            div2.append(footer);
                    footer.append(div18);
                        div18.append($('<p>').text('Wir sagen Danke, Ihr Kino Team!'));
    $('BODY').append(div1);
});

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