const helper = require('../helper.js');

class StartseiteDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Startseite WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Startseite';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Startseite WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(bildpfad = '', preis = 0.0, beschreibung = '', titel = '', fsk = 1, uhrzeit1 = '', uhrzeit2 = '', uhrzeit3 = '', tag1 = '', tag2 = '', tag3 = '') {
        var sql = 'INSERT INTO Startseite (bildpfad,preis,beschreibung,titel,fsk,uhrzeit1,uhrzeit2,uhrzeit3,tag1,tag2,tag3) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [bildpfad,preis,beschreibung,titel,fsk,uhrzeit1,uhrzeit2,uhrzeit3,tag1,tag2,tag3];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(bildpfad = '', preis = 0.0, beschreibung = '', titel = '', fsk = 1, uhrzeit1 = '', uhrzeit2 = '', uhrzeit3 = '', tag1 = '', tag2 = '', tag3 = '') {
        var sql = 'UPDATE satrtseite SET bildpfad=?,preis=?,beschreibung=?,titel=?,fsk=?,uhrzeit1=?,uhrzeit2=?,uhrzeit3=?,tag1=?,tag2=?,tag3=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [bildpfad,preis,beschreibung,titel,fsk,uhrzeit1,uhrzeit2,uhrzeit3,tag1,tag2,tag3];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Startseite WHERE id=?';
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
        console.log('StartseiteDao [_conn=' + this._conn + ']');
    }
}

module.exports = StartseiteDao;