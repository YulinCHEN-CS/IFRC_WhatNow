const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const UserRoleDao = require('../dao/UserRoleDao');
const UserDao = require('../dao/UserDao');

class UserRoleService {
    constructor() {
        this.userRoleDao = new UserRoleDao();
        this.userDao = new UserDao();
    }

    checkUserRole = async (user_id) => {
        try {
            const userRole = await this.userRoleDao.checkUserRole(user_id);
            if (userRole == null) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Invalid User Role!');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'success', userRole);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }

    setAuth = async (user_id, role_id) => {
        try {
            const user = await this.userDao.getUserById(user_id);
            if (user == null) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Invalid User!');
            }
            const userRole = await this.userRoleDao.createAuth(user_id, role_id);
            return responseHandler.returnSuccess(httpStatus.OK, 'success', userRole);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, error);
        }
    }
}

module.exports = UserRoleService;