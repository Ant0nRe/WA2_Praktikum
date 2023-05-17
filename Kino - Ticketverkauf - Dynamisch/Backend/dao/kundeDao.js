const helper = require('../helper.js');

class KundeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Kunde WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Kunde';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Kunde WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(vorname = '', nachname = '', email = '', strasse = '', plz = 1, stadt = '', bundesland = '', zahlungsart = '') {
        var sql = 'INSERT INTO Kunde (vorname,nachname,email,strasse,plz,stadt,bundesland,zahlungsart) VALUES (?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [vorname, nachname, email, strasse, plz, stadt, bundesland, zahlungsart];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id,vorname = '', nachname = '', email = '', strasse = '', plz = 1, stadt = '', bundesland = '', zahlungsart = '') {
        var sql = 'UPDATE Kunde SET vorname=?,nachname=?,email=?,strasse=?,plz=?,stadt=?,bundesland=?,zahlungsart=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [vorname, nachname, email, strasse, plz, stadt, bundesland, zahlungsart, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Kunde WHERE id=?';
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
        console.log('KundeDao [_conn=' + this._conn + ']');
    }
}

module.exports = KundeDao;