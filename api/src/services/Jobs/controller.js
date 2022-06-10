const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const commonsController = require("services/Commons/controller");
const {qrcode} = require("~/utils/generate");
const { 
	getRow,
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
	{ model: Status, as: "status", attributes: excludeCommon.exclude.push("type") },
	{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
	{ model: Attachment_jobs, as: "attachments", attributes: excludeCommon.exclude.push("jobs_id") },
	{
		model: Associations_users,
		as: "author",
		attributes: {
			exclude: ["id", "user_id", "assos_id", "role_id", "status_id","createdAt","updatedAt"],
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
		model: Tag_jobs,
		as: "tags",
		required: true,
		attributes: {exclude: ["jobs_id","tag_id","createdAt", "updatedAt"]},
		include: [{ model: Tags,     required: true, as: "tag", attributes: excludeCommon.exclude.push("status_id") }]
	}
]
const exclude = ["assos_user_id","difficulty_id","status_id"];

module.exports = {
	getJobs: async function (res, queries = null) {
		let condition = {};
		var listTags = [];

		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}
		if (queries && queries.title) condition.title = {[Op.like]: '%'+queries.title+'%'};
		if (queries && queries.min) condition.participants_max = { [Op.gte]: parseInt(queries.min) };
		if (queries && queries.max) condition.participants_max = { [Op.lte]: parseInt(queries.max) };
		if (queries && queries.min && queries.max) condition.participants_max = { [Op.and]: [{[Op.gte]: parseInt(queries.min), [Op.lte]: parseInt(queries.max)}] };
		if (queries && queries.start_date) condition.start_date = { [Op.gte]: queries.start_date }
		if (queries && queries.end_date) condition.end_date = { [Op.lte]: queries.end_date }
		if (queries && queries.cp) condition.cp = parseInt(queries.cp)
		if (queries && queries.commune) condition.commune = {[Op.like]: '%'+queries.commune+'%'}
		if (queries && queries.type) {
			var tabType = queries.type.split(';');
			for (var i=0; i < tabType.length; i++) listTags.push({label: tabType[i]});
		}
		if (queries && queries.category) {
			var tabCategory = queries.category.split(';');
			for (var i=0; i < tabCategory.length; i++) listTags.push({label: tabCategory[i]});
		}

		if (listTags.length != 0) {
			for (let i = 0; i < include.length; i++) {
				const item = include[i];
				if(item.as == "tags"){
					for (let j = 0; j < item.include.length; j++) {
						const element = item.include[j];
						if(element.as == "tag") element.where = {[Op.or]: listTags}
					}

					for (const key in item) {
						if (Object.hasOwnProperty.call(item, key)) {
							const element = item[key];
							if(element.as == "tag") element.where = {[Op.or]: listTags}
						}
					}
				}
			}
		}

		condition = Object.keys(condition).length === 0 ? null : condition;

		const params = {
			attributes: { exclude },
			where: condition,
			include,
		};

		if (queries && queries.latitude && queries.longitude) {
			var lat = parseFloat(queries.latitude);
			var lng = parseFloat(queries.longitude);
			
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
			if(queries.distance) params.having = Jobs.sequelize.literal(`distance <= ${queries.distance}`)
		} 

		Jobs.findAll(params)
		.then(function (results) {
			return res
			.status(200)
			.json({ total_rows: results.length, data: results });
		})
		.catch((err) => {
			return res
			.status(error.syntax_error.status)
			.json({ message: error.syntax_error.message });
		});

	},
	getJob: function (res, id) {
		commonsController.getOne(res, Jobs, id, exclude, include);
	},
	getParticipants: async function (res, id, queries = null) {
		let condition = {};
		const excludeGroup = { exclude: ["user_id"] };

		if (queries && queries.status) {
			let statusData = await getRow(res, Status, { label: queries.status });
			condition.status_id = statusData.id;
		}
		condition = Object.keys(condition).length === 0 ? null : condition;

		const includeGroup = [
			{
				model: Users,
				as: "participant",
				attributes: { exclude:["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{ model: Status, as: "status", attributes: excludeCommon, where: {condition}},
		]

		commonsController.getAll(res, Groups, {jobs_id: id}, excludeGroup, includeGroup);
	},
	getFavorites: async function (res, id) {
		let condition = {};
		const excludeFavorites = { exclude: ["user_id"] };

		const includeFavorites = [
			{
				model: Users,
				as: "user",
				attributes: { exclude:["terminal_id", "status_id", "password"] },
				include: [
					{ model: Status, as: "status", attributes: excludeCommon },
				],
			},
			{ model: Status, as: "status", attributes: excludeCommon, where: {condition}},
		]

		commonsController.getAll(res, Favorites, {jobs_id: id}, excludeFavorites, includeFavorites);
	},
	createJob: async function (res, req) {
		const data = req.body;

		const statusData = await getRow(res, Status, { label: label_status.disabled });
		const difficultyData = await getRow(res, Difficulties, { id: data.difficulty_id });
		const authorData = await getRow(res, Associations_users, { id: data.assos_user_id });
		data.status_id = statusData.id;

		const tagsJob = data.tags;
		delete data.tags;
		const condition = {title: data.title};
		
		commonsController.create(
			async function (result) {
				const linkQrcode = await qrcode(path.qrcodeJobs, result.id)
				result.update({ qrcode: linkQrcode })
				.then(function() {
					
					var allValueTags = [];
					for (var i=0; i < tagsJob.length; i++) {
						var valueObj = {
							tag_id: tagsJob[i],
							jobs_id: result.id
						};
						allValueTags.push(valueObj);
					}

					commonsController.create(
						function (resultTags) {
							const uploadFiles = upload(path.jobs).array("images");
							uploadFiles(req, res, function(error) {
								if (error){
									return res
										.status(error.syntax_error.status)
										.json({ message:"error uploading file" });
								}
						
								const files = req.files;
								let index, len;
								const tabFiles = []
						
								for (index = 0, len = files.length; index < len; ++index) {
									var valueObj = {
										jobs_id: result.id,
										original_name: files[index].originalname,
										type: files[index].mimetype,
										image: `${path.jobs}/${files[index].filename}`
									};
									tabFiles.push(valueObj);
								}

								commonsController.create(
									function (resultAttachments) {
										return res
											.status(success.create.status)
											.json({ entity: Jobs.name, message: success.create.message });
									},
									res,
									Attachment_jobs,
									tabFiles,
									null,
									null,
									true
								);
							});
						},
						res,
						Tag_jobs,
						allValueTags,
						null,
						null,
						true
					);

				}).catch(function(err) {
					return res
						.status(error.syntax_error.status)
						.json({ message: error.syntax_error.message });
				});
			},
			res,
			Jobs,
			data,
			condition,
			null,
			true
		);

	},
	updateJob: async function (res, id, data) {
		const condition = {};
		if(data.title) condition.title = data.title;

		if (data.status_id) {
			const assos = await getRow(res, Status, { id: data.status_id });
		}

		if (data.difficulty_id) {
			const assos = await getRow(res, Difficulties, { id: data.difficulty_id });
		}

		const tagsJob = data.tags ? data.tags : null;
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
	},
	deleteJob: function (res, id) {
		commonsController.delete(res, Jobs, { id });
	},
	deleteImageJob: function (res, id) {
		commonsController.delete(res, Attachment_jobs, { id }, true);
	},
	updateImage: function (res, id, data) {
		commonsController.update(res, Attachment_jobs, id, data);
  	},
};

