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
    postDifficulty: {
        level: {
            required: true
        },
        token: {
            required: true
        }
    },
    putDifficulty: {
        level: {
            required: false
        },
        token: {
            required: false
        }
    },
    postPricing: {
        label: {
            required: true
        },
        description: {
            required: true
        },
        duration: {
            required: true
        },
        price: {
            required: true
        },
        nb_account: {
            required: false
        },
        nb_jobs_by_month: {
            required: false
        },
        nb_attachments_by_publish: {
            required: true
        },
        social_publish: {
            required: true
        },
        flux_activities: {
            required: true
        },
        certifate: {
            required: false
        }
    },
    putPricing: {
        label: {
            required: false
        },
        description: {
            required: false
        },
        duration: {
            required: false
        },
        price: {
            required: false
        },
        nb_account: {
            required: false
        },
        nb_jobs_by_month: {
            required: false
        },
        nb_attachments_by_publish: {
            required: false
        },
        social_publish: {
            required: false
        },
        flux_activities: {
            required: false
        },
        certifate: {
            required: false
        }
    },
};
