const mysql = require("mysql2");

/**
 * Delete all mateched entries from the database
 * @param {Object} dbConfig : Database configuration JSON object
 * @param {String} tableName : target table name
 * @param {String} key : the name of the attribute in the entry to be deleted
 * @param {String} value : the value of the attribute in the entry to be deleted
 */
async function deleteFromDatabase(dbConfig, tableName, key, value){
    const connection = mysql.createConnection(dbConfig);
    try {
        var deleteSQL = `DELETE FROM ${tableName}`;
        if (key && value && key !== '') {
            deleteSQL += ` WHERE \`${key}\` = \'${value}\'`;
        }
        deleteSQL += `;`;
        const [rows, fields] = await connection.promise().query(deleteSQL);
        console.log(rows);
    } catch (error) {
        console.error('Error deleting data from database:', error);
    } finally {
        connection.end();   
    }
}

module.exports = {
    deleteFromDatabase
};