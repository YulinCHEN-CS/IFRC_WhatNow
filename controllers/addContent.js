const { error } = require('console');
const { societies } = require('../model/societies.model.js');

/**
 * Check if the data should be inserted based on Hazard and Language keys
 * @param {Object} connection - MySQL connection object
 * @param {String} tableName - Target table name
 * @param {Object} object - The object to be checked for insertion
 * @returns {Promise<Boolean>} - Returns true if the data should be inserted, false otherwise
 */
async function shouldInsertData(content, object) {
    try {
        const rows = await content.db.execute(
            `SELECT * FROM ${content.table} WHERE Hazard = ? AND Language = ?;`,
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
async function _add(society, object) {
    const content = societies[society];
    try {
        const shouldInsert = shouldInsertData(content, object);

        if (shouldInsert) {

            result = await content.insert(object)
            if (result) {
                return [200, {message: 'Data successfully inserted.'}]; // Success
            } else {
                return [500, {message: 'Error inserting data in the database'}];
            }
        }
        else {
            return [200, {message: 'Data already exists'}]; // Data already exists
        }
    } catch (error) {
        console.error('Error inserting data in the database:', error);
        return [500, {message: 'Error inserting data in the database'}]; 
    }
}

async function add(req, res){
    const society = req.body.society;
    const object = req.body.object;
    result = await _add(society, object);
    res.status(result[0]).send(result[1]);
}

module.exports = {
    _add,
    add
};