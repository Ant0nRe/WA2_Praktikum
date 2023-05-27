const helper = require('../helper.js');

class FilmDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Film WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Film';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Film WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(Name = '', Beschreibung = '', FSK = 1, Dauer = 1, Preis = 0.0, Bildpfad = '') {
        var sql = 'INSERT INTO Film (Name, Beschreibung, FSK, Dauer, Preis, Bildpfad) VALUES (?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [Name, Beschreibung, FSK, Dauer, Preis, Bildpfad];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(ID, Name = '', Beschreibung = '', FSK = 1, Dauer = 1, Preis = 0.0, Bildpfad = '') {
        var sql = 'UPDATE Film SET Name=?, Beschreibung=?, FSK=?, Dauer=?, Preis=?, Bildpfad=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [Name, Beschreibung, FSK, Dauer, Preis, Bildpfad, ID];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(ID);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Film WHERE id=?';
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
        console.log('FilmDao [_conn=' + this._conn + ']');
    }
}

module.exports = FilmDao;