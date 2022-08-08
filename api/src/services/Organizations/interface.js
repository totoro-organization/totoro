module.exports = {
    putMemberOrganization: {
        status_id: {
            required: true
        },
        role_id: {
            required: true
        }
    },
    putResponseOrganization: {
        status_id: {
            required: true
        }
    },
    postInviteOrganization: {
        user_id: {
            required: true
        }
    },
    putOrganization: {
        email: {
            required: false
        },
        phone: {
            required: false
        },
        status_id: {
            required: false
        }
    },
    postOrganization: {
        email: {
            required: true
        },
        phone: {
            required: true
        },
        type: {
            required: true
        },
        typeValue: {
            required: true
        }
    },
    putChangeSubscription: {
        pricing_id: {
            required: true
        }
    },
};
