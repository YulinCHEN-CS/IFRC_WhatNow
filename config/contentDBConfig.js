// MySQL database configuration
const contentDBConfig = {
    host: 'localhost',
    user: 'stephen',
    password: 'ifrctest',
    database: 'ifrc_whatnow_content'
};

// List of attributes that are lists in Content table
const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

const contentAttributes = ['Hazard', 'Published', 'Language', 'Title' , 'Description' , 'Web Url', 'Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages']

const longAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages', 'Description'];

// Symbol to separate elements in a list
const newElementSymbol = '~|~';

// Table name for contents
var contentTableNames = ['Austrian_Red_Cross_Contents'];

// Table name for attributes
const attributeTableName = 'ifrc_attribute';


module.exports = {
    contentDBConfig,
    listAttributes,
    newElementSymbol,
    contentTableNames,
    attributeTableName,
    contentAttributes,
    longAttributes
};