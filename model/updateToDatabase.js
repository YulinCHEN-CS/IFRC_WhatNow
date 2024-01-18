const mysql = require('mysql2');
const { listAttributes, newElementSymbol } = require('../config/contentDBConfig');

/**
 * Update the database with the given object
 * @param {Object} dbConfig : database configuration JSON object
 * @param {String} tableName : target table name
 * @param {Object} object : the object to be inserted or updated
 */
async function updateToDatabase(dbConfig, tableName, object) {
    const connection = mysql.createConnection(dbConfig);
    // console.log('original: ', object);
    // object = cleanObject(object);
    // console.log(object);
    try {
        object = stringfyAttributes(object, listAttributes, newElementSymbol);
        const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
        const values = Object.values(object).map(value => connection.escape(value)).join(', ');

        const insertSQL = `
            INSERT INTO ${tableName} (${columns})
            VALUES (${values})
            ON DUPLICATE KEY UPDATE
            ${Object.keys(object).map(key => `\`${key}\` = VALUES(\`${key}\`)`).join(', ')}
        `;

        // console.log(insertSQL);
        const results = await connection.execute(insertSQL);
        console.log('Data inserted successfully:', object);
    } catch (error) {
        console.error('Error inserting data into database:', error);
    }
    finally {
        connection.end();
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

/**
 * Remove all special characters from the object, like emoji
 * @param {Object} object : the object to be cleaned
 * @returns {Object} object : the cleaned object
 */
function cleanObject(object) {
    var new_key = null;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if (containSpecialCharacter(key)) {
                new_key = key.replace(/[^\x00-\x7F]/g, '');
                object[new_key] = object[key];
                delete object[key];
            }
        }
    }
    key_attribute_value = object[Object.keys(object)[0]];
    if (containSpecialCharacter(key_attribute_value)) {
        object[object.key()[0]] = key_attribute_value.replace(/[^\x00-\x7F]/g, '');
    }
    return object;
}

/**
 * Check if the string contains special characters
 * @param {String} string : the string to be checked
 * @returns {Boolean} true if the string contains special characters
 */
function containSpecialCharacter(string) {
    return /[^\x00-\x7F]/g.test(string);
}

module.exports = {
    updateToDatabase,
    stringfyAttributes,
    containSpecialCharacter
};

