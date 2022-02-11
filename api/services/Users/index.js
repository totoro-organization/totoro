const express = require('express');
const controller = require("./controller");

exports.router = (function() {
    const UsersRouter = express.Router();

    UsersRouter.get("/", async function(req, res) {
        controller.getUsers(res);
    })

    UsersRouter.put("/:id", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.updateUser(res, id, data);
    })

    UsersRouter.delete("/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteUser(res, id);
    })

    UsersRouter.get("/:id", async function(req, res) {
        const id = req.params.id;
        controller.getUser(res, id);
    })

    // Favorites

    UsersRouter.get("/favorites", async function(req, res) {
        controller.getFavorites(res);
    })

    UsersRouter.delete("/favorites/:id", async function(req, res) {
        const id = req.params.id;
        controller.deleteFavorite(res, id);
    })

    UsersRouter.post("/favorites", async function(req, res) {
        const data = req.body;
        controller.createFavorite(res, data);
    })

    // Litigations

    UsersRouter.get("/favorites", async function(req, res) {
        controller.getUserLitigations(res);
    })  

    // Ads

    UsersRouter.get("/favorites", async function(req, res) {
        controller.getUserAds(res);
    })

    // Rating

    UsersRouter.get("/favorites", async function(req, res) {
        controller.getUserRatings(res);
    })

    UsersRouter.post("/favorites", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.rate(res, id, data);
    })

    // Actions

    UsersRouter.put("/favorites", async function(req, res) {
        const id = req.params.id;
        const data = req.body;
        controller.getFavorites(res, id, data);
    })

    return UsersRouter;
})();