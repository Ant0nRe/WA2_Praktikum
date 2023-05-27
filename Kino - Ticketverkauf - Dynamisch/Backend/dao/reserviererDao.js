const helper = require('../helper.js');

class ReserviererDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Reservierer WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Reservierer';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Reservierer WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(Vorname = '', Nachname = '', Email = '', Strasse = '', PLZ = 1, Stadt = '', Bundesland = '', Zahlungsart = '', Filmname = '', Filmdatum = '', Filmsitze = '') {
        var sql = 'INSERT INTO Reservierer (Vorname, Nachname, Email, Strasse, PLZ, Stadt, Bundesland, Zahlungsart, Filmname, Filmdatum, Filmsitze) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [Vorname, Nachname, Email, Strasse, PLZ, Stadt, Bundesland, Zahlungsart, Filmname, Filmdatum, Filmsitze];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(ID, Vorname = '', Nachname = '', Email = '', Strasse = '', PLZ = 1, Stadt = '', Bundesland = '', Zahlungsart = '', Filmname = '', Filmdatum = '', Filmsitze = '') {
        var sql = 'UPDATE Reservierer SET Vorname=?, Nachname=?, Email=?, Strasse=?, PLZ=?, Stadt=?, Bundesland=?, Zahlungsart=?, Filmname=?, Filmdatum=?, Filmsitze=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [Vorname, Nachname, Email, Strasse, PLZ, Stadt, Bundesland, Zahlungsart, Filmname, Filmdatum, Filmsitze, ID];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(ID);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Reservierer WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('ReserviererDao [_conn=' + this._conn + ']');
    }
}

module.exports = ReserviererDao;