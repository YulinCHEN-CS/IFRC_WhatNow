const SuperDao = require('./SuperDao');
const models = require('../models');

const UserRole = models.user_role;

class UserRoleDao extends SuperDao {
    constructor() {
        super(UserRole);
    }

    async checkUserRole(user_id) {
        try {
            // console.log('user_id', user_id)
            const userRole = await UserRole.findOne({
                where: {
                    user_id,
                },
            });
            return userRole;
        } catch (error) {
            throw error;
        }
    }

    async createAuth(user_id, role_id) {
        try {
            const userRole = await UserRole.create({
                user_id,
                role_id,
            });
            return userRole;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserRoleDao;