const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const MessagingsRouter = express.Router();

     // Localisation
     MessagingsRouter.post("/", async function(req, res) {
         const data = req.body;
        controller.createMessage(res, data);
    })

    MessagingsRouter.get("/user/:id", async function(req, res) {
        const id = req.params.id;
        controller.getUserChats(res, id);
    })

    // Terminals
    MessagingsRouter.get("/ads/:id", async function(req, res) {
        const id = req.params.id;
        controller.getAdsChats(res, id);
    })

    MessagingsRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getChat(res, id);
    })

    MessagingsRouter.delete("/:id", async function(req, res) {
        const id = req.params.id;
        controller.createTerminal(res, id);
    })

    return MessagingsRouter;
})();