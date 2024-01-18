const Base = require('./base.model');

class Content extends Base {
    constructor(society) {
        super({
            table: society.split(' ').join('_').toLowerCase() + '_content', // like 'austrian_red_cross_contents'
            create: ' (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n' +
            '  `Hazard` VARCHAR(255), `Published` VARCHAR(255), `Language` VARCHAR(255), `Title` VARCHAR(255), `Description` VARCHAR(255), `Web Url` VARCHAR(255), `Mitigation Stages` TEXT, `Seasonal Forecast Stages` TEXT, `Watch Stages` TEXT, `Warning Stages` TEXT, `Immediate Stages` TEXT, `Recover Stages` TEXT)'
        });
        this.society = society;
        this.listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];
        this.newElementSymbol = '~|~'; // the symbol used to join the array
    }

    /**
     * Insert data into the database
     * @param {Object} object - The object to be inserted or updated
     * @returns {Promise<Boolean>} - Returns true if the operation is successful, false otherwise
     */
    async insert(object) {
        try {
            object = this.stringfyAttributes(object);
            const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
            const values = Object.values(object).map(value => this.db.escape(value)).join(', ');

            const insertSQL = `
                INSERT INTO ${this.table} (${columns})
                VALUES (${values});
            `;
            // console.log(insertSQL);
            const [result, fields] = await this.db.promise().query(insertSQL);
            // console.log(result);
            return (result.affectedRows > 0);
        } catch (error) {
            console.error('Error inserting or updating data:', error);
            return false;
        }
    }
    /**
     * Stringfy the array of list attributes to be stored in the database
     * Join the array into a string using the newElementSymbol
     * @param {Object} object : the object to be stringfied
     * @returns {Object} object : the object with stringfied list attributes
     */
    stringfyAttributes(object) {
        this.listAttributes.forEach((attribute) => {
            if (object[attribute]) {
                object[attribute] = object[attribute].join(this.newElementSymbol);
            }
        });
        return object;
    }

    /**
     * Delete all mateched entries from the database
     * @param {String} key : the name of the attribute in the entry to be deleted
     * @param {String} value : the value of the attribute in the entry to be deleted
     */
    async delete(key, value){
        try {
            var deleteSQL = `DELETE FROM ${this.table}`;
            if (key && value && key !== '') {
                deleteSQL += ` WHERE \`${key}\` = \'${value}\'`;
            }
            deleteSQL += `;`;
            console.log(deleteSQL);
            const [results, fields] = await this.db.promise().query(deleteSQL);
            return (results.affectedRows > 0);
        } catch (error) {
            console.error('Error deleting data from database:', error);
            return false;
        }
    }

    /**
     * Select all matched entries from the database
     * @param {String} key : the name of the attribute in the entry to be selected
     * @param {String} value : the value of the attribute in the entry to be selected
     * @returns {Object} : the selected entries in a JSON object, with the key as increment number staring from 0
     */
    async select(key, value) {
        try {
            var selectSQL = `SELECT * FROM ${this.table}`;
            if (key && value && key !== '') {
                selectSQL += ` WHERE \`${key}\` = \'${value}\'`;
            }
            selectSQL += `;`;
            console.log(selectSQL);
            const [rows, fields] = await this.db.promise().query(selectSQL);
            // console.log(rows);
            var parsedObjects = {};
            rows.forEach((row) => {
                parsedObjects[row.id] = (this.parseAttributes(row));
            });
            return parsedObjects;
        } catch (error) {
            console.error('Error selecting data from database:', error);
            return {};
        }
    }

    /**
     * Parse the array of list attributes stored in the database
     * Split the string into an array using the newElementSymbol
     * @param {Object} object : the object to be parsed
     * @returns 
     */
    parseAttributes(object) {
        this.listAttributes.forEach((attribute) => {
            if (object[attribute]) {
                object[attribute] = object[attribute].split(this.newElementSymbol);
            }
        });
        return object;
    }

    /**
     * Update data in the database based on ID
     * @param {number} id - The ID of the entry to update
     * @param {Object} object - The object containing updated data
     * @returns {Promise<Boolean>} - Returns true if the operation is successful, false otherwise
     */
    async update(id, object) {
        try {
            // Check if the entry with the given id exists
            const exist = await this.select('id', id);
            if (exist) {
                // Entry with the given ID exists, perform update
                object = this.stringfyAttributes(object);

                const updateColumns = Object.keys(object)
                    .map(key => `\`${key}\` = ${this.db.escape(object[key])}`)
                    .join(', ');

                const updateSQL = `
                    UPDATE ${this.table}
                    SET ${updateColumns}
                    WHERE id = ${this.db.escape(id)};
                `;

                const [updateResult] = await this.db.promise().query(updateSQL);
                
                return updateResult.affectedRows > 0;
            } else {
                // Entry with the given ID does not exist
                console.error(`Entry with ID ${id} does not exist.`);
                return false;
            }
        } catch (error) {
            console.error('Error updating data:', error);
            return false;
        }
    }
        
}
    
// let content = new Content('Austrian Red Cross');
// result = content.insert(
//     object={
//         'Hazard': 'Test 1',
//         'Published': 'no',
//         'Language': 'en',
//         'Title': 'Test'
//     }
// ).then(result =>{
//     console.log(result)
// })
// result = content.select('Hazard', 'Test 2')
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// result = content.delete('Hazard', 'Test 1')
//   .then(result => {
//     console.log(result);
//   });
// result = content.update(14, {
//     'Hazard': 'Test 2',
//     'Published': 'no',
//     'Language': 'en',
//     'Title': 'Test'
// }).then(result => {
//     console.log(result);
// })

Module.exports = Content;