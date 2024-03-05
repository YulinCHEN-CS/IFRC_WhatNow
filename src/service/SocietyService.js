const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const SocietyDao = require('../dao/SocietyDao');

class SocietyService {
    constructor() {
        this.societyDao = new SocietyDao();
    }


    async getAllSocieties() {
        try {
            const societies = await this.societyDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, 'Societies', societies);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }


    async getSocietyById(id) {
        try {
            const society = await this.societyDao.getSocietyById(id);
            return responseHandler.returnSuccess(httpStatus.OK, 'Society', society);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }

    async createSociety(society) {
        try {
            society.uuid = uuidv4();
            const society_name = society.society_name;
            const checkSociety = await this.societyDao.getSocietyByName(society_name);
            if (checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society already exist');
            }
            const societyData = await this.societyDao.createSociety(society);

            return responseHandler.returnSuccess(httpStatus.OK, 'Society Created', societyData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }

    async updateSocietyById(society, id) {
        try {
            const checkSociety = await this.societyDao.getSocietyById(id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not exist');
            }
            const societyData = await this.societyDao.updateSocietyById(society, id);
            return responseHandler.returnSuccess(httpStatus.OK, 'Society Updated', societyData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }

    async deleteSocietyById(id) {
        try {
            const checkSociety = await this.societyDao.getSocietyById(id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not exist');
            }
            const societyData = await this.societyDao.deleteSociety(id);
            return responseHandler.returnSuccess(httpStatus.OK, 'Society Deleted', societyData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }
}

module.exports = SocietyService;