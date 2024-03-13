const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const ApiUserDao = require('../dao/ApiUserDao');
const userDao = require('../dao/UserDao');
const userRoleDao = require('../dao/UserRoleDao');
const userSocietyDao = require('../dao/UserSocietyDao');
const apiDao = require('../dao/ApiDao');
const responseHandler = require('../utils/responseHandler');
const logger = require('../config/logger');
const { userConstant, userRoles } = require('../config/constant');

class ApiUserService {
    constructor() {
        this.apiUserDao = new ApiUserDao();
        this.userDao = new userDao();
        this.userRoleDao = new userRoleDao();
        this.userSocietyDao = new userSocietyDao();
        this.apiDao = new apiDao();
    }

    createApiUser = async (apiUserBody) => {
        try {
            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(apiUserBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }
            const uuid = uuidv4();
            const splitedData = await this.splitData(apiUserBody, uuid);
            this.splitData.user = {
                ...splitedData.user,
                password: bcrypt.hashSync(apiUserBody.password, 8),
            }
            let userData = await this.userDao.create(splitedData.user);
            let userRoleData = await this.userRoleDao.create(splitedData.userRole);
            let userSocietyData = await this.userSocietyDao.create(splitedData.userSociety);
            let apiUserData = await this.apiUserDao.create(splitedData.apiUser);

            if (!userData || !userRoleData || !userSocietyData || !apiUserData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
          
            apiUserData = userData.toJSON();
            delete apiUserData.password;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, apiUserData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };


    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getApiUserByUuid = async (uuid) => {
        const userRole = await this.userRoleDao.findByWhere({ user_id: uuid, role_id: userRoles.API_USER});
        if (userRole.length === 0) {
            return {};
        }
        const user = await this.userDao.findOneByWhere({ uuid });
        const userSociety = await this.userSocietyDao.findOneByWhere({ user_id: uuid });
        const apiUser = await this.apiUserDao.findOneByWhere({ uuid });
        delete user.password;
        const mergedData = await this.mergeData(user, userRole, userSociety, apiUser);
        return mergedData;
    };

    getApiUsers = async () => {
        const usersRole = await this.userRoleDao.findByWhere({ role_id: userRoles.API_USER});
        const mergedData = [];
        for (const userRole of usersRole) {
            const user = await this.userDao.findOneByWhere({ uuid: userRole.user_id });
            const userSociety = await this.userSocietyDao.findOneByWhere({ user_id: userRole.user_id });
            const apiUser = await this.apiUserDao.findOneByWhere({ uuid: userRole.user_id });
            delete user.password;
            mergedData.push(await this.mergeData(user, userRole, userSociety, apiUser));
        }
        return mergedData;
    }

    updateApiUser = async (data, uuid) => {
        let message = 'API User updated Successfully!';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'API User Not found!');
        }

        const splitedData = await this.splitData(data, uuid);
        splitedData.user = {
            ...splitedData.user,
            password: user.password,
        };
        const updateUser = await this.userDao.updateWhere(splitedData.user, { uuid });
        const updateUserRole = await this.userRoleDao.updateWhere(splitedData.userRole, { uses_id: uuid });
        const updateUserSociety = await this.userSocietyDao.updateWhere(splitedData.userSociety, { user_id: uuid });
        const updateApiUser = await this.apiUserDao.updateWhere(splitedData.apiUser, { uuid });

        if (!updateUser) {
            message = 'API User Update Failed!';
            return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
        }
        delete updateUser.password;

        return responseHandler.returnSuccess(httpStatus.OK, message, this.mergeData(updateUser, updateUserRole, updateUserSociety, updateApiUser));
    };

    deleteApiUser = async (uuid) => {
        let message = 'API User deleted Successfully!';
        let statusCode = httpStatus.OK;
        const user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'API User Not found!');
        }
        const deleteUser = await this.userDao.deleteByWhere({ uuid });
        const deleteUserRole = await this.userRoleDao.deleteByWhere({ user_id: uuid });
        const deleteUserSociety = await this.userSocietyDao.deleteByWhere({ user_id: uuid });
        const deleteApiUser = await this.apiUserDao.deleteByWhere({ uuid });
        const deleteApi = await this.apiDao.deleteByWhere({ user_id: uuid });
        if (!deleteUser || !deleteUserRole || !deleteUserSociety || !deleteApiUser) {
            message = 'API User Delete Failed!';
            return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
        }
        delete user.password;

        return responseHandler.returnSuccess(httpStatus.OK, message, user);
    }

    splitData = async (data, uuid) => {
        const user = {
            uuid,
            email: data.email.toLowerCase(),
            first_name: data.first_name,
            last_name: data.last_name,
            status: userConstant.STATUS_ACTIVE,
            email_verified: userConstant.EMAIL_VERIFIED_FALSE,
        };

        const userRole = {
            user_id: uuid,
            role_id: userRoles.API_USER,
        };

        const userSociety = {
            user_id: uuid,
            society_id: data.society_id,
        };

        const apiUser = {
            uuid,
            location: data.location,
            organization: data.organization,
            industry_type: data.industry_type,
            usage: data.usage,
        };

        return { user, userRole, userSociety, apiUser };
    }

    mergeData = async (user, userRole, userSociety, apiUser) => {
        return {
            id : user.id,
            uuid: user.uuid,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            status: user.status,
            email_verified: user.email_verified,
            createAt : user.createdAt,
            updatedAt : user.updatedAt,
            role_id: userRole.role_id,
            society_id: userSociety.society_id,
            location: apiUser.location,
            organization: apiUser.organization,
            industry_type: apiUser.industry_type,
            usage: apiUser.usage,
        };
    };
}

module.exports = ApiUserService;
