const helper = require('../helper.js');
const ReservierungsitzeDao = require('../dao/reservierungsitzeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Reservierungsitze');

serviceRouter.get('/reservierungsitze/gib/:id', function(request, response) {
    console.log('Service Reservierungsitze: Client requested one record, id=' + request.params.id);

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var obj = reservierungsitzeDao.loadById(request.params.id);
        console.log('Service Reservierungsitze: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierungsitze: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/reservierungsitze/alle', function(request, response) {
    console.log('Service Reservierungsitze: Client requested all records');

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var arr = reservierungsitzeDao.loadAll();
        console.log('Service Reservierungsitze: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Reservierungsitze: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/reservierungsitze/existiert/:id', function(request, response) {
    console.log('Service Reservierungsitze: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var exists = reservierungsitzeDao.exists(request.params.id);
        console.log('Service Reservierungsitze: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Reservierungsitze: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/reservierungsitze', function(request, response) {
    console.log('Service Reservierungsitze: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');
    if (helper.isUndefined(request.body.Datum)) 
        errorMsgs.push('Datum fehlt');
    if (helper.isUndefined(request.body.Platzid)) 
        errorMsgs.push('Platzid fehlt');
    if (helper.isUndefined(request.body.Status)) 
        errorMsgs.push('Status fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Reservierungsitze: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var obj = reservierungsitzeDao.create(request.body.Name, request.body.Datum, request.body.Platzid, request.body.Status);
        console.log('Service Reservierungsitze: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierungsitze: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/reservierungsitze', function(request, response) {
    console.log('Service Reservierungsitze: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ID)) 
        errorMsgs.push('ID fehlt');
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');
    if (helper.isUndefined(request.body.Datum)) 
        errorMsgs.push('Datum fehlt');
    if (helper.isUndefined(request.body.Platzid)) 
        errorMsgs.push('Platzid fehlt');
    if (helper.isUndefined(request.body.Status)) 
        errorMsgs.push('Status fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Reservierungsitze: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var obj = reservierungsitzeDao.update(request.body.ID, request.body.Name, request.body.Datum, request.body.Platzid, request.body.Status);
        console.log('Service Reservierungsitze: Record updated, id=' + request.body.ID);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Reservierungsitze: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/reservierungsitze/:id', function(request, response) {
    console.log('Service Reservierungsitze: Client requested deletion of record, id=' + request.params.id);

    const reservierungsitzeDao = new ReservierungsitzeDao(request.app.locals.dbConnection);
    try {
        var obj = reservierungsitzeDao.loadById(request.params.id);
        reservierungsitzeDao.delete(request.params.id);
        console.log('Service Reservierungsitze: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Reservierungsitze: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;