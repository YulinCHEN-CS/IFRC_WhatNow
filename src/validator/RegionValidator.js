const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class regionValidator {
    async regionGetValidator(req, res, next) {
        
        const schema = Joi.object({
            society_id: Joi.string().required(),
            language_code: Joi.string().required()
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

    async regionAddValidator(req, res, next) {
        const schema = Joi.object({
            society_id: Joi.string().required(),
            language_code: Joi.string().required(),
            region_name: Joi.string().required(),
            description: Joi.string().required(),
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

    async regionUpdateValidator(req, res, next) {
        const schema = Joi.object({
            uuid: Joi.string().required(),
            region_name: Joi.string().required(),
            description: Joi.string().required(),
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

    async regionDeleteValidator(req, res, next) {
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
}

module.exports = regionValidator;