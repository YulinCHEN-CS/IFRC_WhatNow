const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class societyValidator {

    async getAdminUserSocietyValidator(req, res, next) {
        
        const schema = Joi.object({
            uuid: Joi.string().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    /**
     * Validates the request body for adding a society.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @exception {ApiError} - Throws a BAD_REQUEST ApiError if validation fails
     */
    async addSocietyValidator(req, res, next) {
        // Define the validation schema for adding a society
        const schema = Joi.object({
            society_name: Joi.string().max(255).required(),
            // TODO: add more variables and uncomment the following line

            // country_code: Joi.string().required(),
            // url: Joi.string().required(),
            // image_url: Joi.string().required(),

            // Example: name, description, etc.
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma-separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    /**
     * Validates the request body for updating a society.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @exception {ApiError} - Throws a BAD_REQUEST ApiError if validation fails
     */
    async updateSocietyValidator(req, res, next) {
        // Define the validation schema for updating a society
        const schema = Joi.object({
            uuid: Joi.string().length(36).required(),
            society_name: Joi.string().max(255).required(),
            // TODO: add more variables and uncomment the following line

            // country_code: Joi.string().required(),
            // url: Joi.string().required(),
            // image_url: Joi.string().required(),

            // Example: name, description, etc.
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    /**
     * Validates the request body for deleting a society.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @exception {ApiError} - Throws a BAD_REQUEST ApiError if validation fails
     */
    async deleteSocietyValidator(req, res, next) {
        // Define the validation schema for deleting a society
        const schema = Joi.object({
            uuid: Joi.string().length(36).required(),
            // Example: society_id or any other identifier
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }
}

module.exports = societyValidator;