const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const commonRouter = express.Router();

    commonRouter.get("/roles", async function(req, res) {
        controller.getRoles(res);
    })
    
    return commonRouter;
})();