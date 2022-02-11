module.exports = {
    responseAll: function(req, res, errorMessage) {
        req.then(function(results) {
            res.status(200)
            .json({total_rows: results.length, data: results});
        }).catch(error => {
            res.status(500)
            .json({response: errorMessage});
        })  
    },
    responseOne: function(req, res, errorMessage) {
        req.then(result => {
            res.status(200)
            .json(result);
        }).catch(error => {
            res.status(500)
            .json({response: errorMessage});
        })  
    },
    deleteOne: function(req, res) {
        req.then(result => {
            res.status(200)
            .json({response: "Field delete successfull"});
        }).catch(error => {
            res.status(500)
            .json({response: "Operation failed"});
        })  
    },
    getField: function(res, model, condition, done) {
        model.findOne({
            where: condition
        })
        .then(result => done(null, result))
        .catch(error => {
            res.status(500)
            .json({response: "Operation failed"});
        })  
    },
    createField: function(res, model, data, done) {
        model.create(data)
        .then(newField => done(newField))
        .catch(error => {
            res.status(500)
            .json({response: error + ""});
        });  
    }
}