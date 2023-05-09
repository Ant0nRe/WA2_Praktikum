const helper = require('../helper.js');
const StartseiteDao = require('../dao/startseiteDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Startseite');

serviceRouter.get('/startseite/gib/:id', function(request, response) {
    console.log('Service Startseite: Client requested one record, id=' + request.params.id);

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var obj = startseiteDao.loadById(request.params.id);
        console.log('Service Startseite: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Startseite: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/startseite/alle', function(request, response) {
    console.log('Service Startseite: Client requested all records');

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var arr = startseiteDao.loadAll();
        console.log('Service Startseite: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Startseite: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/startseite/existiert/:id', function(request, response) {
    console.log('Service Startseite: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var exists = startseiteDao.exists(request.params.id);
        console.log('Service Startseite: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Startseite: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/startseite', function(request, response) {
    console.log('Service Startseite: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bildpfad)) 
        errorMsgs.push('bildpfad fehlt');
    if (helper.isUndefined(request.body.preis)) 
        errorMsgs.push('preis fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.titel)) 
        errorMsgs.push('titel fehlt');
    if (helper.isUndefined(request.body.fsk)) 
        errorMsgs.push('fsk fehlt');
    if (helper.isUndefined(request.body.uhrzeit1)) 
        errorMsgs.push('uhrzeit1 fehlt');
    if (helper.isUndefined(request.body.uhrzeit2)) 
        errorMsgs.push('uhrzeit2 fehlt');
    if (helper.isUndefined(request.body.uhrzeit3)) 
        errorMsgs.push('uhrzeit3 fehlt');
    if (helper.isUndefined(request.body.tag1)) 
        errorMsgs.push('tag1 fehlt');
    if (helper.isUndefined(request.body.tag2)) 
        errorMsgs.push('tag2 fehlt');
    if (helper.isUndefined(request.body.tag3)) 
        errorMsgs.push('tag3 fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Startseite: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var obj = startseiteDao.create(request.body.bildpfad, request.body.preis, request.body.beschreibung, request.body.titel, request.body.fsk, request.body.uhrzeit1, request.body.uhrzeit2, request.body.uhrzeit3, request.body.tag1, request.body.tag2, request.body.tag3);
        console.log('Service Startseite: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Startseite: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/startseite', function(request, response) {
    console.log('Service Startseite: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.bildpfad)) 
        errorMsgs.push('bildpfad fehlt');
    if (helper.isUndefined(request.body.preis)) 
        errorMsgs.push('preis fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.titel)) 
        errorMsgs.push('titel fehlt');
    if (helper.isUndefined(request.body.fsk)) 
        errorMsgs.push('fsk fehlt');
    if (helper.isUndefined(request.body.uhrzeit1)) 
        errorMsgs.push('uhrzeit1 fehlt');
    if (helper.isUndefined(request.body.uhrzeit2)) 
        errorMsgs.push('uhrzeit2 fehlt');
    if (helper.isUndefined(request.body.uhrzeit3)) 
        errorMsgs.push('uhrzeit3 fehlt');
    if (helper.isUndefined(request.body.tag1)) 
        errorMsgs.push('tag1 fehlt');
    if (helper.isUndefined(request.body.tag2)) 
        errorMsgs.push('tag2 fehlt');
    if (helper.isUndefined(request.body.tag3)) 
        errorMsgs.push('tag3 fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Startseite: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var obj = startseiteDao.update(request.body.id, request.body.bildpfad, request.body.preis, request.body.beschreibung, request.body.titel, request.body.fsk, request.body.uhrzeit1, request.body.uhrzeit2, request.body.uhrzeit3, request.body.tag1, request.body.tag2, request.body.tag3);
        console.log('Service Startseite: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Startseite: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/startseite/:id', function(request, response) {
    console.log('Service Startseite: Client requested deletion of record, id=' + request.params.id);

    const startseiteDao = new StartseiteDao(request.app.locals.dbConnection);
    try {
        var obj = startseiteDao.loadById(request.params.id);
        startseiteDao.delete(request.params.id);
        console.log('Service Startseite: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Startseite: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;