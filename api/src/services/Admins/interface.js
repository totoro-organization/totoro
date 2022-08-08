module.exports = {
    postAdmin: {
        firstName: {
            required: true
        },
        lastName: {
            required: true
        },
        username: {
            required: true
        },
        email: {
            required: true
        },
        role_id: {
            required: true
        }
    },
    putAdmin: {
        firstName: {
            required: false
        },
        lastName: {
            required: false
        },
        email: {
            required: false
        }
    },
    putPasswordAdmin: {
        old_password: {
            required: true
        },
        password: {
            required: true
        }
    },
    postLogAdmin: {
        table: {
            required: true
        },
        action: {
            required: true
        }
    },
    putRoleAdmin: {
        role_id: {
            required: true
        }
    }
};
