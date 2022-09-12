module.exports = {
    putUser: {
        firstname: {
            required: false
        },
        lastname: {
            required: false
        },
        email: {
            required: false
        },
        bio: {
            required: false
        },
        phone: {
            required: false
        },
        longitude: {
            required: false
        },
        latitude: {
            required: false
        }
    },
    activateUser: {
        token: {
            required: true
        }
    },
    resetPassword: {
        token: {
            required: true
        },
        password: {
            required: true
        }
    },
    postFavotitesUser: {
        assos_id: {
            required: false
        },
        jobs_id: {
            required: false
        }
    },
    putPassword: {
        old_password: {
            required: true
        },
        password: {
            required: true
        }
    }
};
