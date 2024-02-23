const httpStatus = require('http-status');
const logger = require('../config/logger');

const LanguageService = require('../service/LanguageService');

class LanguageController {
    constructor() {
        this.languageService = new LanguageService();
    }

    getLanguage = async (req, res) => {
        try {
            const language = await this.languageService.getLanguageBySocietyId(req.body.society_id);
            return res.status(httpStatus.OK).json(language);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    addLanguage = async (req, res) => {
        try {
            const language = await this.languageService.createLanguage(req.body);
            return res.status(httpStatus.OK).json(language);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    updateLanguage = async (req, res) => {
        try {
            const language = await this.languageService.updateLanguage(req.body);
            return res.status(httpStatus.OK).json(language);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }
}

module.exports = LanguageController;