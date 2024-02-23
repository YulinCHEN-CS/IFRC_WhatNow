const httpStatus = require('http-status');
const logger = require('../config/logger');
const MessageService = require('../service/MessageService');
const AuditService = require('../service/AuditService');
const jwt = require('jsonwebtoken');

const { messageTypes } = require('../config/constant');
const config = require('../config/config');

class MessageController {
    constructor() {
        this.messageService = new MessageService();
        this.auditService = new AuditService();
    }

    getContentMessage = async (req, res) => {
        try {
            const society_id = req.body.society_id;
            const region_id = req.body.region_id;
            const language_code = req.body.language_code;
            const content_type = req.body.content_type;
            const message = await this.messageService.getMessageByMultipleIds(society_id, region_id, language_code, content_type);
            return res.status(httpStatus.OK).json(message);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

    updateContentMessage = async (req, res) => {
        try {
            const messages = req.body.messages;
            const types = Object.keys(messages);
            const society_id = req.body.society_id;
            const region_id = req.body.region_id;
            const content_type = req.body.content_type;
            const language_code = req.body.language_code;
            const message = await this.messageService.deleteAllMessage(society_id, region_id, content_type, language_code);

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
            const audit = await this.auditService.createAuditLog('UPDATE', { society_id, user_id, language_code, content_type });
            
            return res.status(httpStatus.OK).json(message);
        } catch (error) {
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json(error);
        }
    }

}

module.exports = MessageController;