const { selectFromDatabase } = require('../controllers/selectFromDatabase');
const { updateToDatabase } = require('../controllers/updateToDatabase');
const { deleteFromDatabase } = require('../controllers/deleteFromDatabase');
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

adminContentRouter.post('/contents/update', async (req, res) => {
    try {
        const object = req.body;

        console.log('object: ', object);
        res.json({ success: true, message: 'Data successfully inserted or updated.' });
        
        await updateToDatabase(dbConfig, contentTableName, object);

    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

adminContentRouter.post('/contents/delete', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        var success = false;
        
        if (key && value && key !== ''){
            await deleteFromDatabase(dbConfig, contentTableName, key, value);
            success = true;
            message = 'Data successfully deleted.';
        }
        else{
            message = 'No key or value provided.';
        }
        res.json({ success: success, message: message});
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

module.exports = adminContentRouter;