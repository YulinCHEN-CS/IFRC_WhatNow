const express = require('express');
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const superRoute = require('./superRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/admin',
        route: adminRoute,
    },
    {
        path: '/super',
        route: superRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
