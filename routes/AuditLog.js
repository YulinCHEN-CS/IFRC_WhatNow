const express = require('express');
const { logToAuditLog } = require('../controller/AuditLogController'); // 假设存在 AuditLogController 处理逻辑
const { dbConfig, auditLogTableName, auditLogAttributes } = require('../config/auditLogDBConfig');

const router = express.Router();

router.post('/log', async (req, res) => {
    try {
        const logEntry = req.body;

        await logToAuditLog(dbConfig, auditLogTableName, logEntry);

        res.json({ success: true, message: 'Audit log entry successfully recorded.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
