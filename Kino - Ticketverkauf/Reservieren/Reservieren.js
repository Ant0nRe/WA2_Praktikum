const place = document.getElementById("place");
const containerSeats = document.querySelector('.containerSeats');
let count = document.getElementById('count').innerHTML;
let total = document.getElementById('total').innerHTML;
let price = 9;
var previousEl;

containerSeats.addEventListener("click", (event) => {
    if (event.target.classList.contains('seat') && count <= 9) {
        event.stopImmediatePropagation();
        // Falls Sitz angeklickt -> weiß
        event.target.classList.replace('seat', 'seat-sold');
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
        total = Number(total) + Number(price);
        let totalspan = document.getElementById('total');
        totalspan.innerHTML = total;
    } 
    else {
        // Falls nochmal Sitz angeklickt -> grau
        event.target.classList.replace('seat-sold', 'seat');
        // Sitznummer aus Feld löschen
        let elementId = event.target.id;
        let elem = document.getElementById('wantedSeat' + elementId);
        elem.parentNode.removeChild(elem);
        // Preis und Anzahl Plätze verringern
        count --;
        let countspan = document.getElementById('count');
        countspan.innerHTML = count;
        total = Number(total) - Number(price);
        let totalspan = document.getElementById('total');
        totalspan.innerHTML = total;
    }
});

function change(x) {
    // Schaut, ob ein vorheriges previousEl existiert, falls ja wird es der Klasse boxtime zugewiesen
    if (previousEl) {
        previousEl.className = "boxtime";
    }
    // Nimmt sich ID des div und weist ihm die Klasse boctime-sold zu
    previousEl = document.getElementById(x);
    previousEl.className = "boxtime-sold";
}