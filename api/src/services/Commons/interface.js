module.exports = {
    postCommon: {
        label: {
            required: true
        },
        type: {
            required: true
        }
    },
    putCommon: {
        label: {
            required: false
        },
        type: {
            required: false
        }
    },
    changeStatus: {
        tableName: {
            required: true
        },
        id: {
            required: true
        },
        status_id: {
            required: true
        }
    },
    postLitigationObject: {
        label: {
            required: true
        },
        description: {
            required: true
        }
    },
    putLitigationObject: {
        label: {
            required: false
        },
        description: {
            required: false
        }
    },
};
