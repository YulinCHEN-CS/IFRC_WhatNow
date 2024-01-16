const fs = require('fs')

const config = {
    db: {
      host: 'new-whatnow-db.mysql.database.azure.com',
      port: '3306',
      user: 'radmin',
      password: 'root_admin123456',
      database: 'whatnow',
      ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
    },
    log: {
      error (message) {
        console.log('[knex error]', message)
      }
    },
    secret: "new-whatnow-secret-key"
}

// List of attributes that are lists in Content table
const listAttributes = ['Mitigation Stages', 'Seasonal Forecast Stages', 'Watch Stages', 'Warning Stages', 'Immediate Stages', 'Recover Stages'];

// Symbol to separate elements in a list
const newElementSymbol = '~|~';

// Table name for contents
const contentTableName = 'ifrc_contents';

// Table name for attributes
const attributeTableName = 'ifrc_attribute';

// const roles = {
//   ADMIN: '3SC Admin',
//   GDPC_ADMIN: 'GDPC Admin',
//   NS_ADMIN: 'NS Admin',
//   NS_EDITOR: 'NS Editor',
//   API_USER: 'API User'
// };

// const permissions = {
//   VIEW_BACKEND: 'view-backend',
//   USERS_VIEW: 'users-view',
//   USERS_LIST: 'users-list',
//   USERS_CREATE: 'users-create',
//   USERS_EDIT: 'users-edit',
//   USERS_DELETE: 'users-delete',
//   USERS_DEACTIVATE: 'users-deactivate',
//   USERS_REACTIVATE: 'users-reactivate',
//   CONTENT_PUBLISH: 'content-publish',
//   CONTENT_CREATE: 'content-create',
//   CONTENT_EDIT: 'content-edit',
//   CONTENT_DELETE: 'content-delete',
//   CONTENT_VIEW: 'content-view',
//   HAZARD_TYPE_CREATE: 'hz-type-create',
//   ALL_ORGANISATIONS: 'organisations_all',
//   TERMS_UPDATE: 'terms-update'
// };

const roles = ['3SC ADMIN', 'GDPC ADMIN', 'NS ADMIN', 'NS EDITOR', 'API USER'];

const permissions = ['VIEW BACKEND', 'USERS VIEW', 'USERS LIST', 'USERS CREATE', 'USERS EDIT', 'USERS DELETE', 'USERS DEACTIVATE', 'USERS REACTIVATE', 'CONTENT PUBLISH', 'CONTENT CREATE', 'CONTENT EDIT', 'CONTENT DELETE', 'CONTENT VIEW', 'HAZARD TYPE CREATE', 'ALL ORGANISATIONS', 'TERMS UPDATE']

module.exports = {
  config,
  listAttributes,
  newElementSymbol,
  contentTableName,
  attributeTableName,
  roles,
  permissions
};
  