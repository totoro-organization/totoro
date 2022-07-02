const asyncLib = require("async");
const {qrcode} = require("~/utils/generate");
const { path } = require("utils/enum.json");
const {
	Status,
	Associations,
	Groups,
	Jobs,
	Users,
	Difficulties,
	Attachment_jobs,
	Tag_jobs,
	Tags,
	Associations_users,
	Chats,
	Attachment_chats
} = require("./../../../models");
const commonsController = require("services/Commons/controller");

const { getRow, getField } = require("utils/common/thenCatch");
const { error, success } = require("utils/common/messages.json");
const { label_status } = require("utils/enum.json");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] };

const include = [
	{ model: Status, as: "status", attributes: excludeCommon },
	{ 
		model: Users, 
		as: "participant", 
		attributes: { exclude: ["terminal_id", "status_id", "password"] },
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
		]
	},
	{
		model: Jobs,
		as: "job",
		attributes: {
			exclude: ["status_id"],
		},
		include: [
			{ model: Status, as: "status", attributes: excludeCommon },
			{ model: Difficulties, as: "difficulty", attributes: excludeCommon },
			{ model: Attachment_jobs, as: "attachments", attributes: excludeCommon, order: [['createdAt', 'ASC']] },
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
				model: Tag_jobs,
				as: "tags",
				attributes: {exclude: ["jobs_id","tag_id","createdAt", "updatedAt"]},
				include: [{ model: Tags, required: true, as: "tag", attributes: excludeCommon }]
			}
		],
	}
];

const exclude = ["jobs_id","user_id","status_id"];

module.exports = {

	getParticipation: function (res, id) {
		commonsController.getOne(res, Groups, id, exclude, include);
	},

	createParticipation: async function (res, data) {
		const { jobs_id, user_id } = data
		const statusData = await getRow(res, Status, { label: label_status.actived });
		data.status_id = statusData.id;

		const jobData = await getRow(
			res, 
			Jobs, 
			{ id: jobs_id },
			[{ model: Associations_users, as: "author"}]
		);
		const condition = { jobs_id,  user_id };

		if(jobData.remaining_place !== null && parseInt(jobData.remaining_place) == 0){
			return res
				.status(error.access_forbidden.status)
				.json({ entity: Groups.name, message: "sorry the number of participants is full"});
		} else {
			asyncLib.waterfall([
				function (done) {
				  getField(res, Associations_users, { assos_id: jobData.author.assos_id, user_id }, done);
				},
			  ],
			  function (found) {
				if (!found){
				  commonsController.create(
					  async function (result) {
						  const linkQrcode = await qrcode(path.qrcodeParticipations, result.id)
						  asyncLib.waterfall([
							  function (done) {
								  result.update({ qrcode: linkQrcode })
								  .then(function() {
									  done(null, result);
								  }).catch(function(err) {
									  return res
										  .status(error.syntax_error.status)
										  .json({ message: error.syntax_error.message });
								  });							  
							  },
							  function (result, done) {
								  if(jobData.remaining_place !== null){
									Jobs.update(
										{ remaining_place: parseInt(jobData.remaining_place) - 1 },
										{ where: { id: result.jobs_id } }
									)
									.then(function() {
										done(result);
									}).catch(function(err) {
										return res
											.status(error.syntax_error.status)
											.json({ message: error.syntax_error.message });
									});

								  } else {
									done(result);
								  }	
							  }
						  ],
							  async function (result) {
								if (result){
									return res
											.status(success.create.status)
											.json({ entity: Jobs.name, message: success.create.message });	  
								}
								else
								  return res
									.status(error.during_creation.status)
									.json({ entity: Groups.name, message: error.during_creation.message});
							  }
						  );
					  },
					  res,
					  Groups,
					  data,
					  condition,
					  null,
					  true
				  );		
				}
				else
				  return res
					.status(error.access_denied.status)
					.json({ entity: Associations.name, message: "Cannot participate in a mission of your association" });
			  }
		  );
		}
	},

	updateParticipation: async function (res, id, data) {
		const {status_id} = data
		const statusData = await getRow(res, Status, { id: status_id });
		const participationData = await getRow(
			res, 
			Groups, 
			{ id },
			[{ model: Jobs, as: "job"}]
		);

		if(statusData.label !== label_status.deleted){
			commonsController.update(res, Groups, id, data);
		} else {
			asyncLib.waterfall([
				function (done) {
					Jobs.update(
						{ remaining_place: parseInt(participationData.job.remaining_place) + 1 },
						{ where: { id: participationData.job.id } }
					)
					.then(function() {
						done(Jobs);
					}).catch(function(err) {
						return res
							.status(error.syntax_error.status)
							.json({ message: error.syntax_error.message });
					});	
				}
			  ],
			  function (jobs) {
				if (jobs)
					commonsController.delete(res, Groups, { id });
				else
					return res
						.status(error.op_failed.status)
						.json({ entity: Jobs.name, message: error.op_failed.message });
			  }
		  );
		}
	}
};
