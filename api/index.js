const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const html = require("./html");
const axios = require("axios");
const { error } = require("./utils/Commons/messages.json");
const { Applications } = require("./models");
const PORT = process.env.API_DOCKER_PORT || 8080;
const server = express();

// const users = require("./services/Users").router;
const admins = require("./services/Admins").router;
// const ads = require("./services/Ads").router;
// const authentications = require("./services/Authentications").router;
const commons = require("./services/Commons").router;
const applications = require("./services/Applications").router;
// const litigations = require("./services/Litigations").router;
// const messagings = require("./services/Messagings").router;
// const parameters = require("./services/Parameters").router;
// const transactions = require("./services/Transactions").router;
// const subscriptions = require("./services/Subscriptions").router;
// const localisations = require("./services/Localisations").router;

server.use(cors({ origin: "*" }));

server.use(express.static(__dirname + "/data"));

server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.get("/", function (req, res) {
	res.setHeader("Content-Type", "text/html");
	res.status(200).send(html.home());
});

const accessApi = async (req, res, next) => {
	try {
		const APP_ID = req.headers["app_id"];
		if (!APP_ID) {
			res
				.status(error.access_denied.status)
				.json({ message: error.access_denied.message });
		}
		Applications.findOne({
			where: { id: APP_ID },
		})
			.then((data) => {
				if (data) next();
				else {
					res
						.status(error.access_denied.status)
						.json({ message: error.access_denied.message });
				}
			})
			.catch((error) => console.log(error));
	} catch (error) {
		console.log("jarce");
	}
};

// server.use('/api', [accessApi, authentications]);
// server.use('/api/users', [accessApi, users]);
server.use("/api/admins", [accessApi, admins]);
server.use("/api/applications", [accessApi, applications]);
// server.use('/api/ads', [accessApi, ads]);
// server.use('/api/messagings', [accessApi, messagings]);
// server.use('/api/transactions', [accessApi, transactions]);
// server.use('/api/parameters', [accessApi, parameters]);
// server.use('/api/litigations', [accessApi, litigations]);
// server.use('/api/subscriptions', [accessApi, subscriptions]);
// server.use('/api/localisations', [accessApi, localisations]);
server.use("/api/commons", [accessApi, commons]);

server.listen(PORT, function () {
	console.log("server start");
});
