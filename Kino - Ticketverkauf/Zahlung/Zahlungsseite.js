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