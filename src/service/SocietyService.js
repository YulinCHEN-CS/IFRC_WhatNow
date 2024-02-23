const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const SocietyDao = require('../dao/SocietyDao');

class SocietyService {
    constructor() {
        this.societyDao = new SocietyDao();
    }


    getAllSocieties = async () => {
        try {
            const societies = await this.societyDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, 'Societies', societies);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }


    getSocietyById = async (id) => {
        try {
            const society = await this.societyDao.getSocietyById(id);
            return responseHandler.returnSuccess(httpStatus.OK, 'Society', society);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }
}

module.exports = SocietyService;