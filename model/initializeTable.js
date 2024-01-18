const { contentDBConfig, contentTableNames, contentAttributes, listAttributes } = require('../config/contentDBConfig');
const mysql = require("mysql2");

/**
 * Initialize the table with AUTO_INCREMENT id and all attributes
 * Regualr attributes are VARCHAR(255) and list attributes are TEXT
 * @param {Object} dbConfig : data base configuration json object
 * @param {String} tableName : target table name
 * @param {Array} attributeNames : array of all attribute names
 * @param {Array} listAttributes : array of all list attribute names
 */
async function initializeTable(dbConfig, tableName, attributeNames, longAttributes) {
    const connection = mysql.createConnection(dbConfig);
    var createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${tableName} ( \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `;
    const shortStr = 'VARCHAR(255)',
    longStr = 'TEXT',
    space = ' ';
    for (var i = 0; i < attributeNames.length; i++) {
        if (longAttributes.includes(attributeNames[i])) {
            createTableSQL = createTableSQL + "`" + attributeNames[i] + "`" + space + longStr + ", ";
        } 
        else {
            createTableSQL = createTableSQL + "`" + attributeNames[i] + "`" + space + shortStr + ", ";
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

contentTableNames.forEach((tableName) => {
    initializeTable(contentDBConfig, tableName, contentAttributes, listAttributes);
});