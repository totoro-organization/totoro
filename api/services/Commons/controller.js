const models = require('../../models');
const asyncLib = require('async');
const { Op } = require('sequelize');


module.exports = {
    getRoles: function(res) {
        models.Roles.findAll({
            order: [['label', 'asc']]
        })
        .then(function(results) {
            res.status(200)
            .json({total_rows: results.length, data: results});
        })
    },
}