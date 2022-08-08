module.exports = {
    loginUser: {
        emailOrUsername: {
            required: true
        },
        password: {
            required: true
        }
    },
    forgot: {
        email: {
            required: true
        }
    },
    signup: {
        username: {
            required: true
        },
        firstname: {
            required: true
        },
        lastname: {
            required: true
        },
        email: {
            required: true
        },
        birthday: {
            required: true
        },
        password: {
            required: true
        }
    }
};
