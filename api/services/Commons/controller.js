const models = require('../../models');
const asyncLib = require('async');
const { Op } = require('sequelize');


module.exports = {
    // Roles
    getRoles: function(res) {
        models.Roles.findAll({
            order: [['label', 'asc']]
        })
        .then(function(results) {
            res.status(200)
            .json({total_rows: results.length, data: results});
        })
    },
    getRole: function(res, id){},
    createRole: function(res, data){},
    updateRole: function(res, id, data){},
    deleteRole: function(res, id){},
    // Pricings
    getPricings: function(res){},
    getPricing: function(res, id){},
    createPricing: function(res, data){},
    updatePricing: function(res, id, data){},
    deletePricing: function(res, id){},
    // Tags
    getTags: function(res){},
    getTag: function(res, id){},
    createTag: function(res, data){},
    updateTag: function(res, id, data){},
    deleteTag: function(res, id){},
    // Status
    getStatus: function(res){},
    getOneStatus: function(res, id){},
    createStatus: function(res, data){},
    updateStatus: function(res, id, data){},
    deleteStatus: function(res, id){},
    // Payments
    getPayments: function(res){},
    getPayment: function(res, id){},
    createPayment: function(res, data){},
    updatePayment: function(res, id, data){},
    deletePayment: function(res, id){},
    // Litigation_objects
    getLitigation_objects: function(res){},
    getLitigation_object: function(res, id){},
    createLitigation_object: function(res, data){},
    updateLitigation_object: function(res, id, data){},
    deleteLitigation_object: function(res, id){},
}