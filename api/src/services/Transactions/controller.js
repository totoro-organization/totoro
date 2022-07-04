const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const {qrcode} = require("~/utils/generate");
const asyncLib = require("async");

const { 
	getRow,
	getPagingData,
	getPagination,
	getPaginationQueries,
	getField
 } = require("~/utils/common/thenCatch");
const {
	Users,
	Status,
	Difficulties,
	Tags,
	Tag_jobs,
	Attachment_jobs,
	Associations,
	Litigations,
	Litigation_objects,
	Jobs,
	Favorites,
	Groups,
	Associations_users,
} = require("./../../../models");

const { error, success } = require("utils/common/messages.json");
const { path } = require("utils/enum.json");
const { upload } = require("utils/storage");
const { label_status } = require("utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
	{ model: Attachment_jobs, as: "attachments", attributes: excludeCommon, order: [['createdAt', 'ASC']]},
	{
		model: Associations_users,
		as: "author",
		attributes: {
			exclude: ["user_id", "assos_id", "role_id", "status_id","createdAt","updatedAt"],
		},
		include: [
			{
				model: Associations,
				as: "organization",
				attributes: { exclude: ["status_id"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{
				model: Users,
				as: "user",
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{ model: Status, as: "status", attributes: excludeCommon }
		],
	},
	{
		model: Groups,
		as: "participants",
		attributes: {
			exclude: ["user_id", "jobs_id"],
		},
		include: [
			{
				model: Users,
				as: "participant",
				attributes: { exclude: ["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{ model: Status, as: "status", attributes: excludeCommon, where: { label: label_status.actived } }
		],
	},
	{
		model: Tag_jobs,
		as: "tags",
		attributes: {exclude: ["jobs_id","tag_id","createdAt", "updatedAt"]},
		include: [{ model: Tags, required: true, as: "tag", attributes: excludeCommon }]
	}
]
const exclude = ["assos_user_id","difficulty_id","status_id"];

module.exports = {
	getTransactions: async function (res, queries) {
		const {status, size, page, title, min, max, isExpired, start_date, end_date, cp, commune, type, category, latitude, longitude, distance} = queries

		let condition = {};
		let listTags = [];

		if (status) {
			let statusData = await getRow(res, Status, { label: status });
			condition.status_id = statusData.id;
		}
		if (title) condition.title = {[Op.like]: '%'+title+'%'};
		if (min) condition.participants_max = { [Op.gte]: parseInt(min) };
		if (max) condition.participants_max = { [Op.lte]: parseInt(max) };
		if (min && max) condition.participants_max = { [Op.and]: [{[Op.gte]: parseInt(min), [Op.lte]: parseInt(max)}] };

		if (isExpired){
			condition.start_date = JSON.parse(isExpired) ?
				Jobs.sequelize.literal(`DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") > DATE_FORMAT(Jobs.start_date, "%Y-%m-%d")`) : 
				Jobs.sequelize.literal(`DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") <= DATE_FORMAT(Jobs.start_date, "%Y-%m-%d")`)
		}

		if (start_date) condition.start_date = { [Op.gte]: start_date }
		if (end_date) condition.end_date = { [Op.lte]: end_date }
		if ((end_date && start_date) && end_date < start_date)
			return res
					.status(error.parameters.status)
					.json({ entity: Jobs.name,  message: "end date must be greater than start date" });

		if (cp) condition.cp = parseInt(cp)
		if (commune) condition.commune = {[Op.like]: '%'+commune+'%'}
		if (type) {
			var tabType = type.split(';');
			for (var i=0; i < tabType.length; i++) listTags.push({label: tabType[i]});
		}
		if (category) {
			var tabCategory = category.split(';');
			for (var i=0; i < tabCategory.length; i++) listTags.push({label: tabCategory[i]});
		}

		if (listTags.length != 0) {
			for (let i = 0; i < include.length; i++) {
				const item = include[i];
				if(item.as == "tags"){
					for (let j = 0; j < item.include.length; j++) {
						const element = item.include[j];
						if(element.as == "tag") {
							element.required = true
							element.where = {[Op.or]: listTags}
						}
					}
				}
			}
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		const params = {
			include,
			attributes: { exclude },
			where: condition,
		};

		let getPaginationTab = {}
		let pagination = {}
		if(size){
			pagination.size = size < 1 ? 1 : parseInt(size) || 1
			pagination.page = !page || page < 1 ? 0 : parseInt(page)-1 || 0
			getPaginationTab = getPagination(pagination.page, pagination.size);
			params.limit = getPaginationTab.limit;
			params.offset = getPaginationTab.offset;

		}

		if (latitude && longitude) {
			var lat = parseFloat(latitude);
			var lng = parseFloat(longitude);
			
			const haversine = `(
				6371 * acos(
					cos(radians(${lat}))
					* cos(radians(Jobs.latitude))
					* cos(radians(Jobs.longitude) - radians(${lng}))
					+ sin(radians(${lat})) * sin(radians(Jobs.latitude))
				)
			)`;
			params.attributes['include'] = [[Jobs.sequelize.literal(haversine), 'distance']]
			params.order = Jobs.sequelize.col('distance')
			if(distance) params.having = Jobs.sequelize.literal(`distance <= ${distance}`)
		} 

		Jobs[size ? "findAndCountAll" : "findAll"](params)
		.then(function (results) {
			let response = size ? 
				getPagingData(results, pagination.page, getPaginationTab.limit) : 
				{ totalRows: results.length, data: results }

			return res
				.status(200)
				.json(response);
		})
		.catch((err) => {
			return res
			.status(error.syntax_error.status)
			.json({ message: err+ " => "+ error.syntax_error.message });
		});

	},
	getTransaction: function (res, id, queries) {
		const {latitude, longitude} = queries
		
		const params = {
			include,
			attributes: { exclude },
			where: { id },
		};

		if (latitude && longitude) {
			var lat = parseFloat(latitude);
			var lng = parseFloat(longitude);
			
			const haversine = `(
				6371 * acos(
					cos(radians(${lat}))
					* cos(radians(Jobs.latitude))
					* cos(radians(Jobs.longitude) - radians(${lng}))
					+ sin(radians(${lat})) * sin(radians(Jobs.latitude))
				)
			)`;
			params.attributes['include'] = [[Jobs.sequelize.literal(haversine), 'distance']]
		} 


		Jobs
			.findOne(params)
			.then((result) => {
			if (result) return res.status(200).json(result);
			else
				return res
				.status(error.not_found.status)
				.json({ message: error.not_found.message });
			})
			.catch((err) => {
			return res
				.status(error.syntax_error.status)
				.json({ message: error.syntax_error.message });
			});
	},
	createTransaction: async function (res, data) {
		
	},
	updateTransaction: async function (res, id, data) {
		const {status_id, title, difficulty_id, tags} = data
		const condition = {};
		if(title) condition.title = title;

		if (status_id) {
			const stat = await getRow(res, Status, { id: status_id });
		}

		if (difficulty_id) {
			const diff = await getRow(res, Difficulties, { id: difficulty_id });
		}
		if(data.participants_max) data.remaining_place = data.participants_max

		const tagsJob = tags;
		delete data.tags; 

		if(tagsJob){
			Tag_jobs
			.destroy({ where: {Jobs_id: id} })
			.then((result) => {
				var allValueTags = [];
				for (var i=0; i < tagsJob.length; i++) {
					var valueObj = {
						tag_id: tagsJob[i],
						jobs_id: id
					};
					allValueTags.push(valueObj);
				}
				commonsController.create(
					function (resultTags) {
						commonsController.update(res, Jobs, id, data, condition);
					},
					res,
					Tag_jobs,
					allValueTags,
					null,
					null,
					true
				);
			})
			.catch((err) => {
			  return res
				.status(error.syntax_error.status)
				.json({ message: error.syntax_error.message });
			});
		} else {
			commonsController.update(res, Jobs, id, data, condition);
		}
	}
};

