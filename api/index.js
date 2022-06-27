const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { error } = require("utils/common/messages.json");
const { Applications } = require("./models");
const { loadFixtures } = require("./fixtures");
const server = express();
const swaggerTools = require("swagger-tools");
const swaggerDoc = require("./swagger.json");

const {
  jobs,
  users,
  admins,
  authentications,
  commons,
  applications,
  litigations,
  organizations,
  partners,
  discounts
} = require("services");

const PORT = process.env.API_DOCKER_PORT || 8080;

loadFixtures();

server.use(cors({ origin: "*" }));
server.use(express.static(__dirname + "/data"));
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

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
				} else {
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

/*
server.get("/",async function(req,res){
	const link = await qrcode("/qrcode-jobs", "je suis jarce le boss");
    res.setHeader("Content-Type","text/html")
    res.status(200).send(`<h1>qrcode link ${link}</h1>`)
})*/

server.use("/api", [accessApi, commons]);
server.use("/api/applications", [accessApi, applications]);
server.use("/api/auth", [accessApi, authentications]);
server.use("/api/users", [accessApi, users]);
server.use("/api/admins", [accessApi, admins]);
server.use("/api/jobs", [accessApi, jobs]);
server.use('/api/litigations', [accessApi, litigations]);
server.use('/api/organizations', [accessApi, organizations]);
server.use('/api/partners', [accessApi, partners]);
server.use('/api/discounts', [accessApi, discounts]);
// server.use('/messagings', [accessApi, messagings]);
// server.use('/transactions', [accessApi, transactions]);
// server.use('/subscriptions', [accessApi, subscriptions]);

const options = {
	controllers: "./src/services",
};

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
	server.use(middleware.swaggerMetadata());
	server.use(middleware.swaggerValidator());
	server.use(middleware.swaggerRouter(options));
	server.use(middleware.swaggerUi());

	server.listen(PORT, function () {
		console.log("server start");
	});
});
