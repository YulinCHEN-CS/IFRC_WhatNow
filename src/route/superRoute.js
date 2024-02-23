const express = require('express');

const router = express.Router();
const auth = require('../middlewares/SuperAdminAuth');
const UserRoleController = require('../controllers/UserRoleController');
const UserRoleValidator = require('../validator/UserRoleValidator');

const userRoleController = new UserRoleController();
const userRoleValidator = new UserRoleValidator();

router.post('/set_auth', auth(), userRoleValidator.setAuthValidator, userRoleController.setAuth);

module.exports = router;