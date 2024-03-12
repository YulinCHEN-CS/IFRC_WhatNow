const httpStatus = require('http-status');
const logger = require('../config/logger');
const UserDao = require('../dao/UserDao');
const ApiDao = require('../dao/ApiDao');
const { v4: uuidv4 } = require('uuid');

class ApiService {
    constructor() {
        this.apiDao = new ApiDao();
        this.userDao = new UserDao();
    }

    getApis = async () => {
        try {
            const apis = await this.apiDao.findAll();
            const allApis = [];
            for (const api of apis){
                const user = await this.userDao.getUserById(api.user_id)
                const userName = user.first_name + " " + user.last_name;
                allApis.push(
                    {
                        id: api.id,
                        uuid: api.uuid,
                        user_name: userName,
                        name: api.name,
                        description: api.description,
                        reach: api.reach,
                        hits: api.hits,
                        createdAt: api.createdAt,
                        updatedAt: api.updatedAt,
                    }
                )
            }
            return allApis;
        } catch (e) {
            logger.error(e);
            return e;
        }
    };

    getApiById = async (uuid) => {
        try {
            const api = await this.apiDao.findOneByWhere({uuid});
            const user = await this.userDao.getUserById(api.user_id)
            const userName = user.first_name + " " + user.last_name;
            
            return {
                id: api.id,
                uuid: api.uuid,
                user_name: userName,
                name: api.name,
                description: api.description,
                reach: api.reach,
                hits: api.hits,
                createdAt: api.createdAt,
                updatedAt: api.updatedAt,
            };
        } catch (e) {
            logger.error(e);
            return e;
        }
    };

    createApi = async (apiBody) => {
        try {
            const uuid = uuidv4();
            const hits = 0;
            apiBody = {
                uuid,
                hits,
                user_id: apiBody.user_id,
                name: apiBody.name,
                description: apiBody.description,
                reach: apiBody.reach
            }
            const apiData = await this.apiDao.create(apiBody);
            return apiData;
        } catch (e) {
            logger.error(e);
            return e;
        }
    };

    updateApi = async (api, uuid) => {
        try {
            const apiData = await this.apiDao.updateWhere(api, {uuid});
            return apiData;
        } catch (e) {
            logger.error(e);
            return e;
        }
    };

    deleteApi = async (uuid) => {
        try {
            const apiData = await this.apiDao.deleteByWhere({uuid});
            return apiData;
        } catch (e) {
            logger.error(e);
            return e;
        }
    };

}

module.exports = ApiService;

