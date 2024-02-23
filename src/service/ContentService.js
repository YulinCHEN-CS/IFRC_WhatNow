const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ContentDao = require('../dao/ContentDao');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');

const SocietyDao = require('../dao/SocietyDao');
const RegionDao = require('../dao/RegionDao');
const { language_code, contentTypes } = require('../config/constant');

class ContentService {
    constructor() {
        this.contentDao = new ContentDao();
        this.societyDao = new SocietyDao();
        this.regionDao = new RegionDao();
    }

    async getContentBySocietyId(society_id) {
        try {
            const checkSociety = await this.societyDao.getSocietyById(society_id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not exist');
            }
            const content = await this.contentDao.getContentBySocietyId(society_id);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', content);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }

    async createContent(content) {
        try {
            const society_id = content.society_id;
            const checkSociety = await this.societyDao.getSocietyById(society_id);
            if (!checkSociety) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Society not exist');
            }
            const content_language_code = content.language_code;
            console.log(content_language_code);
            if (!Object.keys(language_code).includes(content_language_code)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Language code not exist');
            }
            const region_id = content.region_id;
            const checkRegion = await this.regionDao.getRegionById(region_id);
            if (!checkRegion) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Region not exist');
            }
            const content_type = content.content_type;
            if (!Object.keys(contentTypes).includes(content_type)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Content type not exist');
            }
            const checkContent = await this.contentDao.getContentByMultipulIds(society_id, content_language_code, region_id, content_type);
            if (checkContent) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Content already exist');
            }
            const uuid = uuidv4();
            content.uuid = uuid;
            const contentData = await this.contentDao.createContent(content);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', contentData);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }

    async updateContentById(content, uuid) {
        try {
            const checkContent = await this.contentDao.getContentById(uuid);
            if (!checkContent) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Content not exist');
            }
            const contentData = await this.contentDao.updateContentById(content, uuid);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', contentData);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }

    async deleteContentById(uuid) {
        try {
            const contentData = await this.contentDao.deleteContentById(uuid);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', contentData);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }

    async getContentById(uuid) {
        try {
            const contentData = await this.contentDao.getContentById(uuid);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', contentData);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }
}

module.exports = ContentService;