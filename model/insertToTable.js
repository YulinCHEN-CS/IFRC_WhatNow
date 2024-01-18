/**
 * Insert or update data into the database
 * @param {Object} connection - MySQL connection object
 * @param {String} tableName - Target table name
 * @param {Object} object - The object to be inserted or updated
 * @returns {Promise<Boolean>} - Returns true if the operation is successful, false otherwise
 */
async function insertToTable(connection, tableName, object, listAttributes, newElementSymbol) {
    try {
        object = stringfyAttributes(object, listAttributes, newElementSymbol);
        const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
        const values = Object.values(object).map(value => connection.escape(value)).join(', ');

        const insertSQL = `
            INSERT INTO ${tableName} (${columns})
            VALUES (${values})
        `;

        const [results] = await connection.execute(insertSQL);

        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error inserting or updating data:', error);
        return false;
    }
}

/**
 * Stringfy the array of list attributes to be stored in the database
 * Join the array into a string using the newElementSymbol
 * @param {Object} object : the object to be stringfied
 * @param {Array} listAttributes : array of list attribute names
 * @param {String} newElementSymbol : the symbol used to join the array
 * @returns {Object} object : the object with stringfied list attributes
 */
function stringfyAttributes(object, listAttributes, newElementSymbol) {
    listAttributes.forEach((attribute) => {
        if (object[attribute]) {
            object[attribute] = object[attribute].join(newElementSymbol);
        }
    });
    return object;
}

module.exports = {
    insertToTable,
    stringfyAttributes
};
