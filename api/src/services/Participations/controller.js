const asyncLib = require("async");
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

	updateParticipation: async function (res, id, data) {
		const {status_id} = data
		const statusData = await getRow(res, Status, { id: status_id });
		const participationData = await getRow(
			res, 
			Groups, 
			{ id },
			[
				{ 
					model: Jobs, as: "job",
					include : [{model: Difficulties, as: "difficulty"}]
				},
				{ 
					model: Users, 
					as: "participant"
				},
				{ model: Status, as: "status" },
			]
		);

		if(statusData.label !== label_status.deleted){
			if(participationData.status.label === label_status.actived && statusData.label === label_status.closed){
				asyncLib.waterfall([
					function (done) {
						Users.update(
							{ total_token: parseInt(participationData.participant.total_token) + parseInt(participationData.job.difficulty.token) },
							{ where: { id: participationData.participant.id } }
						)
						.then(function() {
							done(Users);
						}).catch(function(err) {
							return res
								.status(error.syntax_error.status)
								.json({ message: error.syntax_error.message });
						});	
					}
				  ],
				  function (Users) {
					if (Users)
						commonsController.update(res, Groups, id, data);
					else
						return res
							.status(error.op_failed.status)
							.json({ entity: Users.name, message: error.op_failed.message });
				  }
			  );
			} else {
				if(participationData.status.label === label_status.closed){
					return res
						.status(error.duplicate.status)
						.json({ entity: Groups.name, message: "This mission has already been validated"});
				} else {
					commonsController.update(res, Groups, id, data);
				}
			}
			
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
