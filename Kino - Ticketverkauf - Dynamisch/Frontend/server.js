console.log('Starting server...');

try {
    // create server
    const HTTP_PORT = 3000;
    const express = require('express');

    console.log('Creating Web Server...');
    const app = express();
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'Seiten')));

    // HTML-Dateien

    app.get('/Startseite', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Startseite.html'));
    });

    app.get('/Startseite_alle_Filme', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Startseite_alle_Filme.html'));
    });

    app.get('/Reservieren', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Reservieren.html'));
    });

    app.get('/Impressum', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Impressum.html'));
    });

    app.get('/Zahlungsseite', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Zahlungsseite.html'));
    });

    app.get('/Bestaetigung', (req, res) => {
        res.sendFile(path.join(__dirname, 'Seiten', 'Bestaetigung.html'));
    });

    // starting the Web Server
    console.log('\nBinding Port and starting Webserver...');

    var webServer = app.listen(HTTP_PORT, () => {
        console.log('Listening at localhost, port ' + HTTP_PORT);
        console.log('\nVersion 4.0, 21.02.2023\nSommersemester 2023, HS Albstadt-Sigmaringen, INF');
        console.log('\n\n-----------------------------------------');
        console.log('exit / stop Server by pressing 2 x CTRL-C');
        console.log('-----------------------------------------\n\n');
    });

} catch (ex) {
    console.error(ex);
}
