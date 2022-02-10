const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const SubscriptionsRouter = express.Router();

     SubscriptionsRouter.get("/", async function(req, res) {
        controller.getSubscriptions(res);
    })

    SubscriptionsRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getParameters(res, id);
    })

    SubscriptionsRouter.get("/user/:id", async function(req, res) {
        const id = req.params.id;
        controller.getUserSubscription(res, id);
    })

    adsRouter.post("/", async function(req, res) {
        const data = req.body;
        controller.createSubscription(res, data);
    })

    adsRouter.put("/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateSubscription(res, id, data);
    })

    adsRouter.delete("/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteSubscription(res, id);
    })

    return SubscriptionsRouter;
})();