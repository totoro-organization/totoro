const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const { Users, Status, Roles, Associations, Associations_users, Favorites, Litigations, Litigation_objects } = require("./../../../models");
const commonsController = require("services/Commons/controller");
const { error, success } = require("utils/common/messages.json");
const { status } = require("utils/enum.json");
const { getRow, getField, updateField} = require("utils/common/thenCatch");

const include = [
	{model: Status, as: "status"}, 
	{
		model: Associations_users, 
		as: "memberships", 
		attributes: {exclude:['id','user_id', 'assos_id', 'role_id']}, 
		include: [
			{model: Associations, as: "organization", attributes: {exclude:['status_id']}},
			{model: Roles, as: "role"}
		]
	}
];
const exclude = ["terminal_id", "status_id", "password","longitude","latitude"];


module.exports = {
	getUsers: async function (res, queries) {
		let condition = {};
		if(queries && queries.status){
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id=statusData.id
		}

		condition = Object.keys(condition).length === 0?null:condition
		commonsController.getAll(res, Users, condition, exclude, include);

	},
	getUser: function (res, id) {
		commonsController.getOne(res, Users, id, exclude, include);
	},
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
