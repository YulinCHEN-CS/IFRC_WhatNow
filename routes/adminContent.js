const { selectFromDatabase } = require('../controllers/selectFromDatabase');
var express = require('express'),
    adminContentRouter= express.Router();
const { dbConfig, contentTableName, listAttributes } = require("../config/contentDBConfig");

adminContentRouter.get('/contents', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        
        const resultRows = await selectFromDatabase(dbConfig, contentTableName, listAttributes, key, value);
        
        res.json(resultRows);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// adminContentRouter.get('/contents/update', async (req, res) => {

// });

module.exports = adminContentRouter;