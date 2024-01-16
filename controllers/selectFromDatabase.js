const mysql = require("mysql2");
const { dbConfig, attributeTableName, contentTableName, listAttributes, newElementSymbol } = require("../config/contentDBConfig");

/**
 * Select all matched entries from the database
 * @param {Object} dbConfig : database configuration JSON object
 * @param {String} tableName : target table name
 * @param {Array} listAttributes : array of list attribute names
 * @param {String} key : the name of the attribute in the entry to be selected
 * @param {String} value : the value of the attribute in the entry to be selected
 * @returns {Object} : the selected entries in a JSON object, with the key as increment number staring from 0
 */
async function selectFromDatabase(dbConfig, tableName, listAttributes, key, value) {
    const connection = mysql.createConnection(dbConfig);
    try {
        var selectSQL = `SELECT * FROM ${tableName}`;
        if (key && value && key !== '') {
            selectSQL += ` WHERE \`${key}\` = \'${value}\'`;
        }
        selectSQL += `;`;
        const [rows, fields] = await connection.promise().query(selectSQL);
        // console.log(rows);
        parsedObjects = {};
        for (var i=0; i<rows.length; i++) {
            parsedObjects[i] = (parseAttributes(rows[i], listAttributes, newElementSymbol));
        };
        return parsedObjects;
    } catch (error) {
        console.error('Error selecting data from database:', error);
    } finally {
        connection.end();   
    }
}

/**
 * Parse the array of list attributes stored in the database
 * Split the string into an array using the newElementSymbol
 * @param {Object} object : the object to be parsed
 * @param {Array} listAttributes : array of list attribute names
 * @param {String} newElementSymbol 
 * @returns 
 */
function parseAttributes(object, listAttributes, newElementSymbol) {
    listAttributes.forEach((attribute) => {
        if (object[attribute]) {
            object[attribute] = object[attribute].split(newElementSymbol);
        }
    });
    return object;
}

module.exports = {
    selectFromDatabase
};

// test function
// async function main() {
//     try {
//         // connect to the MySQL server
//         console.log('Connected to MySQL database');
//         const result = await selectFromDatabase(dbConfig, contentTableName, [], null, null);
//         console.log(result);
//         // end database connection

//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// main();

