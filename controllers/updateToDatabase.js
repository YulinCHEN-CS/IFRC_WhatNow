const mysql = require('mysql2');
const { listAttributes, newElementSymbol } = require('../config/contentDBConfig');

async function updateToDatabase(dbConfig, tableName, object) {
    const connection = mysql.createConnection(dbConfig);
    // console.log('original: ', object);
    object = cleanObject(object);
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
        // 执行插入操作
        const results = await connection.execute(insertSQL);
        console.log('Data inserted successfully:', object);
    } catch (error) {
        console.error('Error inserting data into database:', error);
    }
    finally {
        connection.end();
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

module.exports = {
    updateToDatabase,
    stringfyAttributes,
    containSpecialCharacter
};

