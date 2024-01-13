const mysql = require('mysql2');

// 插入
async function logToAuditLog(dbConfig, tableName, logEntry) {
    const connection = mysql.createConnection(dbConfig);

    try {
        await connection.promise().execute(
            `INSERT INTO ${tableName} (user, action, content, language_code, society, date) VALUES (?, ?, ?, ?, ?, ?)`,
            [logEntry.user, logEntry.action, logEntry.content, logEntry.language_code, logEntry.society, logEntry.date]
        );

        console.log('Audit log entry successfully recorded.');
    } catch (error) {
        console.error('Error recording audit log entry:', error.message);
        throw error;
    } finally {
        connection.end();
    }
}

// 查询
async function getAuditLogs(dbConfig, tableName) {
    const connection = mysql.createConnection(dbConfig);

    try {
        const [rows] = await connection.promise().query(`SELECT * FROM ${tableName}`);
        return rows;
    } catch (error) {
        console.error('Error getting audit logs:', error.message);
        throw error;
    } finally {
        connection.end();
    }
}

// 删除
async function deleteAuditLog(dbConfig, tableName, logId) {
    const connection = mysql.createConnection(dbConfig);

    try {
        await connection.promise().execute(`DELETE FROM ${tableName} WHERE id = ?`, [logId]);
        console.log(`Audit log entry with ID ${logId} successfully deleted.`);
    } catch (error) {
        console.error('Error deleting audit log entry:', error.message);
        throw error;
    } finally {
        connection.end();
    }
}

// 更新
async function updateAuditLog(dbConfig, tableName, logId, updatedLog) {
    const connection = mysql.createConnection(dbConfig);

    try {
        await connection.promise().execute(
            `UPDATE ${tableName} SET user = ?, action = ?, content = ?, language_code = ?, society = ?, date = ? WHERE id = ?`,
            [updatedLog.user, updatedLog.action, updatedLog.content, updatedLog.language_code, updatedLog.society, updatedLog.date, logId]
        );

        console.log(`Audit log entry with ID ${logId} successfully updated.`);
    } catch (error) {
        console.error('Error updating audit log entry:', error.message);
        throw error;
    } finally {
        connection.end();
    }
}

module.exports = { logToAuditLog, getAuditLogs, deleteAuditLog, updateAuditLog };
