const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const commonsRouter = express.Router();

    // Roles
    commonsRouter.get("/roles", async function(req, res) {
        controller.getRoles(res);
    })

    commonsRouter.get("/roles/:id", async function(req, res) {
        const id = req.params.id;
        controller.getRole(res, id);
    })

    commonsRouter.post("/roles", async function(req, res) {
        const data = req.body;
        controller.createRole(res, data);
    })

    commonsRouter.put("/roles/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateRole(res, id, data);
    })  

    commonsRouter.delete("/roles/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteRole(res, id);
    })

    // Pricings
    commonsRouter.get("/pricings", async function(req, res) {
        controller.getPricings(res);
    })

    commonsRouter.get("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        controller.getPricing(res, id);
    })

    commonsRouter.post("/pricings", async function(req, res) {
        const data = req.body;
        controller.createPricing(res, data);
    })

    commonsRouter.put("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updatePricing(res, id, data);
    })  

    commonsRouter.delete("/pricings/:id", async function(req, res) {
        const id = req.params.id;
        controller.deletePricing(res, id);
    })

    // Tags
    commonsRouter.get("/tags", async function(req, res) {
        controller.getTags(res);
    })

    commonsRouter.get("/tags/:id", async function(req, res) {
        const id = req.params.id;
        controller.getTag(res, id);
    })

    commonsRouter.post("/tags", async function(req, res) {
        const data = req.body;
        controller.createTag(res, data);
    })

    commonsRouter.put("/tags/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateTag(res, id, data);
    })  

    commonsRouter.delete("/tags/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteTag(res, id);
    })

    // Status
    commonsRouter.get("/status", async function(req, res) {
        controller.getStatus(res);
    })

    commonsRouter.get("/status/:id", async function(req, res) {
        const id = req.params.id;
        controller.getStatus(res, id);
    })

    commonsRouter.post("/status", async function(req, res) {
        const data = req.body;
        controller.createStatus(res, data);
    })

    commonsRouter.put("/status/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateStatus(res, id, data);
    })  

    commonsRouter.delete("/status/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteStatus(res, id);
    })

    // Payments
    commonsRouter.get("/payments", async function(req, res) {
        controller.getPayments(res);
    })

    commonsRouter.get("/payments/:id", async function(req, res) {
        const id = req.params.id;
        controller.getPayment(res, id);
    })

    commonsRouter.post("/payments", async function(req, res) {
        const data = req.body;
        controller.createPayment(res, data);
    })

    commonsRouter.put("/payments/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updatePayment(res, id, data);
    })  

    commonsRouter.delete("/payments/:id", async function(req, res) {
        const id = req.params.id;
        controller.deletePayment(res, id);
    })
    
    // Litigation_objects
    commonsRouter.get("/litigation-objects", async function(req, res) {
        controller.getLitigation_objects(res);
    })

    commonsRouter.get("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        controller.getLitigation_object(res, id);
    })

    commonsRouter.post("/litigation-objects", async function(req, res) {
        const data = req.body;
        controller.createLitigation_object(res, data);
    })

    commonsRouter.put("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateLitigation_object(res, id, data);
    })  

    commonsRouter.delete("/litigation-objects/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteLitigation_object(res, id);
    })
    
    return commonsRouter;
})();