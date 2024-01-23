const conn = require('./connection.model');

class Base {
    constructor(props) {
        this.db = conn;
        if (!this.db) {
            throw new Error('Failed to establish database connection.');
        }
        this.table = props.table;
        this.create = props.create;
        this.haveTable = false;
    }

    async init() {
        return new Promise((resolve, reject) => {
            this.db.query('SHOW TABLES LIKE "' + this.table + '"', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length === 0) {
                    console.log('Table "' + this.table + '" does not exist.');
                    console.log('Creating table "' + this.table + '"...');
                    this.db.query('CREATE TABLE ' + this.table + this.create, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log('Table "' + this.table + '" created.');
                        this.haveTable = true;
                        resolve();
                    });
                } else {
                    this.haveTable = true;
                    resolve();
                }
            });
        });
    }
}

module.exports = Base;