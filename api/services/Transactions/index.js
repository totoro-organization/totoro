const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const TransactionsRouter = express.Router();

     TransactionsRouter.get("/", async function(req, res) {
        controller.getTransactions(res);
    })

    TransactionsRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getTransaction(res, id);
    })

    TransactionsRouter.post("/", async function(req, res) {
        const data = req.body;
        controller.createTransaction(res, data);
    })

    return TransactionsRouter;
})();