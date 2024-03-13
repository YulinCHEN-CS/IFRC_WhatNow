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

/**
 * @swagger
 * tags:
 *   name: ApiUser
 *   description: API user operations
 */

/**
 * @swagger
 * /get_api_users:
 *   post:
 *     summary: Get all API users
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the user.
 *                     example: 4
 *                   uuid:
 *                     type: string
 *                     description: The UUID of the user.
 *                     example: "aa862a68-a243-4d67-be46-74615bebbe84"
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                     example: "testapiuser2@dev.com"
 *                   first_name:
 *                     type: string
 *                     description: The first name of the user.
 *                     example: "Test first 2"
 *                   last_name:
 *                     type: string
 *                     description: The last name of the user.
 *                     example: "Api user 2"
 *                   status:
 *                     type: integer
 *                     description: The status of the user.
 *                     example: 1
 *                   email_verified:
 *                     type: integer
 *                     description: The email verification status of the user.
 *                     example: 0
 *                   createAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the user was created.
 *                     example: "2024-03-12T00:07:38.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The times when the user was last updated.
 *                     example: "2024-03-12T00:07:38.000Z"
 *                   role_id:
 *                     type: integer
 *                     description: The role ID of the user.
 *                     example: 3
 *                   society_id:
 *                     type: string
 *                     description: The society ID of the user.
 *                     example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                   location:
 *                     type: string
 *                     description: The location of the user.
 *                     example: "GB"
 *                   organization:
 *                     type: string
 *                     description: The organization of the user.
 *                     example: "IFRC"
 *                   industry_type:
 *                     type: string
 *                     description: The industry type of the user.
 *                     example: red cross
 *                   usage:
 *                     type: string
 *                     description: Additional usage information about the user.
 *                     example: for individual use
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Please authenticate"
 */
router.post('/get_api_users', auth(), apiUserController.getAllApiUsers);

/**
 * @swagger
 * /get_api_user_by_id:
 *   post:
 *     summary: Get API user by ID
 *     tags: [ApiUser]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful get by id operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the user.
 *                   example: 4
 *                 uuid:
 *                   type: string
 *                   description: The UUID of the user.
 *                   example: "aa862a68-a243-4d67-be46-74615bebbe84"
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                   example: "testapiuser2@dev.com"
 *                 first_name:
 *                   type: string
 *                   description: The first name of the user.
 *                   example: "Test first 2"
 *                 last_name:
 *                   type: string
 *                   description: The last name of the user.
 *                   example: "Api user 2"
 *                 status:
 *                   type: integer
 *                   description: The status of the user.
 *                   example: 1
 *                 email_verified:
 *                   type: integer
 *                   description: The email verification status of the user.
 *                   example: 0
 *                 createAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created.
 *                   example: "2024-03-12T00:07:38.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The times when the user was last updated.
 *                   example: "2024-03-12T00:07:38.000Z"
 *                 role_id:
 *                   type: integer
 *                   description: The role ID of the user.
 *                   example: 3
 *                 society_id:
 *                   type: string
 *                   description: The society ID of the user.
 *                   example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                 location:
 *                   type: string
 *                   description: The location of the user.
 *                   example: "GB"
 *                 organization:
 *                   type: string
 *                   description: The organization of the user.
 *                   example: "IFRC"
 *                 industry_type:
 *                   type: string
 *                   description: The industry type of the user.
 *                   example: red cross
 *                 usage:
 *                   type: string
 *                   description: Additional usage information about the user.
 *                   example: for individual use
 *       '400':
 *         description: known error
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
 *                   example: "\"uuid\" is required"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Please authenticate"
 */
router.post('/get_api_user_by_id', auth(), apiUserValidator.getApiUserByIdValidator, apiUserController.getApiUserById)

/**
 * @swagger
 * /add_api_user:
 *   post:
 *     summary: Add a new API user
 *     tags: [ApiUser]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API user data to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user (required)
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Password of the user (required)
 *               first_name:
 *                 type: string
 *                 description: First name of the user
 *               last_name:
 *                 type: string
 *                 description: Last name of the user
 *               society_id:
 *                 type: string
 *                 description: Society ID of the user
 *               location:
 *                 type: string
 *                 description: Location of the user
 *               organization:
 *                 type: string
 *                 description: Organization of the user
 *               industry_type:
 *                 type: string
 *                 description: Industry type of the user
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 response:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 201
 *                     message:
 *                       type: string
 *                       example: "Successfully Registered the account! Please Verify your email."
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 6
 *                         uuid:
 *                           type: string
 *                           example: "1b499138-6e04-4622-9362-03f67b842844"
 *                         email:
 *                           type: string
 *                           example: "testapiuser4@dev.com"
 *                         first_name:
 *                           type: string
 *                           example: "Test first 1"
 *                         last_name:
 *                           type: string
 *                           example: "Test last 1"
 *                         status:
 *                           type: integer
 *                           example: 1
 *                         email_verified:
 *                           type: integer
 *                           example: 0
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-12T17:34:51.327Z"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-12T17:34:51.327Z"
 *       '400':
 *         description: known error
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
 *                   example: "\"emial\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the unknown error.
 *                   example: "Something went wrong"
 */
router.post('/add_api_user', auth(), apiUserValidator.addApiUserValidator, apiUserController.addApiUser);

/** 
 * @swagger
 * /update_api_user:
 *   post:
 *     summary: Update an existing API user
 *     tags: [ApiUser]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API user data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user (required)
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Password of the user (required)
 *               first_name:
 *                 type: string
 *                 description: First name of the user
 *               last_name:
 *                 type: string
 *                 description: Last name of the user
 *               society_id:
 *                 type: string
 *                 description: Society ID of the user
 *               location:
 *                 type: string
 *                 description: Location of the user
 *               organization:
 *                 type: string
 *                 description: Organization of the user
 *               industry_type:
 *                 type: string
 *                 description: Industry type of the user
 *               uuid:
 *                 type: string
 *                 description: UUID of the user to be updated (required)
 *     responses:
 *       '200':
 *         description: API User updated successfully
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
 *                       example: "API User updated Successfully!"
 *                     data:
 *                       type: object
 *                       properties: {}
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
 *                   description: A brief message explaining the error.
 *                   example: "\"uuid\" is required"
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
 *                   description: A brief message explaining the error.
 *                   example: "Unauthorized"
 *       '502':
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
*/
router.post('/update_api_user', auth(), apiUserValidator.updateApiUserValidator, apiUserController.updateApiUser);

/**
 * @swagger
 * /delete_api_user:
 *   post:
 *     summary: Delete an existing API user
 *     tags: [ApiUser]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API user data to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID of the user to be deleted (required)
 *     responses:
 *       '200':
 *         description: API User deleted successfully
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
 *                       example: "API User deleted Successfully!"
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 7
 *                         uuid:
 *                           type: string
 *                           example: "b9cf7f89-1b63-4e07-b948-c2a93232a944"
 *                         first_name:
 *                           type: string
 *                           example: "Test first 1"
 *                         last_name:
 *                           type: string
 *                           example: "API User"
 *                         email:
 *                           type: string
 *                           example: "testapiuser5@dev.com"
 *                         password:
 *                           type: null
 *                         status:
 *                           type: integer
 *                           example: 1
 *                         email_verified:
 *                           type: integer
 *                           example: 0
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-12T17:48:04.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T11:17:45.000Z"
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
 *                   example: "\"email\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
 */
router.post('/delete_api_user', auth(), apiUserValidator.deleteApiUserValidator, apiUserController.deleteApiUser);

// api routes

/**
 * @swagger
 * /get_apis:
 *   post:
 *     summary: Get all APIs
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the API.
 *                     example: 2
 *                   uuid:
 *                     type: string
 *                     description: The UUID of the API.
 *                     example: "739e0391-2c1b-498e-a5d9-7426712dc09d"
 *                   user_name:
 *                     type: string
 *                     description: The user name associated with the API.
 *                     example: "Test first 2 Api user 2"
 *                   name:
 *                     type: string
 *                     description: The name of the API.
 *                     example: "Test API 2"
 *                   description:
 *                     type: string
 *                     description: The description of the API.
 *                     example: "test api 2"
 *                   reach:
 *                     type: integer
 *                     description: The reach of the API.
 *                     example: 10
 *                   hits:
 *                     type: integer
 *                     description: The number of hits of the API.
 *                     example: 0
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the API was created.
 *                     example: "2024-03-12T01:06:54.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the API was last updated.
 *                     example: "2024-03-12T01:06:54.000Z"
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
 */
router.post('/get_apis', auth(), apiController.getAllApis);

/**
 * @swagger
 * /get_api_by_id:
 *   post:
 *     summary: Get API by ID
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: UUID of the API to retrieve
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID of the API to retrieve
 *                 example: "87bc0526-8bdf-476b-b192-03b0411e42cb"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 uuid:
 *                   type: string
 *                   example: "87bc0526-8bdf-476b-b192-03b0411e42cb"
 *                 user_name:
 *                   type: string
 *                   example: "Test first 3 Test last 3"
 *                 name:
 *                   type: string
 *                   example: "Test api 2"
 *                 description:
 *                   type: string
 *                   example: null
 *                 reach:
 *                   type: string
 *                   example: null
 *                 hits:
 *                   type: integer
 *                   example: 0
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-13T11:48:51.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-13T11:48:51.000Z"
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
 *                   example: "\"email\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
 */
router.post('/get_api_by_id', apiValidator.getApiByIdValidator, apiController.getApiById);

/**
 * @swagger
 * /add_api:
 *   post:
 *     summary: Add a new API
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API data to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The UUID of the user who owns the API (required)
 *               name:
 *                 type: string
 *                 description: The name of the API
 *               description:
 *                 type: string
 *                 description: Description of the API
 *               reach:
 *                 type: string
 *                 description: Reach of the API
 *     responses:
 *       '200':
 *         description: API added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 uuid:
 *                   type: string
 *                   example: "20733298-6473-44c8-9cc7-5bd52ec73711"
 *                 hits:
 *                   type: integer
 *                   example: 0
 *                 user_id:
 *                   type: string
 *                   example: "aa862a68-a243-4d67-be46-74615bebbe84"
 *                 name:
 *                   type: string
 *                   example: "Test api"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-13T11:46:57.197Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-13T11:46:57.197Z"
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
 *                   example: "\"email\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
 */
router.post('/add_api', auth(), apiValidator.addApiValidator, apiController.addApi);

/**
 * @swagger
 * /update_api:
 *   post:
 *     summary: Update an existing API
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The UUID of the user who owns the API (required)
 *               name:
 *                 type: string
 *                 description: The name of the API
 *               description:
 *                 type: string
 *                 description: Description of the API
 *               reach:
 *                 type: string
 *                 description: Reach of the API
 *               uuid:
 *                 type: string
 *                 description: UUID of the API to be updated (required)
 *     responses:
 *       '200':
 *         description: API updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: integer
 *                description: the id of updated api
 *                example: 1
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
 *                   example: "\"uuid\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
 */
router.post('/update_api', auth(), apiValidator.updateApiValidator, apiController.updateApi);

/**
 * @swagger
 * /delete_api:
 *   post:
 *     summary: Update an existing API
 *     tags: [ApiUsage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: API data to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID of the API to be updated (required)
 *     responses:
 *       '200':
 *         description: API updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: the id of updated api
 *               example: 1
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
 *                   example: "\"uuid\" is required"
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
 *         description: unknown error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: The HTTP status code.
 *                   example: 502
 *                 message:
 *                   type: string
 *                   description: A brief message explaining the error.
 *                   example: "Something went wrong"
 */
router.post('/delete_api', auth(), apiValidator.deleteApiValidator, apiController.deleteApi);

module.exports = router;