const httpStatus = require('http-status');
const ContentService = require('../service/ContentService');
const MessageService = require('../service/MessageService');
const AuditService = require('../service/AuditService');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');

const { messageTypes } = require('../config/constant');
const config = require('../config/config');

class ContentController {
    constructor() {
        this.contentService = new ContentService();
        this.messageService = new MessageService();
        this.auditService = new AuditService();
    }

    getContent = async (req, res) => {
        try {
            const content = await this.contentService.getContentBySocietyId(req.body.society_id);
            return res.status(httpStatus.OK).json(content);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    addContent = async (req, res) => {
        try {
            const content = await this.contentService.createContent(req.body);
            const messages = req.body.messages;
            const types = Object.keys(messages);
            const society_id = req.body.society_id;
            const region_id = req.body.region_id;
            const content_type = req.body.content_type;
            const language_code = req.body.language_code;
            for (let i = 0; i < types.length; i++) {
                const type = types[i];
                if (!Object.keys(messageTypes).includes(type)) {
                    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Message type not exist' });
                }
                const message = messages[type];
                for (let j = 0; j < message.length; j++) {
                    const content = message[j];
                    await this.messageService.addMessage(society_id, region_id, language_code, content_type, type, content);
                }
            }

            const authorization = req.headers.authorization.split(' ');
            const user_id = jwt.verify(authorization[1], config.jwt.secret).sub;
            const audit = await this.auditService.createAuditLog('CREATE', { society_id, user_id, language_code, content_type });
            
            return res.status(httpStatus.OK).json(content);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    updateContent = async (req, res) => {
        try {
            const content = await this.contentService.updateContentById(req.body, req.body.uuid);
            return res.status(httpStatus.OK).json(content);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    deleteContent = async (req, res) => {
        try {
            const result = await this.contentService.getContentById(req.body.uuid);
            const content = result.response.data
            const society_id = content.society_id;
            const region_id = content.region_id;
            const content_type = content.content_type;
            const language_code = content.language_code;
            await this.messageService.deleteAllMessage(society_id, region_id, content_type, language_code);
            const contentData = await this.contentService.deleteContentById(req.body.uuid);

            // const authorization = req.headers.authorization.split(' ');
            // const user_id = jwt.verify(authorization[1], config.jwt.secret).sub;
            // const audit = await this.auditService.createAuditLog('DELETE', { society_id, user_id, language_code, content_type });
            // console.log(audit);
            
            return res.status(httpStatus.OK).json(contentData);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }
}

module.exports = ContentController;