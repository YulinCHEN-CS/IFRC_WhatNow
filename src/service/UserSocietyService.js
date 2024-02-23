const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const UserSocietyDao = require('../dao/UserSocietyDao');

class UserSocietyService {
    constructor() {
        this.userSocietyDao = new UserSocietyDao();
    }


    async createUserSociety(userSocietyBody) {
        try {
            const userSociety = await this.userSocietyDao.createUserSociety(userSocietyBody);
            return responseHandler.returnSuccess(httpStatus.CREATED, 'UserSociety created successfully', userSociety);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }


    async getAllUserSocieties() {
        try {
            const userSocieties = await this.userSocietyDao.getAllUserSocieties();
            return responseHandler.returnSuccess(httpStatus.OK, 'UserSocieties fetched successfully', userSocieties);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }


    async getUserSocietyByUserId(userId) {
        try {
            console.log('user_id', userId)
            const userSocieties = await this.userSocietyDao.getUserSocietyByUserId(userId);
            return responseHandler.returnSuccess(httpStatus.OK, 'UserSocieties fetched successfully', userSocieties);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }


    async updateUserSocietyById(id, userSocietyBody) {
        try {
            const userSociety = await this.userSocietyDao.updateUserSocietyById(id, userSocietyBody);
            return responseHandler.returnSuccess(httpStatus.OK, 'UserSociety updated successfully', userSociety);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }

    async deleteUserSocietyById(id) {
        try {
            const userSociety = await this.userSocietyDao.deleteUserSocietyById(id);
            return responseHandler.returnSuccess(httpStatus.OK, 'UserSociety deleted successfully', userSociety);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }
}

module.exports = UserSocietyService;