const db = require('./models');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { userConstant, language_code, userRoles } = require('./config/constant');

const test_society_uuid = uuidv4();
const super_admin_uuid = uuidv4();
const test_admin_uuid = uuidv4();

async function seedSociety() {
    try {
        const society = await db.society.findOne({ where: { society_name: 'Test Society' } });
        if (society) {
            console.log('society already exists');
            return;
        } else {
            await db.society.create({
                uuid: test_society_uuid,
                society_name: 'Test Society'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seedLanguage() {
    try {
        const language = await db.language.findOne({ where: { society_id: test_society_uuid } });
        if (language) {
            console.log('language already exists');
            return;
        } else {
            Object.keys(language_code).forEach(async (key) => {
                await db.language.create({
                    uuid: uuidv4(),
                    society_id: test_society_uuid,
                    language_code: key,
                    url: 'https://www.google.com',
                    description: language_code[key],
                    message: language_code[key]
                })
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seedRegion() {
    try {
        const region = await db.region.findOne({ where: { society_id: test_society_uuid } });
        if (region) {
            console.log('region already exists');
            return;
        } else {
            Object.keys(language_code).forEach(async (key) => {
                await db.region.create({
                    uuid: uuidv4(),
                    society_id: test_society_uuid,
                    language_code: key,
                    region_name: 'Test Region',
                    description: 'Test Region'
                })
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seedUser() {
    try {
        const super_user = await db.user.findOne({ where: { email: 'super_admin@dev.com' } });
        if (super_user) {
            console.log('super user already exists');
            return;
        } else {
            const hashedPassword = await bcrypt.hash('123456', 10);
            await db.user.create({
                uuid: super_admin_uuid,
                email: 'super_admin@dev.com',
                password: hashedPassword,
                first_name: 'Super',
                last_name: 'Admin',
                status: userConstant.STATUS_ACTIVE,
                email_verified: userConstant.EMAIL_VERIFIED_TRUE,
            })
        }
        const test_admin = await db.user.findOne({ where: { email: 'test_admin@dev.com' } });
        if (test_admin) {
            console.log('test admin already exists');
            return;
        } else {
            const hashedPassword = await bcrypt.hash('123456', 10);
            await db.user.create({
                uuid: test_admin_uuid,
                email: 'test_admin@dev.com',
                password: hashedPassword,
                first_name: 'Test',
                last_name: 'Admin',
                status: userConstant.STATUS_ACTIVE,
                email_verified: userConstant.EMAIL_VERIFIED_TRUE,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seedUserRoles() {
    try {
        const super_admin_role = await db.user_role.findOne({ where: { user_id: super_admin_uuid } });
        if (super_admin_role) {
            console.log('super admin role already exists');
            return;
        } else {
            await db.user_role.create({
                user_id: super_admin_uuid,
                role_id: 4
            })
        }
        const test_admin_role = await db.user_role.findOne({ where: { user_id: test_admin_uuid } });
        if (test_admin_role) {
            console.log('test admin role already exists');
            return;
        } else {
            await db.user_role.create({
                user_id: test_admin_uuid,
                role_id: 1
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seedSocietyUser() {
    try {
        const society_user = await db.user_society.findOne({ where: { user_id: super_admin_uuid } });
        if (society_user) {
            console.log('society user already exists');
            return;
        } else {
            await db.user_society.create({
                user_id: super_admin_uuid,
                society_id: test_society_uuid
            })
        }
        const society_user2 = await db.user_society.findOne({ where: { user_id: test_admin_uuid } });
        if (society_user2) {
            console.log('society user already exists');
            return;
        } else {
            await db.user_society.create({
                user_id: test_admin_uuid,
                society_id: test_society_uuid
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function seed() {
    await seedSociety();
    await seedLanguage();
    await seedRegion();
    await seedUser();
    await seedUserRoles();
    await seedSocietyUser();
}

module.exports = seed;