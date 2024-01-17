// app.js

const express = require('express');
const bodyParser = require('body-parser');
const auditLogRouter = require('./routes/AuditLog');
const config = require('./config');
const mysql = require('mysql2/promise');

const app = express();

app.use(bodyParser.json());
app.use('/auditLog', auditLogRouter);


async function checkAndCreateAuditLogTable() {
  const pool = mysql.createPool(config.database);

  try {
    const [rows] = await pool.query('SHOW TABLES LIKE "AuditLog"');
    
    if (rows.length === 0) {
      // 表不存在，创建表
      await pool.query(`
        CREATE TABLE AuditLog (
          log_id INT PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(255),
          content TEXT,
          language_code VARCHAR(10),
          action VARCHAR(50),
          time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          society VARCHAR(50)
        )
      `);
      console.log('AuditLog table created successfully');
    } else {
      console.log('AuditLog table already exists');
    }
  } catch (error) {
    console.error('Error checking or creating AuditLog table:', error);
  } finally {
    pool.end(); 
  }
}


checkAndCreateAuditLogTable();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
