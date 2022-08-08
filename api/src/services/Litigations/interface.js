module.exports = {
    postLitigation: {
        litigation_object_id: {
            required: true
        },
        group_id: {
            required: true
        },
        type: {
            required: true
        },
        message: {
            required: false
        }
    },
    putLitigation: {
        status_id: {
            required: true
        }
    }
};
