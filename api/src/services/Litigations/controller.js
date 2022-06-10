const models = require("./../../../models");
const asyncLib = require("async");
const { Op } = require("sequelize");
const { error, success } = require("utils/common/messages.json");
const { label_status } = require("utils/enum.json");
const {
  Users,
  Status,
  Difficulties,
  Associations,
  Litigations,
  Litigation_objects,
  Ads,
  Groups,
  Associations_users,
} = require("./../../../models");
const commonsController = require("services/Commons/controller");
const { getRow, getField, updateField } = require("utils/common/thenCatch");

const excludeCommon = { exclude: ["id", "createdAt", "updatedAt"] }

const exclude = [
  "litigation_object_id",
  "group_id",
  "status_id"
];

const include = [
  { model: Status, as: "status", attributes: excludeCommon.exclude.push("type")},
  { model: Litigation_objects, as: "litigation_object", attributes: excludeCommon.exclude.push("status_id")},
  {
    model: Groups,
    as: "mission",
    attributes: { exclude: ["status_id", "user_id", "ads_id"] },
    include: [
      {
        model: Ads, 
        as: "job", 
        attributes: {exclude:['assos_user_id', 'status_id', 'difficulty_id']}, 
        include:[
          {model: Status, as: "status", attributes: excludeCommon.exclude.push("type")},
          {model: Difficulties, as: "difficulty", attributes: excludeCommon.exclude.push("status_id")},
          {
            model: Associations_users,
            as: "author",
            attributes: { exclude: ["id", "user_id", "assos_id", "role_id","status_id"] },
            include: [
              {
                model: Associations,
                as: "organization",
                attributes: { exclude: ["status_id"] },
                include:[{model: Status, as: "status", attributes: excludeCommon.exclude.push("type")}]
              }
            ]
          }
        ]
      },
      {
        model: Users,
        as: "participant",
        attributes: { exclude:["terminal_id","status_id","password"] },
        include: [{ model: Status, as: "status", attributes: excludeCommon.exclude.push("type") }],
      },
      {model: Status, as: "status", attributes: excludeCommon.exclude.push("type")}
    ]
  }
];

module.exports = {
  getLitigations: async function (res, queries = null) {
    let condition = {};
    if (queries && queries.status) {
      let statusData = await getRow(res, Status, { label: queries.status });
      condition.status_id = statusData.id;
    }

    condition = Object.keys(condition).length === 0 ? null : condition;
    commonsController.getAll(res, Litigations, condition, exclude, include);
  },
  getLitigation: function (res, id) {
    commonsController.getOne(res, Litigations, id, exclude, include);
  },
  createLitigation: async function (res, data) {
    const group = await getRow(res, Litigation_objects, { id: data.litigation_object_id });
    const object = await getRow(res, Groups, { id: data.group_id });
		const statusData = await getRow(res, Status, { label: label_status.opened });

    data.status_id = statusData.id;
    commonsController.create(null, res, Litigations, data);
  },
  updateLitigation: async function (res, id, data) {
    const status = await getRow(res, Status, { id: data.status_id });
		commonsController.update(res, Users, id, data);
  },
  deleteLitigation: function (res, id) {
    commonsController.delete(res, Litigations, { id });
  }
};
