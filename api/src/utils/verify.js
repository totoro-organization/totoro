const emailValidator = require('deep-email-validator');

module.exports = {
    isEmailValid: async function (email) {
        const {valid, reason, validators} = await emailValidator.validate(email);
        console.log(valid,reason,validators);
        return valid ? "ok" : `Please provide a valid email address`;
    }
};
