const helper = require('../helper.js');
const ReserviererDao = require('../dao/reserviererDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Reservierer');

serviceRouter.get('/reservierer/gib/:id', function(request, response) {
    console.log('Service Reservierer: Client requested one record, id=' + request.params.id);

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var obj = reserviererDao.loadById(request.params.id);
        console.log('Service Reservierer: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierer: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/reservierer/alle', function(request, response) {
    console.log('Service Reservierer: Client requested all records');

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var arr = reserviererDao.loadAll();
        console.log('Service Reservierer: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Reservierer: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/reservierer/existiert/:id', function(request, response) {
    console.log('Service Reservierer: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var exists = reserviererDao.exists(request.params.id);
        console.log('Service Reservierer: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Reservierer: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/reservierer', function(request, response) {
    console.log('Service Reservierer: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Vorname)) 
        errorMsgs.push('Vorname fehlt');
    if (helper.isUndefined(request.body.Nachname)) 
        errorMsgs.push('Nachname fehlt');
    if (helper.isUndefined(request.body.Email)) 
        errorMsgs.push('Email fehlt');
    if (helper.isUndefined(request.body.Strasse)) 
        errorMsgs.push('Strasse fehlt');
    if (helper.isUndefined(request.body.PLZ)) 
        errorMsgs.push('PLZ fehlt');
    if (helper.isUndefined(request.body.Stadt)) 
        errorMsgs.push('Stadt fehlt');
    if (helper.isUndefined(request.body.Bundesland)) 
        errorMsgs.push('Bundesland fehlt');
    if (helper.isUndefined(request.body.Zahlungsart)) 
        errorMsgs.push('Zahlungsart fehlt');
    if (helper.isUndefined(request.body.Filmname)) 
        errorMsgs.push('Filmname fehlt');
    if (helper.isUndefined(request.body.Filmdatum)) 
        errorMsgs.push('Filmdatum fehlt');
    if (helper.isUndefined(request.body.Filmsitze)) 
        errorMsgs.push('Filmsitze fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Reservierer: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var obj = reserviererDao.create(request.body.Vorname, request.body.Nachname, request.body.Email, request.body.Strasse, request.body.PLZ, request.body.Stadt, request.body.Bundesland, request.body.Zahlungsart, request.body.Filmname, request.body.Filmdatum, request.body.Filmsitze);
        console.log('Service Reservierer: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierer: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/reservierer', function(request, response) {
    console.log('Service Reservierer: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ID)) 
        errorMsgs.push('ID fehlt');
    if (helper.isUndefined(request.body.Vorname)) 
        errorMsgs.push('Vorname fehlt');
    if (helper.isUndefined(request.body.Nachname)) 
        errorMsgs.push('Nachname fehlt');
    if (helper.isUndefined(request.body.Email)) 
        errorMsgs.push('Email fehlt');
    if (helper.isUndefined(request.body.Strasse)) 
        errorMsgs.push('Strasse fehlt');
    if (helper.isUndefined(request.body.PLZ)) 
        errorMsgs.push('PLZ fehlt');
    if (helper.isUndefined(request.body.Stadt)) 
        errorMsgs.push('Stadt fehlt');
    if (helper.isUndefined(request.body.Bundesland)) 
        errorMsgs.push('Bundesland fehlt');
    if (helper.isUndefined(request.body.Zahlungsart)) 
        errorMsgs.push('Zahlungsart fehlt');
    if (helper.isUndefined(request.body.Filmname)) 
        errorMsgs.push('Filmname fehlt');
    if (helper.isUndefined(request.body.Filmdatum)) 
        errorMsgs.push('Filmdatum fehlt');
    if (helper.isUndefined(request.body.Filmsitze)) 
        errorMsgs.push('Filmsitze fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Reservierer: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var obj = reserviererDao.update(request.body.ID, request.body.Vorname, request.body.Nachname, request.body.Email, request.body.Strasse, request.body.PLZ, request.body.Stadt, request.body.Bundesland, request.body.Zahlungsart, request.body.Filmname, request.body.Filmdatum, request.body.Filmsitze);
        console.log('Service Reservierer: Record updated, id=' + request.body.ID);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierer: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/reservierer/:id', function(request, response) {
    console.log('Service Reservierer: Client requested deletion of record, id=' + request.params.id);

    const reserviererDao = new ReserviererDao(request.app.locals.dbConnection);
    try {
        var obj = reserviererDao.loadById(request.params.id);
        reserviererDao.delete(request.params.id);
        console.log('Service Reservierer: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Reservierer: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;