const passport = require('passport');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const UserRoleService = require('../service/UserRoleService');

const { userRoles } = require('../config/constant');

const config = require('../config/config');

const verifyCallback = (req, res, resolve, reject) => {
    return async (err, user, info) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = user;

        const userRoleService = new UserRoleService();
        const authorization = req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
        if (authorization[1] === undefined) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        try {
            jwt.verify(authorization[1], config.jwt.secret);
        } catch (error) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        const user_id = jwt.verify(authorization[1], config.jwt.secret).sub;
        const responseData = await userRoleService.checkUserRole(user_id);
        const userRole = responseData.response.data.dataValues;

        // if didn't find user role
        if (!userRole) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }

        // if user role is wrong
        if (userRole.role_id !== userRoles.NS_ADMIN) {
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
