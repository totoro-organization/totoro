const { error, success } = require("./messages.json");

module.exports = {
  responseAll: function (
    model,
    res,
    condition = null,
    exclude = null,
    include = null,
    pagination = null,
    order = null
  ) {

    const params = {
      include,
      attributes: { exclude },
      where: condition,
    };

    if(order) params.order = [['createdAt', order.toUpperCase()]]

    let getPagination = {}
    var page = 0;
    if(pagination){
      page = pagination.page || 0
      getPagination = module.exports.getPagination(page,  parseInt(pagination.size) || 0);
      params.limit = getPagination.limit;
      params.offset = getPagination.offset;
    }

    model[pagination ? "findAndCountAll" : "findAll"](params)
    .then(function (results) {
        let response = pagination ? module.exports.getPagingData(results, page, getPagination.limit):{ total_rows: results.length, data: results };
        return res
          .status(200)
          .json(response);
    })
    .catch((err) => {
      return res
        .status(error.syntax_error.status)
        .json({ message: err+" => "+error.syntax_error.message });
    });
  },

  responseOne: function (model, res, id, exclude = null, include = null) {
    const params = {
      include,
      attributes: { exclude },
      where: { id },
    };
    model
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
  deleteOne: function (model, res, data) {
    model
      .destroy({ where: data })
      .then((result) => {
        return res
          .status(success.delete.status)
          .json({ entity: model.name, message: success.delete.message });
      })
      .catch((err) => {
        return res
          .status(error.syntax_error.status)
          .json({ message: error.syntax_error.message });
      });
  },
  actionDelete: async function (res, found) {
    if (found) {
      module.exports.deleteOne(found, res, { id: found.id });
    } else
      return res
        .status(error.not_found.status)
        .json({ message: error.not_found.message });
  },
  getField: function (
    res,
    model,
    condition,
    done,
    isContinue = false,
    include = null,
    exclude = null
  ) {
    const params = {
      include,
      attributes: { exclude },
      where: condition,
    };
    model
      .findOne(params)
      .then((result) => {
        if (isContinue) done(null, result);
        else done(result);
      })
      .catch((err) => {
        return res
          .status(error.syntax_error.status)
          .json({ message: error.syntax_error.message });
      });
  },
  createField: function (res, model, data, done, isContinue = false) {
    if(Array.isArray(data)){
      model
        .bulkCreate(
          data,
          {
            ignoreDuplicates: true,
          }
        )
        .then(() => {
          if (isContinue) done(null, data);
          else done(data);
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(error.during_creation.status)
            .json({ message: err+" => "+error.during_creation.message });
        });
    } else {
      if (data.files) {
        let object = data.files;
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            data[key] = `${data.path}/${element[0].filename}`;
            if (data.file_type) {
              data.original_name = element[0].originalname;
              data.type = element[0].mimetype;
              delete data.file_type;
            }
          }
        }
        delete data.files;
        delete data.path;
      }
  
      if (data.file) {
        data[data.file.fieldname] = `${data.path}/${data.file.filename}`;
        if (data.file_type) {
          data.original_name = data.file.originalname;
          data.type = data.file.mimetype;
          delete data.file_type;
        }
        delete data.file;
        delete data.path;
      }
  
      model
        .create(data)
        .then((newField) => {
          if (isContinue) done(null, newField);
          else done(newField);
        })
        .catch((err) => {
          return res
            .status(error.syntax_error.status)
            .json({ message: error.syntax_error.message });
        });
    }
  },
  updateField: function (res, model, data, done) {
    if (data.files) {
      let object = data.files;
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          data[key] = `${data.path}/${element[0].filename}`;
          if (data.file_type) {
            data.original_name = element[0].originalname;
            data.type = element[0].mimetype;
            delete data.file_type;
          }
        }
      }
      delete data.files;
      delete data.path;
    }
    if (data.file) {
      data[data.file.fieldname] = `${data.path}/${data.file.filename}`;
      if (data.file_type) {
        data.original_name = data.file.originalname;
        data.type = data.file.mimetype;
        delete data.file_type;
      }
      delete data.file;
      delete data.path;
    }

    model
      .update(data)
      .then(() => done(model))
      .catch((err) => {
        return res
          .status(error.syntax_error.status)
          .json({ message: error.syntax_error.message });
      });
  },
  getRow: async function (res, model, condition = null, include = null, exclude = null) {
    try {
      const params = {
        attributes: { exclude },
        where: condition,
        include,
      };
      const data = await model.findOne(params);
      if (data) {
        return data.dataValues;
      } else {
        return res
          .status(error.not_exist.status)
          .json({ entity: model.name, message: error.not_exist.message });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getRows: async function (model, condition = null, include = null, exclude = null) {
    try {
      const params = {
        include,
        attributes: { exclude },
        where: condition,
      };
      const request = await model.findAll(params);
      const values = [];
      for (const row of request) {
        values.push(row.dataValues);
      }
      return values;
    } catch (error) {
      console.log(error);
    }
  },
  getPagingData: function (results, page, limit) {
    const { count: total_rows, rows: data } = results;
    const current_page = page ? +page : 0;
    const total_pages = Math.ceil(total_rows / limit);
    return { total_rows, data, total_pages, current_page: total_pages == 0 ? 0 : current_page + 1 };
  },
  getPagination : function (page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  },
  getPaginationQueries : function (size, page) {
    let pagination = {}

    if(size) pagination.size = parseInt(size) < 1 ? 1 : parseInt(size) || 1
    if(page) pagination.page = parseInt(page) < 1 ? 0 : parseInt(page)-1 || 0

    return Object.keys(pagination).length === 0 ? null : pagination;
  },
};
