const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ui_api } = require("./html");
const { error } = require("utils/common/messages.json");
const { Applications } = require("./models");
const {loadFixtures} = require('./fixtures');
const PORT = process.env.API_DOCKER_PORT || 8080;
const server = express();
const url = `http://localhost:${PORT}`
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {
	users,
	admins,
	terminals,
	authentications,
	commons,
	applications,
} = require("services");

loadFixtures(); 

server.use(cors({ origin: "*" }));

server.use(express.static(__dirname + "/data"));

server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Totoro"
      },
      servers: [url]
    }
  },
 
  apis: ["index.js", "./src/services/**/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
/**
 * @swagger
 * /:
 *  get:
 *    description: route primaire
 *    responses:
 *      '200':
 *        description: return html content
 */
server.get("/", function (req, res) {
	res.setHeader("Content-Type", "text/html");
	res.status(200).send(ui_api.home());
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
				if (data) {
					req.request = data;
					next();
				}
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

server.use("/api/applications", [accessApi, applications]);
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