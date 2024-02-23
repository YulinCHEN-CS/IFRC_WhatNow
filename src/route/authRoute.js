const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserRoleController = require('../controllers/UserRoleController');
const UserValidator = require('../validator/UserValidator');
const UserRoleValidator = require('../validator/UserRoleValidator');

const router = express.Router();
const auth = require('../middlewares/auth');

const authController = new AuthController();
const userRoleController = new UserRoleController();
const userValidator = new UserValidator();
const userRoleValidator = new UserRoleValidator();

router.post('/register', userValidator.userCreateValidator, authController.register);

router.post('/email_exists', userValidator.checkEmailValidator, authController.checkEmail);

router.post('/login', userValidator.userLoginValidator, authController.login);

router.post('/logout', authController.logout);

router.post(
    '/change_password',
    auth(),
    userValidator.changePasswordValidator,
    authController.changePassword,
);

router.post(
    '/check_user_role',
    auth(),
    userRoleValidator.getUserRoleValidator,
    userRoleController.getUserRole,
)

module.exports = router;
