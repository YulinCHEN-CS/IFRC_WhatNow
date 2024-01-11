const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

const CSV_FILE_PATH = '/path/to/your/file.csv';

// CSV file headers
const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'stephen',
  password: 'ifrctest',
  database: 'ifrc_whatnow_content'
};

async function csv2sql() {
  try {
    // connect to the MySQL server
    const connection = await mysql.createConnection(dbConfig);

    // wait for the CSV processing to complete
    await processCSV(CSV_FILE_PATH, connection);

    // end database connection
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function processCSV(filePath, connection) {
  return new Promise((resolve, reject) => {
    let currentObject = null;

    // read the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      // first line as attributes names
      .on('headers', (headers) => {
        attributeNames = headers;
      })
      .on('data', async (row) => {
        // if the row has an event type, create a new object
        if (row['event type'] && row['event type'].trim() !== '') {
          if (currentObject) {
            // write the previous object to the database if it exists
            await writeToDatabase(currentObject, connection);
          }
          // create a new object
          currentObject = {
            // logic for creating the event type, including initialising the attributes array
          };
        }

        // logic for adding attributes to the attributes array if event name is empty

      })
      .on('end', async () => {
        // end of file
        if (currentObject) {
          await writeToDatabase(currentObject, connection);
        }

        console.log('Data processed and written to the database.');
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

async function writeToDatabase(object, connection) {
  // write the object to the database
  // example function, need to be adapted to our database
  const fields = ['event_type', 'attributes'];
  const values = [object.event_type, JSON.stringify(object.attributes)];

  const query = `INSERT INTO your_table_name (${fields.join(', ')}) VALUES (?, ?)`;
  await connection.query(query, values);

  console.log(`Object with event type ${object.event_type} written to the database.`);
}

// start the CSV processing
csv2sql();
 