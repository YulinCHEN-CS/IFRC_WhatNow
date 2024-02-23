const httpStatus = require('http-status');
const UserRoleService = require('../service/UserRoleService');
const logger = require('../config/logger');

class userRoleController {
    constructor() {
        this.userRoleService = new UserRoleService();
    }

    setAuth = async (req, res, next) => {
        try {
            const { user_id } = req.body;
            const { role_id } = req.body;
            console.log('user_id', user_id);
            const userRole = await this.userRoleService.setAuth(user_id, role_id);
            res.status(httpStatus.OK).send(userRole);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    getUserRole = async (req, res, next) => {
        try {
            const { user_id } = req.body;
            const userRole = await this.userRoleService.checkUserRole(user_id);
            res.status(httpStatus.OK).send(userRole);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}

module.exports = userRoleController;