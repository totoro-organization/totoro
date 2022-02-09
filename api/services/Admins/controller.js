const models = require('../../models');
const asyncLib = require('async');
const { Op } = require('sequelize');


module.exports = {
    getAdmins: function(res) {},
    createAdmin: function(res, data) {},
    getAdmin: function(res, id) {},
    deleteAdmin: function(res, id) {},
    updateAdmin: function(res, id, data) {},
    getLogs: function(res) {},
    getLog: function(res, adminId) {},
    createLog: function(res, data) {},
    truncateLogs: function(res, period) {},
}