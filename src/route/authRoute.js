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

/**
 * @swagger
 * tags:
 *  name: auth
 *  description: Authentication management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 required: true
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully Registered the account! Please Verify your email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Registered the account! Please Verify your email.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: testuser2@dev.com
 *                     uuid:
 *                       type: string
 *                       example: "caee7b25-aa6c-43ae-81a1-c224b3b5a4be"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     email_verified:
 *                       type: integer
 *                       example: 0
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-14T22:12:57.432Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-14T22:12:57.432Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "password is required"
 *       '502':
 *         description: Unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 502
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.post('/register', userValidator.userCreateValidator, authController.register);

/**
 * @swagger
 * /email_exists:
 *   post:
 *     summary: Check if email exists
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *     responses:
 *       '200':
 *         description: Email found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Email found!"
 *                 data:
 *                   type: object
 *                   description: Usually empty({}) since password will not be returned and email is known
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "email is required"
 *       '502':
 *         description: Unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 502
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.post('/email_exists', userValidator.checkEmailValidator, authController.checkEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 required: true
 *     responses:
 *       '200':
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login Successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     uuid:
 *                       type: string
 *                       example: "caee7b25-aa6c-43ae-81a1-c224b3b5a4be"
 *                     first_name:
 *                       type: string
 *                       nullable: true
 *                     last_name:
 *                       type: string
 *                       nullable: true
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "testuser2@dev.com"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     email_verified:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-14T22:12:57.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-14T22:12:57.000Z"
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     access:
 *                       type: object
 *                       properties:
 *                         token:
 *                           type: string
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWVlN2IyNS1hYTZjLTQzYWUtODFhMS1jMjI0YjNiNWE0YmUiLCJpYXQiOjE3MTA0NTQ4MjAsImV4cCI6MTcxMDU0MTIyMCwidHlwZSI6ImFjY2VzcyJ9.hBP8P-4-vBPsbR4EypOc3m-djWNj_7FXUP7JxitvsI8"
 *                         expires:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-15T22:20:20.696Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "password is required"
 *       '502':
 *         description: Unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 502
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.post('/login', userValidator.userLoginValidator, authController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User Logout
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokens:
 *                 type: string
 *                 description: Array of tokens to be revoked
 *     responses:
 *       '204':
 *         description: No Content
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /change_password:
 *   post:
 *     summary: Change User Password
 *     tags: [auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *                 minLength: 6
 *                 required: true
 *               uuid:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Password updated Successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Password updated Successfully!
 *                 data:
 *                   type: object
 *                   description: Usually empty({}) since password will not be returned and email is known
 *                   example: {}
 *       '400':
 *         description: Confirm password not matched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Confirm password not matched
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '404':
 *         description: User Not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User Not found!
 *       '502':
 *         description: Unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 502
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.post(
    '/change_password',
    auth(),
    userValidator.changePasswordValidator,
    authController.changePassword,
);

/**
 * @swagger
 * /check_user_role:
 *   post:
 *     summary: Check User Role
 *     tags: [auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 response:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: success
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 6
 *                         user_id:
 *                           type: string
 *                           example: "1b499138-6e04-4622-9362-03f67b842844"
 *                         role_id:
 *                           type: integer
 *                           example: 3
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-12T17:34:51.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-12T17:34:51.000Z"
 *       '400':
 *         description: Confirm password not matched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid User Role!"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '502':
 *         description: Unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 502
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.post(
    '/check_user_role',
    auth(),
    userRoleValidator.getUserRoleValidator,
    userRoleController.getUserRole,
)

module.exports = router;
