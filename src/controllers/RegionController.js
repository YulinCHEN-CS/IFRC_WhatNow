const httpStatus = require('http-status');
const logger = require('../config/logger');

const RegionService = require('../service/RegionService');

class RegionController {
    constructor() {
        this.regionService = new RegionService();
    }

    getRegion = async (req, res) => {
        try {
            const region = await this.regionService.getRegionByMultipleIds(req.body.society_id, req.body.language_code);
            return res.status(httpStatus.OK).json(region);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    addRegion = async (req, res) => {
        try {
            const region = await this.regionService.createRegion(req.body);
            return res.status(httpStatus.OK).json(region);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    updateRegion = async (req, res) => {
        try {
            const region = await this.regionService.updateRegionById(req.body, req.body.uuid);
            return res.status(httpStatus.OK).json(region);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    deleteRegion = async (req, res) => {
        try {
            const region = await this.regionService.deleteRegionById(req.body.uuid);
            return res.status(httpStatus.OK).json(region);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }
}

module.exports = RegionController;
