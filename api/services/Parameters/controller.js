const models = require('../../models');
const asyncLib = require('async');
const { Op } = require('sequelize');


module.exports = {
    // Terminals
    getParameters: function(res){},
    updateParameters: function(res, data){},
    getParameter: function(res, id){},
}