const conn = require('./connection.model');

class Base{
  constructor(props){
    this.db = conn;
    if (!this.db) {
      throw new Error('Failed to establish database connection.');
    }
    this.db.query('SHOW TABLES LIKE "' + props.table + '"', (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        console.log('Table "' + props.table + '" does not exist.');
        console.log('Creating table "' + props.table + '"...');
        this.db.query('CREATE TABLE ' + props.table + props.create, (err, result) => {
          if (err) {
            throw err;
          }
          console.log('Table "' + props.table + '" created.');
        });
      }
      if (result.length > 1) {
        throw new Error('Table "' + props.table + '" is ambiguous.');
      }
    });
    this.table = props.table;
  }
}

module.exports = Base;