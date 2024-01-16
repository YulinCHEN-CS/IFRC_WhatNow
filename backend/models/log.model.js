const Base = require('./base.model');

const Base = require('./base.model');

class User extends Base {
  constructor(){
    var create = " email VARCHAR(50) PRIMARY KEY,"
    var numberOfLogs = 255;
    for (var i = 1; i <= numberOfLogs; i++) {
      create += " log_" + i + " VARCHAR(50),";
    }
    create = create.substring(0, create.length - 1);
    create += ");";
    super({
      table: 'log_table',
      create: create
    });
    super();
  }

  all (){
    return this.db.query('SELECT * FROM ' + this.table, (err, result) => {
      if (err) {
        throw err;
      }
    });
  }

  insert (params){
    let keys = Object.keys(params);
    let values = Object.values(params);
    return this.db.query('INSERT INTO ' + this.table + ' (' + keys.join(',') + ') VALUES ("' + '","' + values.join('","') + '")', (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Inserted ' + result.affectedRows + ' rows.');
    });
  }

  update (email, params){
    let keys = Object.keys(params);
    let values = Object.values(params);
    return this.db.query('UPDATE ' + this.table + ' SET ' + keys.map((key, i) => key + ' = "' + values[i] + '"').join(',') + ' WHERE email = ' + email, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Changed ' + result.changedRows + ' rows.');
    });
  }

  delete (email){
    return this.db.query('DELETE FROM ' + this.table + ' WHERE email = ' + email, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Deleted ' + result.affectedRows + ' rows.');
    });
  }

  findByEmail (email, callback){
    return this.db.query('SELECT * FROM ' + this.table + ' WHERE email = "' + email + '"', (err, result) => {
      if (err) {
        throw err;
      }
      callback(err, result);
    });
  } 
}

module.exports = new User();
