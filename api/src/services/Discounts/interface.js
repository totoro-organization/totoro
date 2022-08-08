module.exports = {
    postDiscount: {
        type_disc_id: {
            required: true
        },
        partner_id: {
            required: true
        },
        name: {
            required: true
        },
        description: {
            required: false
        },
        condition: {
            required: false
        },
        cost: {
            required: false
        },
        duration: {
            required: false
        }
    },
    putDiscount: {
        type_disc_id: {
            required: false
        },
        name: {
            required: false
        },
        description: {
            required: false
        },
        condition: {
            required: false
        },
        cost: {
            required: false
        },
        duration: {
            required: false
        }
    }
};
