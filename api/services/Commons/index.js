const express = require('express');
const controller = require("./controller");
const { Roles, Pricings, Tags, Status, Payments, Litigation_objects }= require('../../models');

exports.router = (function() {
    const commonsRouter = express.Router();

    // Roles
    commonsRouter.get("/roles", async function(req, res) {
        controller.getAll(res, Roles);
    })

    commonsRouter.get("/roles/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Roles, id);
    })

    commonsRouter.post("/roles", async function(req, res) {
        const data = req.body;
        controller.create(res, Roles, data);
    })

    commonsRouter.put("/roles/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Roles, id, data);
    })  

    commonsRouter.delete("/roles/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Roles, id);
    })

    // Pricings
    commonsRouter.get("/pricings", async function(req, res) {
        controller.getAll(res, Pricings);
    })

    commonsRouter.get("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Pricings, id);
    })

    commonsRouter.post("/pricings", async function(req, res) {
        const data = req.body;
        controller.create(res, Pricings, data);
    })

    commonsRouter.put("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Pricings, id, data);
    })  

    commonsRouter.delete("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Pricings, id);
    })

    // Tags
    commonsRouter.get("/tags", async function(req, res) {
        controller.getALl(res, Tags);
    })

    commonsRouter.get("/tags/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Tags, id);
    })

    commonsRouter.post("/tags", async function(req, res) {
        const data = req.body;
        controller.create(res, Tags, data);
    })

    commonsRouter.put("/tags/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Tags, id, data);
    })  

    commonsRouter.delete("/tags/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Tags, id);
    })

    // Status
    commonsRouter.get("/status", async function(req, res) {
        controller.getAll(res, Status);
    })

    commonsRouter.get("/status/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Status, id);
    })

    commonsRouter.post("/status", async function(req, res) {
        const data = req.body;
        controller.create(res, Status, data);
    })

    commonsRouter.put("/status/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Status, id, data);
    })  

    commonsRouter.delete("/status/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Status, id);
    })

    // Payments
    commonsRouter.get("/payments", async function(req, res) {
        controller.getAll(res, Payments);
    })

    commonsRouter.get("/payments/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Payments, id);
    })

    commonsRouter.post("/payments", async function(req, res) {
        const data = req.body;
        controller.create(res, Payments, data);
    })

    commonsRouter.put("/payments/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Payments, id, data);
    })  

    commonsRouter.delete("/payments/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Payments, id);
    })
    
    // Litigation_objects
    commonsRouter.get("/litigation-objects", async function(req, res) {
        controller.getAll(res, Litigation_objects);
    })

    commonsRouter.get("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        controller.getOne(res, Litigation_objects, id);
    })

    commonsRouter.post("/litigation-objects", async function(req, res) {
        const data = req.body;
        controller.create(res, Litigation_objects, data);
    })

    commonsRouter.put("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.update(res, Litigation_objects, id, data);
    })  

    commonsRouter.delete("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        controller.delete(res, Litigation_objects, id);
    })
    
    return commonsRouter;
})();