const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const SocietyDao = require('../dao/SocietyDao');
const AuditDao = require('../dao/AuditDao');
const ContentDao = require('../dao/ContentDao');
const LanguageDao = require('../dao/LanguageDao');
const MessageDao = require('../dao/MessageDao');
const RegionDao = require('../dao/RegionDao');
const UserSocietyDao = require('../dao/UserSocietyDao');

class SocietyService {
    constructor() {
        this.societyDao = new SocietyDao();
        this.auditDao = new AuditDao();
        this.contentDao = new ContentDao();
        this.languageDao = new LanguageDao();
        this.messageDao = new MessageDao();
        this.regionDao = new RegionDao();
        this.UserSocietyDao = new UserSocietyDao();
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
            const auditData = await this.auditDao.deleteAuditLog(id);
            const contentData = await this.contentDao.deleteContentBySocietyId(id);
            const languageData = await this.languageDao.deleteLanguageBySocietyId(id);
            const messageData = await this.messageDao.deleteBySocietyId(id);
            const regionData = await this.regionDao.deleteRegionBySocietyId(id);
            const userSocietyData = await this.UserSocietyDao.setNullSocietyBySocietyId(id);
            
            return responseHandler.returnSuccess(httpStatus.OK, 'Society Deleted', societyData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }
}

module.exports = SocietyService;