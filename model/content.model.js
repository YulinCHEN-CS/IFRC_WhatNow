const Base  = require('./base.model');
module.exports = class Content extends Base {
    constructor(society) {
        super({
            table: society.split(' ').join('_').toLowerCase() + '_content', // like 'austrian_red_cross_contents'
            create: ' (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n' +
            '  `Hazard` VARCHAR(255), `Published` VARCHAR(255), `Language` VARCHAR(255), `Title` VARCHAR(255), `Description` VARCHAR(255), `Web Url` VARCHAR(255), `Mitigation Stages` TEXT, `Seasonal Forecast Stages` TEXT, `Watch Stages` TEXT, `Warning Stages` TEXT, `Immediate Stages` TEXT, `Recover Stages` TEXT)'
        });
        this.society = society;
        this.listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];
        this.attributes = ['Hazard', 'Published', 'Language', 'Title' , 'Description' , 'Web Url', 'Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages']
        this.newElementSymbol = '~|~'; // the symbol used to join the array
    }

    /**
    initialize an object with null in regular attributes and an empty array in list attributes
    @return {Object} - the initialized object
    */
    initializeObject() {
        const object = {};
        this.attributes.forEach((attribute) => {
            if (this.listAttributes.includes(attribute)) {
                object[attribute] = [];
            } else {
                object[attribute] = '';
            }
        });
        // console.log('initialize object');
        return object;
    }
  

    /**
     * Insert data into the database
     * @param {Object} object - The object to be inserted or updated
     * @returns {Promise<Boolean>} - Returns true if the operation is successful, false otherwise
     */
    async insert(object) {
        try {
            // console.log('inserting', object);
            // console.log('have table', this.haveTable);
            // if (!this.haveTable) {
            //     await this.init();
            // }
            object = this.stringfyAttributes(object);
            const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
            const values = Object.values(object).map(value => this.db.escape(value)).join(', ');

            const insertSQL = `
                INSERT INTO ${this.table} (${columns})
                VALUES (${values});
            `;
            // console.log(insertSQL);
            const [result, fields] = await this.db.promise().query(insertSQL);
            console.log("insert result", result);
            return (result.affectedRows > 0);
        } catch (error) {
            console.error('Error inserting or updating data:', error);
            return false;
        }
    }

    // insert(object) {
    //     object = this.stringfyAttributes(object);
    //     const columns = Object.keys(object).map(key => `\`${key}\``).join(', ');
    //     const values = Object.values(object).map(value => this.db.escape(value)).join(', ');

    //     const insertSQL = `
    //         INSERT INTO ${this.table} (${columns})
    //         VALUES (${values});
    //     `;
    //     // console.log(insertSQL);
    //     this.db.query(insertSQL, (err, result) => {
    //         if (err) {
    //             console.error('Error inserting or updating data:', err);
    //             return false;
    //         }
    //         console.log(result);
    //         return (result.affectedRows > 0);
    //     });
    //         // console.log(result);    
    // }

    /**
     * Stringfy the array of list attributes to be stored in the database
     * Join the array into a string using the newElementSymbol
     * @param {Object} object : the object to be stringfied
     * @returns {Object} object : the object with stringfied list attributes
     */
    stringfyAttributes(object) {
        this.listAttributes.forEach((attribute) => {
            if (object[attribute].length > 0) {
                object[attribute] = object[attribute].join(this.newElementSymbol);
            }
            else {
                object[attribute] = '';
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
            while (!this.haveTable) {
                await this.init();
            }
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
    async select(keys, values) {
        try {
            // if (!this.haveTable) {
            //     await this.init();
            // }
            var selectSQL = `SELECT * FROM ${this.table}`;
            if (keys.length > 0 && values.length > 0 && keys.length === values.length) {
                selectSQL += ` WHERE \`${keys[0]}\` = \'${values[0]}\'`;
                for (var i = 1; i < keys.length; i++) {
                    selectSQL += ` AND \`${keys[i]}\` = \'${values[i]}\'`;
                }
            }
            selectSQL += `;`;
            // console.log(selectSQL);
            const [rows, fields] = await this.db.promise().query(selectSQL);
            console.log(rows);
            var parsedObjects = {};
            rows.forEach((row) => {
                parsedObjects[row.id] = this.parseAttributes(row);
            });
            // console.log("selected result", parsedObjects);
            return parsedObjects;
        } catch (error) {
            throw error;
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
            if (object[attribute].length > 0) {
                object[attribute] = object[attribute].split(this.newElementSymbol);
            }
            else {
                object[attribute] = [];
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
            while (!this.haveTable) {
                await this.init();
            }
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

// const content = new Content('Austrian Red Cross');
// console.log(content);
// const result = content.insert(
//     {
//         'Hazard': 'Test 1',
//         'Published': 'no',
//         'Language': 'en',
//         'Title': 'Test'
//     }
// ).then(result => {
//     console.log(result);
// });
// console.log("Insert: ", result);
// result = content.select(['Hazard', 'Language'], ['Test 1', 'en'])
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
