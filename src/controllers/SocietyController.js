const httpStatus = require('http-status');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

const SocietyService = require('../service/SocietyService');
const UserSocietyService = require('../service/UserSocietyService');

class societyController {
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
}

module.exports = societyController;