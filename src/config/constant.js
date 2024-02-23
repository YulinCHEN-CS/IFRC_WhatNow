const userConstant = {
    EMAIL_VERIFIED_TRUE: 1,
    EMAIL_VERIFIED_FALSE: 0,
    STATUS_ACTIVE: 1,
    STATUS_INACTIVE: 0,
    STATUS_REMOVED: 2,
};
const verificationCodeConstant = {
    TYPE_EMAIL_VERIFICATION: 1,
    TYPE_RESET_PASSWORD: 2,
    STATUS_NOT_USED: 0,
    STATUS_USED: 1,
};


const userRoles = {
    NS_ADMIN: 1,
    NS_EDITOR: 2,
    API_USER: 3,
    SUPER_ADMIN: 4,
};
const contentTypes = {
    TYPE_ONE: 'type one',
    TYPE_TWO: 'type two',
    TYPE_THREE: 'type three',
};
const messageTypes = {
    MITAGATION: "Longer term actions to reduce risks",
    SEASONAL_FORECAST: "Shorter term actions to reduce risks",
    WATCH: "Prepare to respond",
    WARNING: "Prepare to respond",
    IMMEDIATE: "Response actions",
    RECOVER: "Recovery actions"
}
const language_code = {
    EN: 'English',
    ES: 'Spanish',
    FR: 'French',
    PT: 'Portuguese',
    RU: 'Russian',
    ZH: 'Chinese',
    AR: 'Arabic',
    HI: 'Hindi',
    BN: 'Bengali',
}
const action = {
    CREATE: 'Created Content',
    UPDATE: 'Updated Content',
    DELETE: 'Deleted Content',
}


module.exports = {
    userConstant,
    verificationCodeConstant,
    userRoles,
    contentTypes,
    messageTypes,
    language_code,
    action,
};
