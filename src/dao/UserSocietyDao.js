const SuperDao = require('./SuperDao');
const models = require('../models');

const UserSociety = models.user_society;

class UserSocietyDao extends SuperDao {
    constructor() {
        super(UserSociety);
    }

    async getUserSocietyByUserId(userId) {
        try {
            const userSocieties = await UserSociety.findAll({where: { user_id: userId }});
            return userSocieties;
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    async createUserSociety(userSocietyBody) {
        try {
            const userSociety = await UserSociety.create(userSocietyBody);
            return userSociety;
        } catch (error) {
            throw error;
        }
    }

    async getAllUserSocieties() {
        try {
            const userSocieties = await UserSociety.findAll();
            return userSocieties;
        } catch (error) {
            throw error;
        }
    }

    async updateUserSocietyById(id, userSocietyBody) {
        try {
            const userSociety = await UserSociety.update(id, userSocietyBody);
            return userSociety;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserSocietyById(id) {
        try {
            const userSociety = await UserSociety.delete(id);
            return userSociety;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserSocietyDao;