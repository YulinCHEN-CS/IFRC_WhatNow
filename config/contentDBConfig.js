// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'stephen',
    password: 'ifrctest',
    database: 'ifrc_whatnow_content'
};

const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

const newElementSymbol = '~|~';

const contentTableName = 'ifrc_contents';

module.exports = {
    dbConfig,
    listAttributes,
    newElementSymbol,
    contentTableName
};