const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');
const { dbConfig, contentTableNames, contentAttributes, listAttributes } = require('../config/contentDBConfig');
const { addToContent } = require('../controllers/addContent');
const CONTENT_CSV_FILE_PATH = 'data_csv/Content_database.csv';


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
    fs.createReadStream(filePath, { encoding: 'utf-8' })
    .pipe(csv())
    // first line as attributes names
    .on('headers', headers => {
        // contentAttributes = headers;
            // console.log('Processing file with attributes:', contentAttributes);
        // initializeTable(dbConfig, tableName, contentAttributes, listAttributes);
    })
    .on('data', (row) => {
        // console.log('Processing row:', row);
        // if the row has an event type, create a new object
        if (row[contentAttributes[0]] && row[contentAttributes[0]].trim() !== '') {
            if (currentObject) {
                // console.log('add to content', currentObject);
                addToContent(dbConfig, tableName, currentObject);
            }
            currentObject = initializeObject(contentAttributes, listAttributes);
        }

        if (currentObject) {
            contentAttributes.forEach((attribute) => {
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
            addToContent(dbConfig, tableName, currentObject);
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
    @param {Array} contentAttributes - the names of all attribute names
    @param {Array} listAttributes - the names of the attributes that are lists
    @return {Object} - the initialized object
*/
function initializeObject(contentAttributes, listAttributes) {
    const object = {};
    contentAttributes.forEach((attribute) => {
        if (listAttributes.includes(attribute)) {
            object[attribute] = [];
        } else {
            object[attribute] = null;
        }
    });
    // console.log('initialize object');
    return object;
}
  


// // start the CSV processing
processCSV(CONTENT_CSV_FILE_PATH, contentTableNames[0]);
 