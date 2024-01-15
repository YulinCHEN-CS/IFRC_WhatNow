const { selectFromDatabase } = require('../controllers/selectFromDatabase');
const { updateToDatabase } = require('../controllers/updateToDatabase');
const { deleteFromDatabase } = require('../controllers/deleteFromDatabase');
var express = require('express'),
    AuditLogRouter= express.Router();
const { dbConfig, auditLogTableName, listAttributes } = require("../config/contentDBConfig");


AuditLogRouter.get('/', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        
        var result = {};

        attribute = await selectFromDatabase(dbConfig, auditLogTableName, [], null, null) || {};

        contents = await selectFromDatabase(dbConfig, auditLogTableName, listAttributes, key, value) || {};

    } catch (error) {
        if (!(error.code === 'ER_BAD_FIELD_ERROR')) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
            return;
        }
    } finally{
        console.log('attribute: ', attribute);
        console.log('contents: ', contents);
        result = { attribute: attribute, contents: contents };
        res.json(result);
    }
});


AuditLogRouter.post('/update', async (req, res) => {
    try {
        const object = req.body;
        console.log('object: ', object);
        await updateToDatabase(dbConfig, auditLogTableName, object);
        res.json({ success: true, message: 'Data successfully inserted or updated.' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

AuditLogRouter.post('/delete', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        var success = false;
        
        if (key && value && key !== ''){
            await deleteFromDatabase(dbConfig, auditLogTableName, key, value);
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

AuditLogRouter.post('/select', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        var success = false;
        var selectedData = {};

        if (key && value && key !== ''){
            selectedData = await selectFromDatabase(dbConfig, auditLogTableName, key, value);
            success = true;
            message = 'Data successfully selected.';
        } else {
            message = 'No key or value provided.';
        }

        res.json({ success: success, message: message, data: selectedData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

module.exports = AuditLogRouter;
