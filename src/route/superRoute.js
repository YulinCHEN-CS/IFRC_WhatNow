const express = require('express');
const ContentController = require('../controllers/ContentController');
const MessageController = require('../controllers/MessageController');
const SocietyController = require('../controllers/SocietyController');
const LanguageController = require('../controllers/LanguageController');
const RegionController = require('../controllers/RegionController');
const AuditLogController = require('../controllers/AuditController');
const ContentValidator = require('../validator/ContentValidator');
const MessageValidator = require('../validator/MessageValidator');
const SocietyValidator = require('../validator/SocietyValidator');
const LanguageValidator = require('../validator/LanguageValidator');
const RegionValidator = require('../validator/RegionValidator');
const AuditLogValidator = require('../validator/AuditValidator');
const UserRoleController = require('../controllers/UserRoleController');
const UserRoleValidator = require('../validator/UserRoleValidator');

const router = express.Router();
const auth = require('../middlewares/NsAdminAuth');

const contentController = new ContentController();
const messageController = new MessageController();
const societyController = new SocietyController();
const languageController = new LanguageController();
const regionController = new RegionController();
const auditLogController = new AuditLogController();
const contentValidator = new ContentValidator();
const messageValidator = new MessageValidator();
const societyValidator = new SocietyValidator();
const languageValidator = new LanguageValidator();
const regionValidator = new RegionValidator();
const auditLogValidator = new AuditLogValidator();
const userRoleController = new UserRoleController();
const userRoleValidator = new UserRoleValidator();


router.post('/set_auth', auth(), userRoleValidator.setAuthValidator, userRoleController.setAuth);

// content routes
router.post('/get_content', auth(), contentValidator.contentGetValidator, contentController.getContent);

router.post('/add_content', auth(), contentValidator.contentAddValidator, contentController.addContent);

router.post('/update_content', auth(), contentValidator.contentUpdateValidator, contentController.updateContent);

router.post('/delete_content', auth(), contentValidator.contentDeleteValidator, contentController.deleteContent);

// message routes
router.post('/get_content_message', auth(), messageValidator.messageGetValidator, messageController.getContentMessage);

router.post('/update_content_message', auth(), messageValidator.messageUpdateValidator, messageController.updateContentMessage);

// language routes

/**
 * @swagger
 * tags:
 *  name: language
 *  description: Language management
 */

/**
 * @swagger
 * /get_language:
 *   post:
 *     summary: Get language by society id
 *     tags: [language]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_id:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Language retrieved successfully
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
 *                       example: "success"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           uuid:
 *                             type: string
 *                             example: "32a377d5-8f1c-4dc2-899b-b1135e7c146e"
 *                           society_id:
 *                             type: string
 *                             example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                           language_code:
 *                             type: string
 *                             example: "EN"
 *                           url:
 *                             type: string
 *                             example: "https://www.google.com"
 *                           description:
 *                             type: string
 *                             example: "English"
 *                           message:
 *                             type: string
 *                             example: "English"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-11T22:21:13.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-11T22:21:13.000Z"
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
 *                   description: error message
 *                   example: "\"society_id\" is required"
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
 *                   description: error message
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

router.post('/get_language', auth(), languageValidator.languageGetValidator, languageController.getLanguage);

/**
 * @swagger
 * /add_language:
 *   post:
 *     summary: Add language
 *     tags: [language]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_id:
 *                 type: string
 *                 required: true
 *               language_code:
 *                 type: string
 *                 required: true
 *               url:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               message:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Language added successfully
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
 *                       example: "success"
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         society_id:
 *                           type: string
 *                           example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                         language_code:
 *                           type: string
 *                           example: "ZH"
 *                         description:
 *                           type: string
 *                           example: "Chineses"
 *                         url:
 *                           type: string
 *                           example: "https://google.com"
 *                         message:
 *                           type: string
 *                           example: "Chinese"
 *                         uuid:
 *                           type: string
 *                           example: "073f77a0-6c1a-45ae-b9ee-4edae2d2fa47"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T21:12:52.597Z"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T21:12:52.597Z"
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
 *                   description: error message
 *                   example: "Language code not exist"
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
 *                   description: error message
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
router.post('/add_language', auth(), languageValidator.languageAddValidator, languageController.addLanguage);

/**
 * @swagger
 * /update_language:
 *   post:
 *     summary: Update language
 *     tags: [Language]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 required: true
 *               url:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               message:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Language updated successfully
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
 *                       example: "success"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         description: effected ids
 *                         example: 1
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
 *                   description: error message
 *                   example: "Language code not exist"       
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
 *                   description: error message
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
router.post('/update_language', auth(), languageValidator.languageUpdateValidator, languageController.updateLanguage);

// region routes
/**
 * @swagger
 * tags:
 *   name: region
 *   description: Operations related to regions
 */
 
/**
 * @swagger
 * /get_region:
 *   post:
 *     summary: Get region
 *     tags: [region]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_id:
 *                 type: string
 *                 required: true
 *               language_code:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Region fetched successfully
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
 *                       example: "Region fetched successfully"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 4
 *                           uuid:
 *                             type: string
 *                             example: "330f4b79-4665-4b6b-9ead-f7f7623b3354"
 *                           region_name:
 *                             type: string
 *                             example: "Test Region"
 *                           society_id:
 *                             type: string
 *                             example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                           description:
 *                             type: string
 *                             example: "Test Region"
 *                           language_code:
 *                             type: string
 *                             example: "ZH"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-11T22:21:13.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-11T22:21:13.000Z"
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
 *                   description: error message
 *                   example: "Language code not exist"  
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
 *                   description: error message
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
router.post('/get_region', auth(), regionValidator.regionGetValidator, regionController.getRegion);
/**
 * @swagger
 * /add_region:
 *   post:
 *     summary: Add region
 *     tags: [region]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_id:
 *                 type: string
 *                 required: true
 *               language_code:
 *                 type: string
 *                 required: true
 *               region_name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Region created successfully
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
 *                       example: "Region created successfully"
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 11
 *                         uuid:
 *                           type: string
 *                           example: "38d4eec4-b43a-491e-b93c-5df61d18437c"
 *                         region_name:
 *                           type: string
 *                           example: "Test region ZH"
 *                         society_id:
 *                           type: string
 *                           example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                         description:
 *                           type: string
 *                           example: "Chineses simplified region"
 *                         language_code:
 *                           type: string
 *                           example: "ZH"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T21:31:38.043Z"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T21:31:38.043Z"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 * 
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: error message
 *                   example: "Language code not exist"  
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
 *                   description: error message
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

router.post('/add_region', auth(), regionValidator.regionAddValidator, regionController.addRegion);

/**
 * @swagger
 * /update_region:
 *   post:
 *     summary: Update region
 *     tags: [region]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 required: true
 *               region_name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Region updated successfully
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
 *                       example: "Region updated successfully"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         description: effected ids
 *                         example: 1
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 * 
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: error message
 *                   example: "society_id is required"  
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
router.post('/update_region', auth(), regionValidator.regionUpdateValidator, regionController.updateRegion);

/**
 * @swagger
 * /delete_region:
 *   post:
 *     summary: Delete region
 *     tags: [region]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Region deleted successfully
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
 *                       example: "Region deleted successfully"
 *                     data:
 *                       type: integer
 *                       description: effected id
 *                       example: 1
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 * 
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: error message
 *                   example: "uuid is required"  
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
 *                   description: error message
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
router.post('/delete_region', auth(), regionValidator.regionDeleteValidator, regionController.deleteRegion);


// society routes
/**
 * @swagger
 * tags:
 *  name: society
 *  description: Society management
 */
/**
 * @swagger
 * /get_society:
 *   post:
 *     summary: Get societies
 *     tags: [society]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Societies
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
 *                   example: "Societies"
 *                 data:
 *                   type: array
 *                   description: List of societies exists
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       uuid:
 *                         type: string
 *                         example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                       society_name:
 *                         type: string
 *                         example: "Test Society"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-11T22:21:13.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-11T22:21:13.000Z"
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
router.post('/get_society', auth(), societyController.getSociety);

/**
 * @swagger
 * /get_admin_user_society:
 *   post:
 *     summary: Get admin user societies
 *     tags: [society]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: UserSocieties fetched successfully
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
 *                   example: "UserSocieties fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       user_id:
 *                         type: string
 *                         example: "f48845c1-e703-4743-8c62-3c51895bc3d0"
 *                       society_id:
 *                         type: string
 *                         example: "0f21cd24-ad15-414f-8706-a433f2319c4a"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-12T00:08:35.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-12T00:08:35.000Z"
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
 *                   example: "uuid is required"
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
router.post('/get_admin_user_society', auth(), societyValidator.getAdminUserSocietyValidator, societyController.getAdminUserSociety);

/**
 * @swagger
 * /add_society:
 *   post:
 *     summary: Add society
 *     tags: [society]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_name:
 *                 type: string
 *                 maxLength: 255
 *                 required: true
 *     responses:
 *       '200':
 *         description: Society Created
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
 *                       example: "Society Created"
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         society_name:
 *                           type: string
 *                           example: "Test society 2"
 *                         uuid:
 *                           type: string
 *                           example: "bce811fe-48f6-4154-9e8b-d64162d11600"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T22:27:15.946Z"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-13T22:27:15.946Z"
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
 *                   example: "society_name is required"
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
router.post('/add_society', auth(), societyValidator.addSocietyValidator, societyController.addSociety);

/**
 * @swagger
 * /update_society:
 *   post:
 *     summary: Update society
 *     tags: [society]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 maxLength: 36
 *                 required: true
 *               society_name:
 *                 type: string
 *                 maxLength: 255
 *                 required: true
 *     responses:
 *       '200':
 *         description: Society Updated
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
 *                       example: "Society Updated"
 *                     data:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         description: Effected rows
 *                         example: 1
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
 *                   example: "uuid is required"
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
router.post('/update_society',auth(), societyValidator.updateSocietyValidator, societyController.updateSociety);

/**
 * @swagger
 * /delete_society:
 *   post:
 *     summary: Delete society
 *     tags: [Society]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 maxLength: 36
 *                 required: true
 *                 description: "Example: society_id or any other identifier"
 *     responses:
 *       '200':
 *         description: Society Deleted
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
 *                       example: "Society Deleted"
 *                     data:
 *                       type: integer
 *                       description: "Number of deleted societies"
 *                       example: 1
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
 *                   example: "uuid is required"
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
router.post('/delete_society', auth(), societyValidator.deleteSocietyValidator, societyController.deleteSociety);

// audit log routes
/**
 * @swagger
 * tags:
 *   name: audit_log
 *   description: Operations related to audit logs
 */

/**
 * @swagger
 * /get_audit_log:
 *   post:
 *     summary: Get audit logs
 *     tags: [audit_log]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 required: true
 *     responses:
 *       '200':
 *         description: Fetch audit logs successfully
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
 *                   example: "fetch audit-logs successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       uuid:
 *                         type: string
 *                         example: "38d4eec4-b43a-491e-b93c-5df61d18437c"
 *                       language_code:
 *                         type: string
 *                         example: "ZH"
 *                       content_type:
 *                         type: string
 *                         example: "contents"
 *                       action:
 *                         type: string
 *                         example: "create"
 *                       time:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-13T21:53:21.000Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-13T21:53:21.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-13T21:53:21.000Z"
 *                       user:
 *                         type: string
 *                         example: "Test first 3 Test last 3"
 *                       society:
 *                         type: string
 *                         example: "Test Society"
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
 *                   example: "society_ids must be an array of strings"
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
router.post('/get_audit_log', auth(), auditLogValidator.auditLogGetValidator, auditLogController.getAuditLog);

module.exports = router;