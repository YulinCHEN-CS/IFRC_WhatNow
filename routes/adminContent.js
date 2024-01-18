const { selectFromDatabase } = require('../model/selectFromDatabase');
const { updateToDatabase } = require('../model/updateToDatabase');
const { deleteFromDatabase } = require('../model/deleteFromDatabase');
var express = require('express'),
    adminContentRouter= express.Router();
const { dbConfig, attributeTableName, contentTableName, listAttributes } = require("../config/contentDBConfig");

/**
 * GET all contents from the database, including attributes and contents
 * @param {string} key - the name of attribute in the content to be selected
 * @param {string} value - the value of the attribute in the content to be selected
 */
adminContentRouter.get('/', async (req, res) => {
    try {
        const { key, value } = req.query;
        console.log('key: ', key);
        console.log('value: ', value);
        
        var result = {};

        attribute = await selectFromDatabase(dbConfig, attributeTableName, [], null, null) || {};

        contents = await selectFromDatabase(dbConfig, contentTableName, listAttributes, key, value) || {};

    } catch (error) {
        // avoid catch the error of the attribute name not exist
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

/**
 * POST a content to the database
 * @param {Object} object - the content to be inserted or updated, stored in the request body
 */
adminContentRouter.post('/update', async (req, res) => {
    try {
        const object = req.body;
        console.log('object: ', object);
        await updateToDatabase(dbConfig, contentTableName, object);
        res.json({ success: true, message: 'Data successfully inserted or updated.' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

/**
 * POST to delete a content to the database
 * @param {string} key - the name of attribute in the content to be deleted
 * @param {string} value - the value of the attribute in the content to be deleted
 */
adminContentRouter.post('/delete', async (req, res) => {
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

/**
 * POST to update an attribute to the database
 * @param {Object} object - the attribute to be updated, stored in the request body
 */
adminContentRouter.post('/update-attribute', async (req, res) => {
    try {
        const object = req.body;

        console.log('object: ', object);
        
        await updateToDatabase(dbConfig, attributeTableName, object);

        res.json({ success: true, message: 'Data successfully updated.' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.error('Error:', error.message);
    }
});

module.exports = adminContentRouter;