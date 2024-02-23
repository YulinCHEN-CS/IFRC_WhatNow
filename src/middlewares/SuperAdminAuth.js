const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const UserRoleService = require('../service/UserRoleService');

const { userRoles } = require('../config/constant');

const verifyCallback = (req, res, resolve, reject) => {
    return async (err, user, info) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = user;

        const userRoleService = new UserRoleService();
        const responseData = await userRoleService.checkUserRole(req.body.uuid);
        const userRole = responseData.response.data.dataValues;

        // if didn't find user role
        if (!userRole) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }

        // if user role is wrong
        if (userRole.role_id != userRoles.SUPER_ADMIN) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }

        resolve();
    };
};

const auth = () => {
    return async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verifyCallback(req, res, resolve, reject),
            )(req, res, next);
        })
            .then(() => {
                return next();
            })
            .catch((err) => {
                return next(err);
            });
    };
};

module.exports = auth;
