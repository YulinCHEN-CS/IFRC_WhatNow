const mysql = require("mysql2");

async function deleteFromDatabase(dbConfig, tableName, key, value){
    const connection = mysql.createConnection(dbConfig);
    try {
        var deleteSQL = `DELETE FROM ${tableName}`;
        if (key && value && key !== '') {
            deleteSQL += ` WHERE \`${key}\` = \'${value}\'`;
        }
        deleteSQL += `;`;
        const [rows, fields] = await connection.promise().query(deleteSQL); // 使用 query 方法
        console.log(rows);
        // 可以根据需要返回 rows 或者进行其他处理
    } catch (error) {
        console.error('Error deleting data from database:', error);
    } finally {
        connection.end();   
    }
}

module.exports = {
    deleteFromDatabase
};