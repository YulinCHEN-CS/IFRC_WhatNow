const httpStatus = require('http-status');
const logger = require('../config/logger');
const { messageTypes } = require('../config/constant');

const SocietyService = require('../service/SocietyService');
const UserSocietyService = require('../service/UserSocietyService');

class SocietyController {
    constructor () {
        this.societyService = new SocietyService();
        this.userSocietyService = new UserSocietyService();
    }

    getSociety = async (req, res) => {
        try {
            const society = await this.societyService.getAllSocieties();
            const { message } = society.response;
            const { data } = society.response;
            const { status } = society.response;
            const code = society.statusCode;
            res.status(society.statusCode).send({ status, code, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getAdminUserSociety = async (req, res) => {
        try {
            const society = await this.userSocietyService.getUserSocietyByUserId(req.body.uuid);
            const { message } = society.response;
            const { data } = society.response;
            const { status } = society.response;
            const code = society.statusCode;
            res.status(society.statusCode).send({ status, code, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addSociety = async (req, res) => {
        try {
            const society = await this.societyService.createSociety(req.body);

            // const country_code = req.body.country_code;
            // const url = req.body.url;
            // const image_url = req.body.image_url;

            res.status(httpStatus.OK).json(society);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updateSociety = async (req, res) => {
        try {
            const society = await this.societyService.updateSocietyById(req.body, req.body.uuid);
            
            res.status(httpStatus.OK).json(society);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deleteSociety = async (req, res) => {
        try {
            const society = await this.societyService.deleteSocietyById(req.body.uuid);
            res.status(httpStatus.OK).json(society);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = SocietyController;