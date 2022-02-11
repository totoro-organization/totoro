const models = require('../../models');
const asyncLib = require('async');
const { Op } = require('sequelize');
const { responseAll, responseOne, deleteOne, getField, createField } = require('../../utils/Commons/thenCatch');

module.exports = {
    // Roles
    getRoles: function(res) {
        responseAll(models.Roles.findAll({
            order: [['label', 'asc']]
        }), res, "Unable to retrieve roles")
    },
    getRole: function(res, id){
        responseOne(models.Roles.findOne({
            where: { id }
        }), res, "Unable to retrieve role");
    },
    createRole: function(res, data){
        asyncLib.waterfall([
            function(done){
                getField(res, models.Roles, { label: data.label }, done);
            },
            function(result, done){
                if(result) res.status(409).json({response: "Value already exist"});
                else {
                    createField(res, models.Roles, data, done);
                }
            }
        ], function(newField){
            if(newField) res.status(201).json({response: "Role create successfull"})
        });
    },
    updateRole: function(res, id, data){},
    deleteRole: function(res, id){
       deleteOne(models.Roles.destroy({
        where: { id }
    }), res)
    },
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