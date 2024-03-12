const SuperDao = require('./SuperDao');
const models = require('../models');

const Message = models.message;

class MessageDao extends SuperDao {
    constructor() {
        super(Message);
    }

    findAll = async () => {
        return await Message.findAll();
    }

    findByWhere = async (where) => {
        return await Message.findAll({ where: where });
    }

    create = async (data) => {
        return await Message.create(data);
    }

    updateById = async (data, uuid) => {
        return await Message.update(data, { where: { uuid: uuid } });
    }

    deleteById = async (uuid) => {
        return await Message.destroy({ where: { uuid: uuid } });
    }

    deleteBySocietyId = async (society_id) => {
        return await Message.destroy({ where: { society_id: society_id } });
    }

    deleteByMultipleIds = async ({society_id, region_id, content_type, language_code}) => {
        return await Message.destroy({ where: { society_id: society_id, region_id: region_id, content_type: content_type, language_code: language_code } });
    }

    getMessageById = async (uuid) => {
        return await Message.findOne({ where: { uuid: uuid } });
    }

}

module.exports = MessageDao;