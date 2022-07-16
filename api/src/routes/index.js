const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { error } = require("~utils/common/messages.json");
const { Applications } = require("~orm/models");
const { loadFixtures } = require("~~/fixtures");
const app = express();
const { ui_api } = require("~public/views");

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
  discounts,
  subscriptions,
  participations,
  transactions
} = require("~services");

loadFixtures();

app.use(cors({ origin: "*" }));
app.use(express.static(process.cwd() + "/public/data"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

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

app.get("/",async function(req,res){
    res.setHeader("Content-Type","text/html")
    res.status(200).send(ui_api.home())
})

app.use("/api", [accessApi, commons]);
app.use("/api/applications", [accessApi, applications]);
app.use("/api/auth", [accessApi, authentications]);
app.use("/api/users", [accessApi, users]);
app.use("/api/admins", [accessApi, admins]);
app.use("/api/jobs", [accessApi, jobs]);
app.use('/api/litigations', [accessApi, litigations]);
app.use('/api/organizations', [accessApi, organizations]);
app.use('/api/partners', [accessApi, partners]);
app.use('/api/discounts', [accessApi, discounts]);
app.use('/api/subscriptions', [accessApi, subscriptions]);
app.use('/api/participations', [accessApi, participations]);
app.use('/api/transactions', [accessApi, transactions]);
// app.use('/messagings', [accessApi, messagings]);


module.exports = app;