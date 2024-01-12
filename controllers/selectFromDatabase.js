const mysql = require("mysql2");
const { dbConfig, contentTableName, listAttributes, newElementSymbol } = require("../config/contentDBConfig");


async function selectFromDatabase(dbConfig, tableName, listAttributes, key, value) {
    const connection = mysql.createConnection(dbConfig);
    try {
        var selectSQL = `SELECT * FROM ${tableName}`;
        if (key && value && key !== '') {
            selectSQL += ` WHERE \`${key}\` = \'${value}\'`;
        }
        selectSQL += `;`;
        const [rows, fields] = await connection.promise().query(selectSQL); // 使用 query 方法
        // console.log(rows);
        parsedObjects = [];
        rows.forEach((object) => {
            parsedObjects.push(parseAttributes(object, listAttributes, newElementSymbol));
        });
        return parsedObjects;
        // 可以根据需要返回 rows 或者进行其他处理
    } catch (error) {
        console.error('Error selecting data from database:', error);
    } finally {
        connection.end();   
    }
}


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

// async function main() {
//     try {
//         // connect to the MySQL server
//         console.log('Connected to MySQL database');
//         const result = await selectFromDatabase(dbConfig, contentTableName, listAttributes, 'Event Type', 'Winter Storm');
//         console.log(result);
//         // end database connection

//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// main();

