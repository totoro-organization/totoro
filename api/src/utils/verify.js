const emailValidator = require('deep-email-validator');

module.exports = {
    isEmailValid: async function (email) {
        const {valid, reason, validators} = await emailValidator.validate(email);
        return valid ? "ok" : `Please provide a valid email address`;
    }
};
