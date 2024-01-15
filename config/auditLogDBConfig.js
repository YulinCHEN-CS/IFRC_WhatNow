// config/auditLogDBConfig.js

const auditLogDBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'flxlsf404',
    database: 'IFRC',
};


const listAttributes = ['email', 'user', 'time', 'action', 'language', 'society'];

// Symbol to separate elements in a list
const newElementSymbol = '~|~';


const AuditLogTableName = 'ifrc_Auditlog';



const auditLogTableName = 'user_logs';

module.exports = { auditLogDBConfig, auditLogTableName, listAttributes, AuditLogTableName, newElementSymbol};


// pool.getConnection((err, connection) => {
//     if (err) throw err;
    
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS user_logs (
//             email VARCHAR(255) AUTO_INCREMENT PRIMARY KEY,
//             user INT,
//             time DATETIME,
//             action VARCHAR(255),
//             language INT,
//             society VARCHAR(255)
//       )
//     `;
    
//     connection.query(createTableQuery, (createTableErr, result) => {
//       connection.release();
//       if (createTableErr) throw createTableErr;
//       console.log('user_logs table created successfully');
//     });
//   });