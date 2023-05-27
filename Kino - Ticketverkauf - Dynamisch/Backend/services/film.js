const helper = require('../helper.js');
const FilmDao = require('../dao/filmDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Film');

serviceRouter.get('/film/gib/:id', function(request, response) {
    console.log('Service Film: Client requested one record, id=' + request.params.id);

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var obj = filmDao.loadById(request.params.id);
        console.log('Service Film: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Film: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/film/alle', function(request, response) {
    console.log('Service Film: Client requested all records');

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var arr = filmDao.loadAll();
        console.log('Service Film: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Film: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/film/existiert/:id', function(request, response) {
    console.log('Service Film: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var exists = filmDao.exists(request.params.id);
        console.log('Service Film: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Film: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/film', function(request, response) {
    console.log('Service Film: Client requested creation of new record');

    var errorMsgs=[];    
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');    
    if (helper.isUndefined(request.body.Beschreibung)) 
        errorMsgs.push('Beschreibung fehlt');
    if (helper.isUndefined(request.body.FSK)) 
        errorMsgs.push('FSK fehlt');    
    if (helper.isUndefined(request.body.Dauer)) 
        errorMsgs.push('Dauer fehlt');    
    if (helper.isUndefined(request.body.Preis)) 
        errorMsgs.push('Preis fehlt');
    if (helper.isUndefined(request.body.Bildpfad)) 
        errorMsgs.push('Bildpfad fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Film: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var obj = filmDao.create(request.body.Name, request.body.Beschreibung, request.body.FSK, request.body.Dauer, request.body.Preis, request.body.Bildpfad);
        console.log('Service Film: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Film: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/film', function(request, response) {
    console.log('Service Film: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ID)) 
        errorMsgs.push('ID fehlt');
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');    
    if (helper.isUndefined(request.body.Beschreibung)) 
        errorMsgs.push('Beschreibung fehlt');
    if (helper.isUndefined(request.body.FSK)) 
        errorMsgs.push('FSK fehlt');    
    if (helper.isUndefined(request.body.Dauer)) 
        errorMsgs.push('Dauer fehlt');    
    if (helper.isUndefined(request.body.Preis)) 
        errorMsgs.push('Preis fehlt');
    if (helper.isUndefined(request.body.Bildpfad)) 
        errorMsgs.push('Bildpfad fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Film: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var obj = filmDao.update(request.body.ID, request.body.Name, request.body.Beschreibung, request.body.FSK, request.body.Dauer, request.body.Preis, request.body.Bildpfad);
        console.log('Service Film: Record updated, id=' + request.body.ID);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Film: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/film/:id', function(request, response) {
    console.log('Service Film: Client requested deletion of record, id=' + request.params.id);

    const filmDao = new FilmDao(request.app.locals.dbConnection);
    try {
        var obj = filmDao.loadById(request.params.id);
        filmDao.delete(request.params.id);
        console.log('Service Film: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Film: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;