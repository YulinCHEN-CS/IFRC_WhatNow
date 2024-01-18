const { listAttributes, newElementSymbol } = require('../config/contentDBConfig.js');
const { insertToTable } = require('../model/insertToTable.js');
const { Content } = require('../model/content.model.js');

/**
 * Check if the data should be inserted based on Hazard and Language keys
 * @param {Object} connection - MySQL connection object
 * @param {String} tableName - Target table name
 * @param {Object} object - The object to be checked for insertion
 * @returns {Promise<Boolean>} - Returns true if the data should be inserted, false otherwise
 */
async function shouldInsertData(connection, tableName, object) {
    try {
        const rows = await connection.execute(
            `SELECT * FROM ${tableName} WHERE Hazard = ? AND Language = ?;`,
            [object.Hazard, object.Language]
        );

        return rows.length === 0; // Return true if no matching entry found
    } catch (error) {
        console.error('Error checking existing data:', error);
        return false; // Default to not inserting data in case of an error
    }
}

/**
 * Update the database with the given object
 * @param {Object} dbConfig - Database configuration JSON object
 * @param {String} tableName - Target table name
 * @param {Object} object - The object to be inserted or updated
 */
function addToContent(society, object) {
    const content = new Content(society);
    try {
        const shouldInsert = shouldInsertData(content, object);

        if (shouldInsert) {

            const isSuccess = insertToTable(connection, tableName, object, listAttributes, newElementSymbol);

            if (isSuccess) {
                console.log('Data inserted successfully:', object);
            } else {
                console.log('Data insertion failed for:', object);
            }
        } else {
            console.log('Data already exists for Hazard and Language:', object);
        }
    } catch (error) {
        console.error('Error updating data in the database:', error);
    } finally {
        connection.end();
    }
}

module.exports = {
    addToContent
};