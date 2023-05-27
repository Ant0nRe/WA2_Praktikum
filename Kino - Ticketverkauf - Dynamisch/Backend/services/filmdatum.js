const helper = require('../helper.js');
const FilmdatumDao = require('../dao/filmdatumDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Filmdatum');

serviceRouter.get('/filmdatum/gib/:id', function(request, response) {
    console.log('Service Filmdatum: Client requested one record, id=' + request.params.id);

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var obj = filmdatumDao.loadById(request.params.id);
        console.log('Service Filmdatum: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Filmdatum: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/filmdatum/alle', function(request, response) {
    console.log('Service Filmdatum: Client requested all records');

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var arr = filmdatumDao.loadAll();
        console.log('Service Filmdatum: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Filmdatum: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/filmdatum/existiert/:id', function(request, response) {
    console.log('Service Filmdatum: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var exists = filmdatumDao.exists(request.params.id);
        console.log('Service Filmdatum: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Filmdatum: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/filmdatum', function(request, response) {
    console.log('Service Filmdatum: Client requested creation of new record');

    var errorMsgs=[];    
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');    
    if (helper.isUndefined(request.body.Datum)) 
        errorMsgs.push('Datum fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Filmdatum: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var obj = filmdatumDao.create(request.body.Name, request.body.Datum);
        console.log('Service Filmdatum: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Filmdatum: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/filmdatum', function(request, response) {
    console.log('Service Filmdatum: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ID)) 
        errorMsgs.push('ID fehlt');
    if (helper.isUndefined(request.body.Name)) 
        errorMsgs.push('Name fehlt');    
    if (helper.isUndefined(request.body.Datum)) 
        errorMsgs.push('Datum fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Filmdatum: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var obj = filmdatumDao.update(request.body.ID, request.body.Name, request.body.Datum);
        console.log('Service Filmdatum: Record updated, id=' + request.body.ID);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Filmdatum: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/filmdatum/:id', function(request, response) {
    console.log('Service Filmdatum: Client requested deletion of record, id=' + request.params.id);

    const filmdatumDao = new FilmdatumDao(request.app.locals.dbConnection);
    try {
        var obj = filmdatumDao.loadById(request.params.id);
        filmdatumDao.delete(request.params.id);
        console.log('Service Filmdatum: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Filmdatum: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;