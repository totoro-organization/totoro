const asyncLib = require('async');
const { Op } = require('sequelize');
const { error, success } = require("../../utils/Commons/messages.json");
const { responseAll, responseOne, actionDelete, getField, createField, updateField } = require('../../utils/Commons/thenCatch');

module.exports = {

    getAll: function(res, model) {
        responseAll(model, res)
    },
    getOne: function(res, model){
        responseOne(model, res);
    },
    create: function(res, model, data){
        asyncLib.waterfall([
            function(done){
                getField(res, model, { label: data.label }, done, true);
            },
            function(result, done){
                if(result) res.status(error.duplicate.status).json({message: error.duplicate.message});
                else {
                    createField(res, model, data, done);
                }
            }
        ], function(newField){
            if(newField) res.status(success.create.status).json({message: success.create.message})
            else res.status(error.op_failed.status).json({message: error.op_failed.message});
        });
    },
    update: function(res, model, id, data){
        asyncLib.waterfall([
            function(done) {
                getField(res, model, { id }, done, true);
            },
            function(found, done) {
                if(!found) res.status(error.not_found.status).json({message: error.not_found.message});
                else getField(res, model, { label: data.label, id: {[Op.ne]:id} }, done, true);
            },
            function(found, done) {
                if(found) res.status(error.duplicate.status).json({message: error.duplicate.message});
                else getField(res, model, { id }, done, true);
            },
            function(found, done) {
                updateField(res, found, {label: data.label}, done);
            }
        ], function(updateFound) {
            if(updateFound) res.status(success.update.status).json({message: success.update.message});
            else res.status(error.op_failed.status).json({message: error.op_failed.message});
        });
    },
    delete: function(res, model, id){
        asyncLib.waterfall([
            function(done) {
                getField(res, model, { id }, done, false);
            }
        ], function(found) {
           actionDelete(found);
        })
    },
}