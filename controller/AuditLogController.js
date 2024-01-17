const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config.database);

const auditLogController = {
  async updateAuditLog(req, res) {
    try {
      const { email, content, language_code, action, society} = req.body;

      // Inserting into AuditLog table
      const [result] = await pool.query(
        'INSERT INTO AuditLog (email, content, language_code, action) VALUES (?, ?, ?, ?)',
        [email, content, language_code, action, society]
      );

      const logId = result.insertId;

      res.status(200).json({
        success: true,
        logId,
        message: 'Audit log updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
};

module.exports = auditLogController;
