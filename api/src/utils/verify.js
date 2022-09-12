const emailValidator = require('deep-email-validator');
const { error } = require("~utils/common/messages.json");

module.exports = {
    isEmailValid: async function (email) {
        const {valid, reason, validators} = await emailValidator.validate(email);
        console.log(valid,reason,validators);
        return valid ? "ok" : `Please provide a valid email address`;
    },
    params: function(res, data, restrictions){
        const missing = [];
        let message = null;

        for (const key in data) {
            if (!restrictions.hasOwnProperty(key)) {
                message = `The '${key}' key is not expected by the route`;
                break;
            }
        }

        for (const key in restrictions) {
            if(restrictions[key].required && ((Array.isArray(data[key]) && !data[key].length) || !data[key])) missing.push(key)
        }

        if(missing.length) message = `Missing parameters '${missing.join(", ")}' in body request`;

        if(message){
            return res
                .status(error.parameters.status)
                .json({ message });
        }

        return null;
    }
};
