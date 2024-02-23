const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const RegionDao = require('../dao/RegionDao');
const SocietyDao = require('../dao/SocietyDao');
const { language_code } = require('../config/constant')

class RegionService {
    constructor() {
        this.regionDao = new RegionDao();
        this.societyDao = new SocietyDao();
    }

    async getRegionByMultipleIds(society_id, code) {
        try {
            const checkSociety = await this.societyDao.getSocietyById(society_id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not found');
            }
            if (!Object.keys(language_code).includes(code)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Language code not found');
            }
            const region = await this.regionDao.getRegionByMultipleIds(society_id, code);
            return responseHandler.returnSuccess(httpStatus.OK, 'Region fetched successfully', region);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error.message);
        }
    }

    async createRegion(data) {
        try {
            const checkSociety = await this.societyDao.getSocietyById(data.society_id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not found');
            }
            if (!Object.keys(language_code).includes(data.language_code)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Language code not found');
            }
            const region = await this.regionDao.createRegion({
                uuid: uuidv4(),
                region_name: data.region_name,
                society_id: data.society_id,
                description: data.description,
                language_code: data.language_code,
            });
            return responseHandler.returnSuccess(httpStatus.OK, 'Region created successfully', region);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error.message);
        }
    }

    async updateRegionById(data, uuid) {
        try {
            const checkRegion = await this.regionDao.getRegionById(uuid);
            if (!checkRegion) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Region not found');
            }
            const region = await this.regionDao.updateRegionById(data, uuid);
            return responseHandler.returnSuccess(httpStatus.OK, 'Region updated successfully', region);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error.message);
        }
    }

    async deleteRegionById(uuid) {
        try {
            const checkRegion = await this.regionDao.getRegionById(uuid);
            if (!checkRegion) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Region not found');
            }
            const region = await this.regionDao.deleteRegionById(uuid);
            return responseHandler.returnSuccess(httpStatus.OK, 'Region deleted successfully', region);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

module.exports = RegionService;