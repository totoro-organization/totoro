const emailValidator = require('deep-email-validator');
const { error } = require("~utils/common/messages.json");

module.exports = {
    isEmailValid: async function (email) {
        const {valid, reason, validators} = await emailValidator.validate(email);
        console.log(valid,reason,validators);
        return valid ? "ok" : `Please provide a valid email address`;
    },
    params: function(req, res, next){
        const missing = [];
        const data = req.body;
        const restrictions = req.restrictions;

        for (const key in data) {
            if (!Object.hasOwnProperty.call(restrictions, key)) {
                return res
                    .status(error.parameters.status)
                    .json({ message: `The "${key}" key is not expected by the route` });
            }

            if(restrictions[key].required && !data[key]) missing.push(key)
        }

        if(missing.length){
            return res
                    .status(error.parameters.status)
                    .json({ message: `Missing parameters "${missing.toString()}"` });
        }

        next();
    }
};
