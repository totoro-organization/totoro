module.exports = {
    putPartner: {
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
    postPartner: {
        email: {
            required: true
        },
        phone: {
            required: true
        },
        siret: {
            required: true
        }
    },
};
