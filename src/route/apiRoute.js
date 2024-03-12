const express = require('express');
const ApiUserController = require('../controllers/ApiUserController');
const ApiUserValidator = require('../validator/ApiUserValidator');
const ApiController = require('../controllers/ApiController');
const ApiValidator = require('../validator/ApiValidator');
const router = express.Router();
const auth = require('../middlewares/NsAdminAuth');

const apiUserController = new ApiUserController();
const apiUserValidator = new ApiUserValidator();
const apiController = new ApiController();
const apiValidator = new ApiValidator();

// api user routes
router.post('/get_api_users',auth(), apiUserController.getAllApiUsers);

router.post('/get_api_user_by_id', auth(), apiUserValidator.getApiUserByIdValidator, apiUserController.getApiUserById)

router.post('/add_api_user', auth(), apiUserValidator.addApiUserValidator, apiUserController.addApiUser);

router.post('/update_api_user', auth(), apiUserValidator.updateApiUserValidator, apiUserController.updateApiUser);

router.post('/delete_api_user', auth(), apiUserValidator.deleteApiUserValidator, apiUserController.deleteApiUser);

// api routes

router.post('/get_apis', auth(), apiController.getAllApis);

router.post('/get_api_by_id', auth(), apiValidator.getApiByIdValidator, apiController.getApiById);

router.post('/add_api', auth(), apiValidator.addApiValidator, apiController.addApi);

router.post('/update_api', auth(), apiValidator.updateApiValidator, apiController.updateApi);

router.post('/delete_api', auth(), apiValidator.deleteApiValidator, apiController.deleteApi);

module.exports = router;