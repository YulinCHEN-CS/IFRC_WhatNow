// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'stephen',
    password: 'ifrctest',
    database: 'ifrc_whatnow_content'
};

// List of attributes that are lists in Content table
const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

// Symbol to separate elements in a list
const newElementSymbol = '~|~';

// Table name for contents
const contentTableName = 'ifrc_contents';

// Table name for attributes
const attributeTableName = 'ifrc_attribute';

module.exports = {
    dbConfig,
    listAttributes,
    newElementSymbol,
    contentTableName,
    attributeTableName
};