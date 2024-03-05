const SuperDao = require('./SuperDao');
const models = require('../models');

const Audit = models.audit;

class AuditDao extends SuperDao {
    constructor() {
        super(Audit);
    }

    findAll = async () => {
        return await this.Model.findAll();
    }

    getAuditLog = async (society_list) => {
        return await this.Model.findAll({
            where: {
                society_id: society_list
            }
        });
    }

    createAuditLog = async (audit) => {
        return await this.Model.create(audit);
    }

    deleteAuditLog = async (society_list) => {
        return await this.Model.destroy({
            where: {
                society_id: society_list
            }
        });
    }
}

module.exports = AuditDao;