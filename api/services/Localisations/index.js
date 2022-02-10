const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const localisationsRouter = express.Router();

    // Terminals
    localisationsRouter.get("/terminals", async function(req, res) {
        controller.getTerminals(res);
    })

    localisationsRouter.get("/terminals/:id", async function(req, res) {
        const id = req.params.id;
        controller.getTerminal(res, id);
    })

    localisationsRouter.post("/terminals", async function(req, res) {
        const data = req.body;
        controller.createTerminal(res, data);
    })

    localisationsRouter.put("/terminals/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateTerminal(res, id, data);
    })

    localisationsRouter.delete("/terminals/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteTerminal(res, id);
    })

    // Localisation
    localisationsRouter.post("/", async function(req, res) {
        controller.getLocalisation(res);
    })

    localisationsRouter.put("/", async function(req, res) {
        const data = req.body;
        controller.sendWarning(res, data);
    })

    return localisationsRouter;
})();