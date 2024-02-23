const SuperDao = require('./SuperDao');
const models = require('../models');

const Society = models.society;

class SocietyDao extends SuperDao {
    constructor() {
        super(Society);
    }

    async getSocietyById(society_id) {
        try {
            const society = await this.Model.findOne({
                where: {
                    uuid: society_id,
                },
            });
            return society;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const societies = await this.Model.findAll();
            return societies;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SocietyDao;