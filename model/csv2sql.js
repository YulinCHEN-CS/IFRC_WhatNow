const fs = require('fs');
const csv = require('csv-parser');
const CONTENT_CSV_FILE_PATH = 'data_csv/Content_database.csv';
const { _add } = require('../controllers/addContent.js');


/**
 * Process the CSV file and write the data to the database
 * First line as attributes names and first column as primary key
 * Read database infos from ../config/contentDBConfig.js
 * Lines with empty first column will be added to the previous object
 * @param {String} filePath : Path of the CSV file
 * @param {String} tableName : Target table name
 */
async function processCSV(filePath, society_name) {
    const societies = await require('../model/societies.model.js');
    const society = societies[society_name];
    var contentAttributes = society.attributes;
    var currentObject = society.initializeObject();
    
    // read the CSV file
    fs.createReadStream(filePath, { encoding: 'utf-8' })
    .pipe(csv())
    // first line as attributes names
    .on('headers', headers => {
        console.log('Processing file with attributes:', headers);
    })
    .on('data', (row) => {
        // if the row has an event type, create a new object
        if (row[contentAttributes[0]] && row[contentAttributes[0]].trim() !== '') {
            if (currentObject) {
                const result = _add(society_name, currentObject);
                console.log(result, "init object");
                currentObject = society.initializeObject();
            }
        }

        if (currentObject) {
            contentAttributes.forEach((attribute) => {
                if (society.listAttributes.includes(attribute)) {
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
            const result = _add(society_name, currentObject);
            console.log(result);
            console.log('Data processed and written to the database.');
            console.log('end of processCSV, close connection');
        }
    })
    .on('error', (error) => {
        console.error(error);
    });
}

// // start the CSV processing
processCSV(CONTENT_CSV_FILE_PATH, 'Austrian Red Cross');
 