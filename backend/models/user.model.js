const Base = require('./base.model');

class User extends Base {
  constructor(){
    super({
      table: 'user_table',
      create: ' (email VARCHAR(50) PRIMARY KEY, name VARCHAR(50), firstname VARCHAR(50), lastname VARCHAR(50), password VARCHAR(255), role VARCHAR(50), ns_1 VARCHAR(50), ns_2 VARCHAR(50), ns_3 VARCHAR(50));'
    });
  }

  all (){
    return this.db.query('SELECT * FROM ' + this.table, (err, result) => {
      if (err) {
        throw err;
      }
    });
  }

  insert (params){
    console.log(params);
    let keys = Object.keys(params);
    let values = Object.values(params);
    return this.db.query('INSERT INTO ' + this.table + ' (' + keys.join(',') + ') VALUES (' + '"' + values.join('","') + '")', (err, result) => {
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
