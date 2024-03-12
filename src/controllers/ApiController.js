const httpStatus = require('http-status');
const logger = require('../config/logger');

const ApiService = require('../service/ApiService');

class ApiController {
    constructor () {
        this.apiService = new ApiService();
    }

    getAllApis = async (req, res) => {
        try {
            const api = await this.apiService.getApis();
            res.status(httpStatus.OK).send(api);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getApiById = async (req, res) => {
        try {
            const api = await this.apiService.getApiById(req.body.uuid);
            res.status(httpStatus.OK).send(api);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addApi = async (req, res) => {
        try {
            const api = await this.apiService.createApi(req.body);

            // const country_code = req.body.country_code;
            // const url = req.body.url;
            // const image_url = req.body.image_url;

            res.status(httpStatus.OK).json(api);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    updateApi = async (req, res) => {
        try {
            const api = await this.apiService.updateApi(req.body, req.body.uuid);
            
            res.status(httpStatus.OK).json(api);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deleteApi = async (req, res) => {
        try {
            const api = await this.apiService.deleteApi(req.body.uuid);
            res.status(httpStatus.OK).json(api);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ApiController;