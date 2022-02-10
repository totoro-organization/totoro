const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const authRouter = express.Router();

    authRouter.post("/login", async function(req, res) {
        const data = req.body;
        controller.login(res, data);
    })

    authRouter.post("/register", async function(req, res) {
        const data = req.body;
        controller.register(res, data);
    })

    authRouter.post("/forgot", async function(req, res) {
        const data = req.body;
        controller.forgot(res, data);
    })

    authRouter.put("/reset-password", async function(req, res) {
        const data = req.body;
        controller.resetPassword(res, data);
    })  

    return authRouter;
})();