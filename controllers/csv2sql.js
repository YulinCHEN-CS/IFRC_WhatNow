const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');
const { dbConfig, contentTableName, attributeTableName } = require('../config/contentDBConfig');
const { updateToDatabase, containSpecialCharacter } = require('./updateToDatabase');
const CONTENT_CSV_FILE_PATH = 'data_csv/Content_database.csv';
const ATTRIBUTE_CSV_FILE_PATH = 'data_csv/Attribute_database.csv';
const { listAttributes } = require('../config/contentDBConfig');


/**
 * Process the CSV file and write the data to the database
 * First line as attributes names and first column as primary key
 * Read database infos from ../config/contentDBConfig.js
 * Lines with empty first column will be added to the previous object
 * @param {String} filePath : Path of the CSV file
 * @param {String} tableName : Target table name
 */
function processCSV(filePath, tableName) {
    var currentObject = null;

    // read the CSV file
    fs.createReadStream(filePath, { encoding: 'utf-8', bom: true })
    .pipe(csv())
    // first line as attributes names
    .on('headers', headers => {
        attributeNames = headers;
            // console.log('Processing file with attributes:', attributeNames);
        key_attribute = attributeNames[0]; // Event Type
        initializeTable(dbConfig, tableName, attributeNames, listAttributes);
        // console.log('Processing file with attributes:', attributeNames);
        // console.log('key attribute:', key_attribute);
        // console.log('list attributes:', listAttributes);
    })
    .on('data', (row) => {
        // console.log('Processing row:', row[key_attribute]);
        // if the row has an event type, create a new object
        if (row[key_attribute] && row[key_attribute].trim() !== '') {
            if (currentObject) {
                updateToDatabase(dbConfig, tableName, currentObject);
            }
            currentObject = initializeObject(attributeNames, listAttributes);
        }

        if (currentObject) {
            attributeNames.forEach((attribute) => {
                if (listAttributes.includes(attribute)) {
                    if (row[attribute] && row[attribute].trim() !== '') {
                        currentObject[attribute].push(row[attribute]);
                    }
                } else {
                     if (row[attribute] && row[attribute].trim() !== '') {
                         currentObject[attribute] = row[attribute];
                    }
                }
            });
        }
    })
    .on('end', () => {
        // end of file
        if (currentObject) {
            updateToDatabase(dbConfig, tableName, currentObject);
        }
        console.log('Data processed and written to the database.');
        console.log('end of processCSV, close connection');
    })
    .on('error', (error) => {
        console.error(error);
    });
    
}

/**
    initialize an object with null in regular attributes and an empty array in list attributes
    @param {Array} attributeNames - the names of all attribute names
    @param {Array} listAttributes - the names of the attributes that are lists
    @return {Object} - the initialized object
*/
function initializeObject(attributeNames, listAttributes) {
    const object = {};
    attributeNames.forEach((attribute) => {
        if (listAttributes.includes(attribute)) {
            object[attribute] = [];
        } else {
            object[attribute] = null;
        }
    });
    // console.log('initialize object');
    return object;

}
  
/**
 * Initialize the table
 * Regualr attributes are VARCHAR(255) and list attributes are TEXT
 * @param {Object} dbConfig : data base configuration json object
 * @param {String} tableName : target table name
 * @param {Array} attributeNames : array of all attribute names
 * @param {Array} listAttributes : array of all list attribute names
 */
async function initializeTable(dbConfig, tableName, attributeNames, listAttributes) {
    const connection = mysql.createConnection(dbConfig);
    var createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
  `;
    const shortStr = 'VARCHAR(255)',
    longStr = 'TEXT',
    space = ' ';
    // Copy the attributeNames array and do cleaning later
    names = attributeNames.slice();
    longAttributes = listAttributes.slice();
    longAttributes.push("Description"); // decription as long string
    for (var i = 0; i < names.length; i++) {
        if (containSpecialCharacter(names[i])) {
            names[i] = names[i].replace(/[^\x00-\x7F]/g, '');
        }

        if (i == 0){
            createTableSQL = createTableSQL + "`" + names[i] + "`" + space + shortStr + space +  "PRIMARY KEY" + ", ";
        }
        else if (longAttributes.includes(attributeNames[i])) {
            createTableSQL = createTableSQL + "`" + names[i] + "`" + space + longStr + ", ";
        } 
        else {
            createTableSQL = createTableSQL + "`" + names[i] + "`" + space + shortStr + ", ";
        }
    };
    createTableSQL = createTableSQL.slice(0, -2) + ")"; // remove the last comma and space
    console.log(createTableSQL);

    // process sql query
    try {
        const results = await connection.execute(createTableSQL);
        console.log(results);
        console.log("Table created successfully");
    } catch (error) {
        console.error('Error creating table:', error);
    }finally{
        connection.end();
    }
}

// // start the CSV processing
// processCSV(CONTENT_CSV_FILE_PATH, contentTableName);
// processCSV(ATTRIBUTE_CSV_FILE_PATH, attributeTableName);
 