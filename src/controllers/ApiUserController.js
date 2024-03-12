const httpStatus = require('http-status');
const logger = require('../config/logger');

const ApiUserService = require('../service/ApiUserService');

class ApiUserController {
    constructor () {
        this.ApiUserService = new ApiUserService();
    }

    getAllApiUsers = async (req, res) => {
        try {
            const api_users = await this.ApiUserService.getApiUsers();
            res.status(httpStatus.OK).send(api_users);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getApiUserById = async (req, res) => {
        try {
            const api_user = await this.ApiUserService.getApiUserByUuid(req.body.uuid);
            res.status(httpStatus.OK).send(api_user);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addApiUser = async (req, res) => {
        try {
            const api_user = await this.ApiUserService.createApiUser(req.body);

            // const country_code = req.body.country_code;
            // const url = req.body.url;
            // const image_url = req.body.image_url;

            res.status(httpStatus.OK).json(api_user);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updateApiUser = async (req, res) => {
        try {
            const api_user = await this.ApiUserService.updateApiUser(req.body, req.body.uuid);
            
            res.status(httpStatus.OK).json(api_user);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deleteApiUser = async (req, res) => {
        try {
            const api_user = await this.ApiUserService.deleteApiUser(req.body.uuid);
            res.status(httpStatus.OK).json(api_user);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

}

module.exports = ApiUserController;