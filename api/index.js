const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const html = require("./html");
const { error } = require("./utils/common/messages.json");
const { Applications } = require("./models");
const PORT = process.env.API_DOCKER_PORT || 8080;
const server = express();

const {
	users,
	admins,
	terminals,
	authentications,
	commons,
	applications,
} = require("./services");

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
			return res
				.status(error.access_denied.status)
				.json({ message: error.access_denied.message });
		}
		Applications.findOne({
			where: { id: APP_ID },
		})
			.then((data) => {
				if (data) next();
				else {
					return res
						.status(error.access_denied.status)
						.json({ message: error.access_denied.message });
				}
			})
			.catch((error) => console.log(error));
	} catch (error) {
		console.log("jarce");
	}
};

server.use("/api/applications", applications);
server.use("/api", [accessApi, authentications]);
server.use("/api/terminals", [accessApi, terminals]);
server.use("/api/auth/", [accessApi, authentications]);
server.use("/api/users", [accessApi, users]);
server.use("/api/admins", [accessApi, admins]);
// server.use('/api/ads', [accessApi, ads]);
// server.use('/api/messagings', [accessApi, messagings]);
// server.use('/api/transactions', [accessApi, transactions]);
// server.use('/api/parameters', [accessApi, parameters]);
// server.use('/api/litigations', [accessApi, litigations]);
// server.use('/api/subscriptions', [accessApi, subscriptions]);
server.use("/api/commons", [accessApi, commons]);

server.listen(PORT, function () {
	console.log("server start");
});
