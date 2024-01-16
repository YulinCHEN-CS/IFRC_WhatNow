const express = require('express');
const auditLogController = require('../controllers/AuditLogController');

const router = express.Router();

router.post('/update', auditLogController.updateAuditLog);

module.exports = router;
