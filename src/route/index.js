const express = require('express');
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const superRoute = require('./superRoute');
const apiRoute = require('./apiRoute');

const router = express.Router();

const defaultRoutes = [
    /**
     * @swagger
     * tags:
     *   - name: AUTH
     *     description: routes for authentication
     */
    {
        path: '/auth',
        route: authRoute,
    },

    /**
     * @swagger
     * tags:
     *   - name: ADMIN
     *     description: routes for NS admin user
     */
    {
        path: '/admin',
        route: adminRoute,
    },
    /**
     * @swagger
     * tags:
     *   - name: SUPER
     *     description: routes for GDPC admin user
     */
    {
        path: '/super',
        route: superRoute,
    },
    /**
     * @swagger
     * tags:
     *   - name: API
     *     description: routes for API user and API operations
     */
    {
        path: '/apis',
        route: apiRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
