const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

const CSV_FILE_PATH = 'data_csv/Content_database.csv';

// CSV file headers
const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'stephen',
    password: 'ifrctest',
    database: 'ifrc_whatnow_content'
};

const newElementSymbol = '~|~'

async function csv2sql() {
    try {
        // connect to the MySQL server
        const connection = mysql.createConnection(dbConfig);

        processCSV(CSV_FILE_PATH, connection);
        // end database connection

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function processCSV(filePath, connection) {
    var currentObject = null;

    // read the CSV file
    fs.createReadStream(filePath, { encoding: 'utf-8', bom: true })
    .pipe(csv())
    // first line as attributes names
    .on('headers', headers => {
        attributeNames = headers;
            // console.log('Processing file with attributes:', attributeNames);
        key_attribute = attributeNames[0]; // Event Type
        initializeTable(connection, attributeNames, listAttributes);
        // console.log('Processing file with attributes:', attributeNames);
        // console.log('key attribute:', key_attribute);
        // console.log('list attributes:', listAttributes);
    })
    .on('data', (row) => {
        // console.log('Processing row:', row[key_attribute]);
        // if the row has an event type, create a new object
        if (row[key_attribute] && row[key_attribute].trim() !== '') {
            if (currentObject) {
                writeToDatabase(currentObject, connection);
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
            writeToDatabase(currentObject, connection);
        }
        console.log('Data processed and written to the database.');
        console.log('end of processCSV, close connection');
        connection.end();
    })
    .on('error', (error) => {
        console.error(error);
    });
    
}

/* 
    initialize an object with null in regular attributes and an empty array in list attributes
    @param {Array} attributeNames - the names of the attributes
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

function containSpecialCharacter(string) {
    return /[^\x00-\x7F]/g.test(string);
}

async function initializeTable(connection, attributeNames, listAttributes) {
    var createTableSQL = `
    CREATE TABLE IF NOT EXISTS ifrc_contents (
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

    // 执行SQL语句创建表
    try {
        const results = await connection.execute(createTableSQL);
        console.log(results);
        console.log("Table created successfully");
    } catch (error) {
        console.error('Error creating table:', error);
    }
}


async function writeToDatabase(object, connection) {
    // console.log('original: ', object);
    object = cleanObject(object);
    // console.log(object);
    try {
        // 构建插入数据的 SQL 语句
        object = stringfyAttributes(object, listAttributes, newElementSymbol);
        // const insertSQL = `INSERT INTO ifrc_contents SET ` + connection.escape(object);
        const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
        const values = Object.values(object).map(value => connection.escape(value)).join(', ');

        const insertSQL = `
            INSERT INTO ifrc_contents (${columns})
            VALUES (${values})
            ON DUPLICATE KEY UPDATE
            ${Object.keys(object).map(key => `\`${key}\` = VALUES(\`${key}\`)`).join(', ')}
        `;

        // console.log(insertSQL);
        // 执行插入操作
        const results = await connection.execute(insertSQL);
        console.log('Data inserted successfully:', object);
    } catch (error) {
        console.error('Error inserting data into database:', error);
    }
}

function stringfyAttributes(object, listAttributes, newElementSymbol) {
    listAttributes.forEach((attribute) => {
        if (object[attribute]) {
            object[attribute] = object[attribute].join(newElementSymbol);
        }
    });
    return object;
}

function parseAttributes(object, listAttributes, newElementSymbol) {
    listAttributes.forEach((attribute) => {
        if (object[attribute]) {
            object[attribute] = object[attribute].split(newElementSymbol);
        }
    });
    return object;
}
// start the CSV processing
csv2sql();
 