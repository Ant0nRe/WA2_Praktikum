// Datum ins Feld schreiben
function datedropd(id) {
    const text = document.getElementById(id).innerHTML;
    const inputF = document.getElementById('date');
    inputF.value = text;
}

// Uhrzeit ins Feld schreiben
function timedropd(id) {
    const text = document.getElementById(id).innerHTML;
    const inputF = document.getElementById('time');
    inputF.value = text;
}

const place = document.getElementById("place");
const containerSeats = document.querySelector('.containerSeats');
let count = document.getElementById('count').innerHTML;
let total = document.getElementById('total').innerHTML;
let price = 9;

containerSeats.addEventListener("click", (event) => {
    if (event.target.classList.contains('seat')) {
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
