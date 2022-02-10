const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const ParametersRouter = express.Router();

     // Localisation
     ParametersRouter.put("/", async function(req, res) {
        const data = req.body;
        controller.updateParameters(res, data);
    })

    ParametersRouter.get("/", async function(req, res) {
        controller.getParameters(res);
    })

    // Terminals
    ParametersRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getParameter(res, id);
    })

    return ParametersRouter;
})();