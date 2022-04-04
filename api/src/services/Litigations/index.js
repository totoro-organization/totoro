const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const litigationsRouter = express.Router();

    litigationsRouter.get("/", async function(req, res) {
        controller.getLitigations(res);
    })

    litigationsRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getLitigation(res, id);
    })

    litigationsRouter.post("/", async function(req, res) {
        const data = req.body;
        controller.createLitigation(res, data);
    })

    litigationsRouter.put("/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateLitigation(res, id, data);
    })

    litigationsRouter.delete("/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteLitigation(res, id);
    })

    litigationsRouter.post("/:id/warning", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.sendWarning(res, id, data);
    })

    return litigationsRouter;
})();