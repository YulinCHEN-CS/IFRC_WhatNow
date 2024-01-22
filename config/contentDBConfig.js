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
var societies = ['Austrian Red Cross', 'British Red Cross', 'Canadian Red Cross', 'Danish Red Cross', 'Finnish Red Cross', 'French Red Cross', 'German Red Cross', 'Italian Red Cross', 'Japanese Red Cross', 'Korean Red Cross', 'Netherlands Red Cross', 'Norwegian Red Cross', 'Spanish Red Cross', 'Swedish Red Cross', 'Swiss Red Cross', 'American Red Cross', 'IFRC' ];

// Table name for attributes
const attributeTableName = 'ifrc_attribute';


module.exports = {
    contentDBConfig,
    listAttributes,
    newElementSymbol,
    societies,
    longAttributes
};