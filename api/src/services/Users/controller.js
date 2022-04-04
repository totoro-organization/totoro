const models = require("models");
const asyncLib = require("async");
const { Op } = require("sequelize");

module.exports = {
	getUsers: function (res) {},
	getUser: function (res, id) {},
	updateUser: function (res, data) {},
	deleteUser: function (res, id) {},
	getFavorites: function (res, id) {},
	createFavorite: function (res, data) {},
	deleteFavorite: function (res, id) {},
	getUserLitigations: function (res, id) {},
	getUserRatings: function (res, id) {},
	getUserAds: function (res, id) {},
	rate: function (res, id, data) {},
	userAction: function (res, id, action) {},
};
